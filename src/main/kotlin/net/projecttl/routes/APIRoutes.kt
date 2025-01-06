package net.projecttl.routes

import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.plugins.swagger.*
import io.ktor.server.routing.*
import net.projecttl.Config

fun Application.apiRoutes() {
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
			swaggerUI(path = "/docs", swaggerFile = "openapi/documentation.yaml") {
				this.customStyle("/static/css/swagger.css")
				version	= "4.15.5"
			}
		}
	}
}
