package com.drivegrid.rental.user.service;

import com.drivegrid.rental.user.dto.Role;
import com.drivegrid.rental.user.dto.UserRegistration;
import com.drivegrid.rental.user.model.User;
import com.drivegrid.rental.user.model.UserAddress;
import com.drivegrid.rental.user.repository.AddressRepository;
import com.drivegrid.rental.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserManagementService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void createUserService(UserRegistration user){
            UserAddress address = new UserAddress();
            address.setStreet(user.streetAddress());
            address.setCity(user.city());
            address.setState(user.state());
            address.setZipCode(user.zip());
            address.setCountry(user.country());
            address.isDefault(true);
            UserAddress savedAddress = addressRepository.save(address);

            User userInfo = new User();
            userInfo.setFirstName(user.firstName());
            userInfo.setLastName(user.lastName());
            userInfo.setEmail(user.email());
            String hashedPass = passwordEncoder.encode(user.password());
            userInfo.setPassword(hashedPass);
            userInfo.setPhoneNumber(user.phoneNumber());
            userInfo.setRole(Role.valueOf(user.role()));
            userInfo.setAddress(savedAddress);
            User savedUser = userRepository.save(userInfo);
    }

    @Transactional(readOnly = true)
    public UserRegistration fetchUser(Long userId){
        User user= userRepository.getById(userId);
        if (user == null) return null;
        return new UserRegistration(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPassword(),
                user.getPhoneNumber(),
                user.getRole().name(),
                user.getAddress().getStreet(),
                user.getAddress().getCity(),
                user.getAddress().getState(),
                user.getAddress().getZipCode(),
                user.getAddress().getCountry()
        );

    }

}


