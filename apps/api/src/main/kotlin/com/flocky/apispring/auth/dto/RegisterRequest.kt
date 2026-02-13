package com.flocky.apispring.auth.dto

import com.flocky.apispring.common.validation.StrongPassword
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank

data class RegisterRequest(
    @field:NotBlank
    @field:Email
    val email: String,

    @field:NotBlank
    @field:StrongPassword
    val password: String,

    @field:NotBlank
    val name: String,
)
