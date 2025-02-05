package net.projecttl.routes

import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.thymeleaf.*
import net.projecttl.model.ProjectSets
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
			call.respond(ThymeleafContent("index", mapOf(
				"og_name" to "Project Website",
				"og_description" to "Hello, World!",
				"og_url" to "https://projecttl.net",
			)))
		}

		get("/about") {
			call.respond(ThymeleafContent("about", mapOf(
				"og_name" to "Project Website - About",
				"og_description" to "Introduce my self page.",
				"og_url" to "https://projecttl.net/about",
				"projects" to ProjectSets.get
			)))
		}

		get("/timeline") {
			call.respond(ThymeleafContent("about", mapOf(
				"og_name" to "Project Website - Timeline",
				"og_description" to "Timeline for my personal activity",
				"og_url" to "https://projecttl.net/timeline",
				"projects" to ProjectSets.get
			)))
		}

		get("/project-api") {
			call.respond(ThymeleafContent("api", mapOf(
				"og_name" to "Project API",
				"og_description" to "⚡ Personal Self-Hosted REST API Service.",
				"og_url" to "https://projecttl.net/project-api"
			)))
		}

		get("/favicon.ico") {
			val classLoader = this.javaClass.classLoader
			val file = File(classLoader.getResource("static/favicon.ico")!!.toURI())

			call.respondFile(file)
		}

		staticResources("/static", "static")
	}
}
