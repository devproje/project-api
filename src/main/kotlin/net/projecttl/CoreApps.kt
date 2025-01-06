package net.projecttl

import io.ktor.server.application.*
import io.ktor.server.cio.*
import io.ktor.server.engine.*
import net.projecttl.routes.apiRoutes
import net.projecttl.routes.viewRoutes
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.transactions.transaction
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import kotlin.system.exitProcess

lateinit var database: Database
	private set

lateinit var logger: Logger
	private set

fun main() {
	logger = LoggerFactory.getLogger(CoreApplication::class.java.getName())
	database = Database.connect(
		url = "jdbc:postgresql://${Config.database_url}/${Config.database_name}",
		driver = "org.postgresql.Driver",
		user = Config.database_username,
		password = Config.database_password
	)

	try {
		transaction(database) {
			exec("select 1;") {
				if (it.next())
					logger.info("connected to database ${Config.database_url}/${Config.database_name}")
			}
		}
	} catch (ex: Exception) {
		logger.error("connect failed to database ${Config.database_url}/${Config.database_name}", ex)
		exitProcess(1)
	}


    embeddedServer(CIO, port = 8080, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
	apiRoutes()
	viewRoutes()
}

class CoreApplication
