plugins {
	java
	kotlin("jvm") version "2.1.0"
	id("org.springframework.boot") version "3.4.1"
	id("org.graalvm.buildtools.native") version "0.10.4"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "net.projecttl"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("com.google.code.gson:gson:2.11.0")
	implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
	implementation("org.springframework.boot:spring-boot-starter-web")
	runtimeOnly("org.postgresql:postgresql")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks{
	withType<Test> {
		useJUnitPlatform()
	}
}
