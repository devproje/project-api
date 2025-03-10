package net.projecttl.routes

import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.plugins.swagger.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import net.projecttl.Config
import net.projecttl.model.ErrorResp
import net.projecttl.model.PasswordOpt
import net.projecttl.model.SimpleResp
import net.projecttl.services.PasswordService

fun Application.apiRoutes() {
	val passwordService = PasswordService()

	install(ContentNegotiation) {
		json()
	}

	install(CORS) {
		allowHeader(HttpHeaders.ContentType)
		if (Config.cors_allow == "*") {
			anyHost()
			return@install
		}

		allowHost(Config.cors_allow)
	}

	routing {
		route("/api") {
			get("*") {
				call.respond(HttpStatusCode.NotFound, ErrorResp(
					errno = "current path '${call.request.uri}' is not found"
				))
			}

			swaggerUI(path = "/docs", swaggerFile = "openapi/documentation.yaml") {
				this.customStyle("/static/css/swagger.css")
				version	= "4.15.5"
			}

			route("v1") {
				post("/genpass") {
					val length = try {
						Integer.parseInt(call.queryParameters["length"])
					} catch (ex: Exception) {
						12
					}

					if (length < 1 || length > 50) {
						call.respond(HttpStatusCode.BadRequest, ErrorResp(errno = "password length must be 1~50"))
						return@post
					}

					val opt = call.receive<PasswordOpt>()
					val password = passwordService.generate(opt, length)

					call.respond(HttpStatusCode.Created, SimpleResp(content = password))
				}
			}
		}
	}
}
