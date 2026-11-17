package com.drivegrid.rental.user.dto;

public record UserRegistration(String firstName,
                               String lastName,
                               String email,
                               String password,
                               String phoneNumber,
                               String role,
                               String streetAddress,
                               String city,
                               String state,
                               String zip,
                               String country
) {}
