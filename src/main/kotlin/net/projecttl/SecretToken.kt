package net.projecttl

import java.io.File
import java.util.*

object SecretToken {
    private val file = File("system-token.secret")

    fun match(value: String): Boolean = file.readText(Charsets.UTF_8) == value

    init {
        if (!file.exists()) {
            file.createNewFile()
            file.writeText(UUID.randomUUID().toString(), Charsets.UTF_8)
        }
    }
}