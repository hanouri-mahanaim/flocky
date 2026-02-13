package com.flocky.apispring.auth.dto

import java.util.UUID

data class AuthResponse(
    val token: String,
    val user: UserInfo,
) {
    data class UserInfo(
        val id: UUID,
        val email: String,
        val name: String,
        val emailVerified: Boolean,
    )
}
