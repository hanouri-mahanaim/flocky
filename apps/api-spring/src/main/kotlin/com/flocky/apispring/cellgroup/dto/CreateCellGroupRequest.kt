package com.flocky.apispring.cellgroup.dto

import jakarta.validation.constraints.NotBlank

data class CreateCellGroupRequest(
    @field:NotBlank
    val name: String,

    val description: String? = null,
)
