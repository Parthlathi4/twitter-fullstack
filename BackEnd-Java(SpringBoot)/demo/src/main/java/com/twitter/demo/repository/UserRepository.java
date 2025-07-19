package com.twitter.demo.repository;

import com.twitter.demo.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<AppUser, Long> {

    AppUser findByEmail(String email);

    @Query("SELECT DISTINCT u FROM AppUser u WHERE u.fullName LIKE %:query% OR u.email LIKE %:query%")
    List<AppUser> searchUser(@Param("query") String query);
}
