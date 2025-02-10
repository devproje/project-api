package net.projecttl.routes

import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.io.File

fun Application.viewRoutes() {
    val static = File("public").also {
        if (!it.exists())
            it.mkdirs()
    }

    routing {
        staticFiles("/", static, "index.html")

        get("/favicon.ico") {
            val classLoader = this.javaClass.classLoader
            val file = File(classLoader.getResource("static/favicon.ico")!!.toURI())

            call.respondFile(file)
        }

        staticResources("/static", "static")
    }
}

