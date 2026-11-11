package com.drivegrid.rental.user.repository;

import com.drivegrid.rental.user.model.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<UserAddress,Long> {
}
