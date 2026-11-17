-- Add address_id column to users table
ALTER TABLE users ADD COLUMN address_id BIGINT;

-- Optional: Add foreign key constraint linking to addresses table
ALTER TABLE users
ADD CONSTRAINT fk_user_address
FOREIGN KEY (address_id) REFERENCES addresses(id);