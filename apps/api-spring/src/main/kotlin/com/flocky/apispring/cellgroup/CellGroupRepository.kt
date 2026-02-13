package com.flocky.apispring.cellgroup

import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface CellGroupRepository : JpaRepository<CellGroup, UUID>
