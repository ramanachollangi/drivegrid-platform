-- Flyway V1 Migration: Initial Schema for DriveGrid (Users, Vehicles, Bookings)

-- 1. Users Table (Handles Customers, Business Vendors, and Admins)
CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       first_name VARCHAR(100) NOT NULL,
                       last_name VARCHAR(100) NOT NULL,
                       phone_number VARCHAR(20) NOT NULL,
                       role VARCHAR(50) NOT NULL DEFAULT 'CUSTOMER', -- CUSTOMER, VENDOR, ADMIN
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                       INDEX idx_user_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Vehicles Table (Handles Cars and Bikes listed by individual owners or rental business teams)
CREATE TABLE vehicles (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          vendor_id BIGINT NOT NULL,
                          type VARCHAR(50) NOT NULL, -- CAR, BIKE
                          brand VARCHAR(100) NOT NULL,
                          model VARCHAR(100) NOT NULL,
                          year INT NOT NULL,
                          license_plate VARCHAR(50) NOT NULL UNIQUE,
                          daily_rate DECIMAL(10, 2) NOT NULL,
                          status VARCHAR(50) NOT NULL DEFAULT 'AVAILABLE', -- AVAILABLE, RENTED, MAINTENANCE, INACTIVE
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          CONSTRAINT fk_vehicle_vendor FOREIGN KEY (vendor_id) REFERENCES users(id) ON DELETE CASCADE,
                          INDEX idx_vehicle_status (status),
                          INDEX idx_vehicle_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Bookings Table (Handles online reservations made by customers)
CREATE TABLE bookings (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          user_id BIGINT NOT NULL,
                          vehicle_id BIGINT NOT NULL,
                          start_date DATETIME NOT NULL,
                          end_date DATETIME NOT NULL,
                          total_amount DECIMAL(10, 2) NOT NULL,
                          status VARCHAR(50) NOT NULL DEFAULT 'PENDING', -- PENDING, CONFIRMED, ACTIVE, COMPLETED, CANCELLED
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          CONSTRAINT fk_booking_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
                          CONSTRAINT fk_booking_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE RESTRICT,
                          INDEX idx_booking_dates (start_date, end_date),
                          INDEX idx_booking_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;