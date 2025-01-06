package net.projecttl

import java.io.File
import java.io.FileInputStream
import java.util.*
import kotlin.reflect.KProperty

object Config {
	private fun <T> useConfig(): ConfigDelegate<T> {
		return ConfigDelegate()
	}

	private fun <T> useDefaultConfig(): DefaultDelegate<T> {
		return DefaultDelegate()
	}

	// server settings
	val port by useConfig<String>()
	val version by useDefaultConfig<String>()
	val cors_allow by useConfig<String>()

	// server database settings
	val database_url by useConfig<String>()
	val database_name by useConfig<String>()
	val database_username by useConfig<String>()
	val database_password by useConfig<String>()
}

@Suppress("UNCHECKED_CAST")
class ConfigDelegate<T> {
	private val props = Properties()

	operator fun getValue(thisRef: Any?, property: KProperty<*>): T {
		return props.getProperty(property.name) as T
	}

	init {
		val file = File("config.properties")
		if (!file.exists()) {
			val classLoader = Thread.currentThread().contextClassLoader
			val stream = classLoader.getResourceAsStream("config.sample.properties")!!

			val buf = stream.readAllBytes()
			file.createNewFile()
			file.writeBytes(buf)
		}

		props.load(FileInputStream(file))
	}
}

@Suppress("UNCHECKED_CAST")
private class DefaultDelegate<T> {
	private val props = Properties()

	operator fun getValue(thisRef: Any?, property: KProperty<*>): T {
		return props.getProperty(property.name) as T
	}

	init {
		val classLoader = Thread.currentThread().contextClassLoader
		val stream = classLoader.getResourceAsStream("default.properties")!!

		props.load(stream)
	}
}
