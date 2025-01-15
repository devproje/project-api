package net.projecttl.model

import kotlinx.serialization.Serializable

@Serializable
data class SimpleResp<T>(
    val ok: Int = 1,
    val content: T
)

@Serializable
data class ErrorResp(
    val ok: Int = 0,
    val errno: String
)
