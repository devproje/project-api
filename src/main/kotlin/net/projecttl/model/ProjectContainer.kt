package net.projecttl.model

data class ProjectContainer(
	val name: String,
	val description: String,
	val url: String = "",
	val private: Boolean = false,
)
