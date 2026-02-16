package com.flocky.api.user

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EntityListeners
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.Instant
import java.time.LocalDate
import java.util.UUID

@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener::class)
class User(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "UUID")
    val id: UUID? = null,

    @Column(nullable = false, unique = true)
    var email: String,

    @Column(nullable = false)
    var name: String,

    @Column(name = "email_verified", nullable = false)
    var emailVerified: Boolean = false,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    var gender: Gender,

    var birthday: LocalDate? = null,

    @Column(name = "address_street")
    var addressStreet: String? = null,

    @Column(name = "address_city", length = 100)
    var addressCity: String? = null,

    @Column(name = "address_state", length = 100)
    var addressState: String? = null,

    @Column(name = "address_postal_code", length = 20)
    var addressPostalCode: String? = null,

    @Column(name = "address_country", length = 100)
    var addressCountry: String? = null,

    @Column(name = "phone_number", length = 20)
    var phoneNumber: String? = null,

    @Column(name = "avatar_url", length = 500)
    var avatarUrl: String? = null,

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: Instant = Instant.now(),

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    var updatedAt: Instant = Instant.now(),
)
