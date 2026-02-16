package com.flocky.api.auth.dto

import com.flocky.api.common.validation.StrongPassword
import com.flocky.api.user.Gender
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.time.LocalDate

data class RegisterRequest(
    @field:NotBlank
    @field:Email
    val email: String,

    @field:NotBlank
    @field:StrongPassword
    val password: String,

    @field:NotBlank
    val name: String,

    @field:NotNull
    val gender: Gender,

    val birthday: LocalDate? = null,

    val addressStreet: String? = null,

    val addressCity: String? = null,

    val addressState: String? = null,

    val addressPostalCode: String? = null,

    val addressCountry: String? = null,

    val phoneNumber: String? = null,

    val avatarUrl: String? = null,
)
