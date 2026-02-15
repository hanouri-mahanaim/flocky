package com.flocky.api.user

import com.flocky.api.user.dto.UserResponse
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository,
) {
    fun getAll(
        page: Int,
        size: Int,
        search: String?,
    ): Page<UserResponse> {
        val pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"))

        val users =
            if (search.isNullOrBlank()) {
                userRepository.findAll(pageable)
            } else {
                userRepository.searchUsers(search.trim(), pageable)
            }

        return users.map(UserResponse::from)
    }
}
