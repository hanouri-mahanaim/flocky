package com.flocky.apispring

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaAuditing

@SpringBootApplication
@EnableJpaAuditing
class ApiSpringApplication

fun main(args: Array<String>) {
    runApplication<ApiSpringApplication>(*args)
}
