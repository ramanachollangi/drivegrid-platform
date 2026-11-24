package com.drivegrid.rental.user.repository;

import com.drivegrid.rental.user.model.User;
import com.drivegrid.rental.user.model.UserSecurityProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    User getById(Long userId);

    Optional<UserSecurityProjection> findByEmail(String email);

}
