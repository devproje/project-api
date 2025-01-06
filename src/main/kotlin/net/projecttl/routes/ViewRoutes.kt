package net.projecttl.routes

import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.thymeleaf.*
import net.projecttl.model.SkillContainer
import net.projecttl.model.SkillSets
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver
import java.io.File

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

		get("/aboutme") {
			call.respond(ThymeleafContent("aboutme", mapOf(
				"languages" to SkillSets.languages,
				"frameworks" to SkillSets.frameworks,
				"devops" to SkillSets.devops
			)))
		}

		get("/api") {
			call.respond(ThymeleafContent("api", mapOf()))
		}

		get("/favicon.ico") {
			val classLoader = this.javaClass.classLoader
			val file = File(classLoader.getResource("static/favicon.ico")!!.toURI())

			call.respondFile(file)
		}

		staticResources("/static", "static")
	}
}
