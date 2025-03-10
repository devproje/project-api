package net.projecttl.routes

import io.ktor.http.*
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

        get("*") {
            val target = File(static, "index.html")
            if (!target.exists()) {
                call.respond(HttpStatusCode.NotFound, "File does not exist")
                return@get
            }

            call.respondFile(target)
        }

//        get("/favicon.ico") {
//            val classLoader = this.javaClass.classLoader
//            val file = File(classLoader.getResource("static/favicon.ico")!!.toURI())
//
//            call.respondFile(file)
//        }

        staticResources("/static", "static")
    }
}

