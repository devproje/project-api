package net.projecttl.model

import kotlinx.serialization.Serializable

@Serializable
data class PasswordOpt(
    val uppercase: Boolean = true,
    val lowercase: Boolean = true,
    val number: Boolean = true,
    val special: Boolean = true
)
