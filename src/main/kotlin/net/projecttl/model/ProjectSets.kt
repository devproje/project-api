package net.projecttl.model

object ProjectSets {
	val get = listOf(
		ProjectContainer(
			name = "Carbonium",
			description = "minecraft server management system",
			private = true
		),
		ProjectContainer(
			name = "Project API",
			description = "Rewrited Project_IO's Personal API Service",
			url = "https://github.com/devproje/project-api"
		)
	)
}
