package com.acer.activities.repository;

import com.acer.activities.entity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserDetailsRepository extends JpaRepository<UserDetails,String> {
    Optional<List<UserDetails>> findByUserName(String userName);
}
