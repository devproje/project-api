package net.projecttl.website

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import net.projecttl.website.routes.apiRoutes
import net.projecttl.website.routes.viewRoutes

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
	apiRoutes()
	viewRoutes()
}
