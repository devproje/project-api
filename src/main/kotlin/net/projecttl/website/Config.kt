package net.projecttl.website

import java.io.File
import java.io.FileInputStream
import java.util.*
import kotlin.reflect.KProperty

object Config {
	fun <T> useConfig(): ConfigDelegate<T> {
		return ConfigDelegate()
	}

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

	operator fun setValue(thisRef: Any?, property: KProperty<*>, value: T) {
		props[property.name] = value
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
