package net.projecttl.model

import kotlinx.serialization.Serializable

@Serializable
data class Shutdown(val token: String)
