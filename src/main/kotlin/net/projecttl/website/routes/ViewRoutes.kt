package net.projecttl.website.routes

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.thymeleaf.*
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver

fun Application.viewRoutes() {
	install(Thymeleaf) {
		setTemplateResolver(ClassLoaderTemplateResolver().apply {
			prefix = "templates/thymeleaf/"
			suffix = ".html"
			characterEncoding = "utf-8"
		})
	}

	routing {
		get("/") {
			call.respond(ThymeleafContent("index", mapOf()))
		}

		get("/skills") {
			call.respond(ThymeleafContent("skills", mapOf()))
		}

		get("/history") {
			call.respond(ThymeleafContent("history", mapOf()))
		}

		get("/api") {
			call.respond(ThymeleafContent("api", mapOf()))
		}
	}
}
