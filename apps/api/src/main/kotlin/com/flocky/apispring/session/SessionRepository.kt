package com.flocky.apispring.session

import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface SessionRepository : JpaRepository<Session, UUID> {
    fun findByToken(token: String): Session?
    fun deleteByToken(token: String)
    fun deleteByUserId(userId: UUID)
}
