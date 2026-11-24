package com.drivegrid.rental.user.service;

import com.drivegrid.rental.user.model.UserSecurityProjection;
import com.drivegrid.rental.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserAuthenticationService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        UserSecurityProjection securityUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + userEmail));
        return org.springframework.security.core.userdetails.User.builder()
                .username(securityUser.getEmail())
                .password(securityUser.getPassword())
                .roles(securityUser.getRole())
                .build();
    }

}
