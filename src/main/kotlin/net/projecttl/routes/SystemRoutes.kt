package net.projecttl.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import net.projecttl.SecretToken
import net.projecttl.model.Reboot
import kotlin.system.exitProcess

fun Application.systemRoutes() {
    routing {
        route("/system") {
            put("/shutdown") {
                val body = call.receive<Reboot>()

                if (!SecretToken.match(body.token)) {
                    return@put call.respond(HttpStatusCode.Unauthorized)
                }

                call.respond(HttpStatusCode.OK)
                exitProcess(0)
            }
        }
    }
}
