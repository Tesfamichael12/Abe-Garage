-- =============================================
-- ABE GARAGE - DATABASE SCHEMA AND SEED DATA
-- =============================================
-- This script creates the database schema if it doesn't exist
-- and seeds initial data if the database is empty.
-- It is safe to run on an existing database.
--
-- To use, copy and paste the entire contents of this file
-- into your Supabase SQL editor and run it as a single query.
-- =============================================

-- ---------------------------------------------
-- Create Tables (if they don't exist)
-- ---------------------------------------------
CREATE TABLE IF NOT EXISTS "customer_identifier" (
  "customer_id" SERIAL PRIMARY KEY,
  "customer_email" VARCHAR(255) UNIQUE NOT NULL,
  "customer_phone_number" VARCHAR(20),
  "customer_hash" VARCHAR(255),
  "customer_added_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "customer_info" (
  "customer_info_id" SERIAL PRIMARY KEY,
  "customer_id" INT UNIQUE,
  "customer_first_name" VARCHAR(255),
  "customer_last_name" VARCHAR(255),
  "active_customer_status" BOOLEAN,
  FOREIGN KEY ("customer_id") REFERENCES "customer_identifier"("customer_id") ON DELETE CASCADE
);

-- Employee Tables
CREATE TABLE IF NOT EXISTS "employee" (
  "employee_id" SERIAL PRIMARY KEY,
  "employee_email" VARCHAR(255) UNIQUE NOT NULL,
  "active_employee" BOOLEAN,
  "added_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "employee_info" (
  "employee_info_id" SERIAL PRIMARY KEY,
  "employee_id" INT UNIQUE,
  "employee_first_name" VARCHAR(255),
  "employee_last_name" VARCHAR(255),
  "employee_phone" VARCHAR(20),
  FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "employee_pass" (
  "employee_pass_id" SERIAL PRIMARY KEY,
  "employee_id" INT UNIQUE,
  "employee_password_hashed" VARCHAR(255),
  FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "company_role" (
  "company_role_id" SERIAL PRIMARY KEY,
  "company_role_name" VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS "employee_role" (
  "employee_role_id" SERIAL PRIMARY KEY,
  "employee_id" INT,
  "company_role_id" INT,
  FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE CASCADE,
  FOREIGN KEY ("company_role_id") REFERENCES "company_role"("company_role_id") ON DELETE CASCADE
);

-- Vehicle Table
CREATE TABLE IF NOT EXISTS "customer_vehicle_info" (
  "vehicle_id" SERIAL PRIMARY KEY,
  "customer_id" INT,
  "vehicle_year" INT,
  "vehicle_make" VARCHAR(255),
  "vehicle_model" VARCHAR(255),
  "vehicle_type" VARCHAR(255),
  "vehicle_mileage" INT,
  "vehicle_tag" VARCHAR(50),
  "vehicle_serial" VARCHAR(255),
  "vehicle_color" VARCHAR(50),
  "active_vehicle" BOOLEAN,
  FOREIGN KEY ("customer_id") REFERENCES "customer_identifier"("customer_id") ON DELETE CASCADE
);

-- Service Table
CREATE TABLE IF NOT EXISTS "common_services" (
  "service_id" SERIAL PRIMARY KEY,
  "service_name" VARCHAR(255) UNIQUE,
  "service_description" TEXT
);

-- Order Tables
CREATE TABLE IF NOT EXISTS "orders" (
  "order_id" SERIAL PRIMARY KEY,
  "employee_id" INT,
  "customer_id" INT,
  "vehicle_id" INT,
  "active_order" BOOLEAN,
  "order_hash" VARCHAR(255),
  "order_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id"),
  FOREIGN KEY ("customer_id") REFERENCES "customer_identifier"("customer_id"),
  FOREIGN KEY ("vehicle_id") REFERENCES "customer_vehicle_info"("vehicle_id")
);

CREATE TABLE IF NOT EXISTS "order_info" (
  "order_info_id" SERIAL PRIMARY KEY,
  "order_id" INT UNIQUE,
  "order_total_price" DECIMAL(10, 2),
  "additional_request" TEXT,
  "additional_requests_completed" BOOLEAN,
  FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "order_services" (
  "order_service_id" SERIAL PRIMARY KEY,
  "order_id" INT,
  "service_id" INT,
  "service_completed" BOOLEAN,
  FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE CASCADE,
  FOREIGN KEY ("service_id") REFERENCES "common_services"("service_id")
);

CREATE TABLE IF NOT EXISTS "order_status" (
  "order_status_id" SERIAL PRIMARY KEY,
  "order_id" INT UNIQUE,
  "order_status" INT,
  FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE CASCADE
);

-- ---------------------------------------------
-- Seed Data (only if tables are empty)
-- ---------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM "company_role") THEN

    -- Seed Company Roles
    INSERT INTO "company_role" ("company_role_name") VALUES ('Admin'), ('Mechanic');

    -- Seed Admin User
    INSERT INTO "employee" ("employee_email", "active_employee") VALUES ('admin@gmail.com', true);
    INSERT INTO "employee_info" ("employee_id", "employee_first_name", "employee_last_name", "employee_phone") VALUES (1, 'Admin', 'User', '123-456-7890');
    INSERT INTO "employee_pass" ("employee_id", "employee_password_hashed") VALUES (1, '$2b$10$vgHdaY4R/FvIGOu9d2GaTurzg00gr.vpnqhzF2e7VpFFoPnshLRFi');
    INSERT INTO "employee_role" ("employee_id", "company_role_id") VALUES (1, 1); -- 'Admin' role is ID 1

    -- Common Services
    INSERT INTO "common_services" ("service_name", "service_description") VALUES
    ('Oil Change', 'Includes up to 5 quarts of conventional oil, new oil filter, and fluid top-off.'),
    ('Tire Rotation & Balance', 'Rotating tires to ensure even wear and balancing for a smooth ride.'),
    ('Brake Inspection & Repair', 'Full inspection of brake pads, rotors, calipers, and fluid. Price varies based on repair needs.'),
    ('Engine Diagnostic', 'Computerized diagnostics to identify engine trouble codes and performance issues.'),
    ('Wheel Alignment', 'Four-wheel alignment to manufacturer specifications to prevent uneven tire wear.'),
    ('Battery Test & Replacement', 'Testing battery health and replacing if necessary. Price includes installation.'),
    ('Air Filter Replacement', 'Replacing engine and/or cabin air filters to improve performance and air quality.'),
    ('Coolant Flush', 'Draining and replacing engine coolant to prevent overheating.'),
    ('Transmission Service', 'Replacing transmission fluid and filter to ensure smooth shifting.'),
    ('Full Vehicle Detail', 'Complete interior and exterior cleaning, including wax, vacuum, and upholstery shampoo.');

    -- Additional Employees (Mechanics)
    INSERT INTO "employee" ("employee_email", "active_employee") VALUES ('john.doe@garage.com', true);
    INSERT INTO "employee_info" ("employee_id", "employee_first_name", "employee_last_name", "employee_phone") VALUES (2, 'John', 'Doe', '555-0101');
    INSERT INTO "employee_pass" ("employee_id", "employee_password_hashed") VALUES (2, '$2b$10$vgHdaY4R/FvIGOu9d2GaTurzg00gr.vpnqhzF2e7VpFFoPnshLRFi');
    INSERT INTO "employee_role" ("employee_id", "company_role_id") VALUES (2, 2); -- 'Mechanic' role is ID 2

    INSERT INTO "employee" ("employee_email", "active_employee") VALUES ('jane.smith@garage.com', true);
    INSERT INTO "employee_info" ("employee_id", "employee_first_name", "employee_last_name", "employee_phone") VALUES (3, 'Jane', 'Smith', '555-0102');
    INSERT INTO "employee_pass" ("employee_id", "employee_password_hashed") VALUES (3, '$2b$10$vgHdaY4R/FvIGOu9d2GaTurzg00gr.vpnqhzF2e7VpFFoPnshLRFi');
    INSERT INTO "employee_role" ("employee_id", "company_role_id") VALUES (3, 2); -- 'Mechanic' role is ID 2

    -- Customers
    INSERT INTO "customer_identifier" ("customer_email", "customer_phone_number", "customer_hash") VALUES ('alice.w@example.com', '555-0103', 'dummyhash1');
    INSERT INTO "customer_info" ("customer_id", "customer_first_name", "customer_last_name", "active_customer_status") VALUES (1, 'Alice', 'Williams', true);

    INSERT INTO "customer_identifier" ("customer_email", "customer_phone_number", "customer_hash") VALUES ('bob.j@example.com', '555-0104', 'dummyhash2');
    INSERT INTO "customer_info" ("customer_id", "customer_first_name", "customer_last_name", "active_customer_status") VALUES (2, 'Bob', 'Johnson', true);

    INSERT INTO "customer_identifier" ("customer_email", "customer_phone_number", "customer_hash") VALUES ('charlie.b@example.com', '555-0105', 'dummyhash3');
    INSERT INTO "customer_info" ("customer_id", "customer_first_name", "customer_last_name", "active_customer_status") VALUES (3, 'Charlie', 'Brown', true);

    INSERT INTO "customer_identifier" ("customer_email", "customer_phone_number", "customer_hash") VALUES ('diana.m@example.com', '555-0106', 'dummyhash4');
    INSERT INTO "customer_info" ("customer_id", "customer_first_name", "customer_last_name", "active_customer_status") VALUES (4, 'Diana', 'Miller', true);

    INSERT INTO "customer_identifier" ("customer_email", "customer_phone_number", "customer_hash") VALUES ('edward.g@example.com', '555-0107', 'dummyhash5');
    INSERT INTO "customer_info" ("customer_id", "customer_first_name", "customer_last_name", "active_customer_status") VALUES (5, 'Edward', 'Green', false);

    -- Customer Vehicles
    INSERT INTO "customer_vehicle_info" ("customer_id", "vehicle_year", "vehicle_make", "vehicle_model", "vehicle_type", "vehicle_mileage", "vehicle_tag", "vehicle_serial", "vehicle_color", "active_vehicle") VALUES (1, 2018, 'Toyota', 'Camry', 'Sedan', 54321, 'ALC-001', 'VIN12345ABC', 'Midnight Blue', true);
    INSERT INTO "customer_vehicle_info" ("customer_id", "vehicle_year", "vehicle_make", "vehicle_model", "vehicle_type", "vehicle_mileage", "vehicle_tag", "vehicle_serial", "vehicle_color", "active_vehicle") VALUES (1, 2020, 'Ford', 'F-150', 'Truck', 32100, 'ALC-002', 'VIN67890DEF', 'Ruby Red', true);
    INSERT INTO "customer_vehicle_info" ("customer_id", "vehicle_year", "vehicle_make", "vehicle_model", "vehicle_type", "vehicle_mileage", "vehicle_tag", "vehicle_serial", "vehicle_color", "active_vehicle") VALUES (2, 2019, 'Honda', 'Civic', 'Sedan', 41000, 'BOB-CAR', 'VIN11223GHI', 'Lunar Silver', true);
    INSERT INTO "customer_vehicle_info" ("customer_id", "vehicle_year", "vehicle_make", "vehicle_model", "vehicle_type", "vehicle_mileage", "vehicle_tag", "vehicle_serial", "vehicle_color", "active_vehicle") VALUES (3, 2021, 'Tesla', 'Model 3', 'Electric', 22000, 'CHL-E', 'VIN44556JKL', 'Pearl White', true);
    INSERT INTO "customer_vehicle_info" ("customer_id", "vehicle_year", "vehicle_make", "vehicle_model", "vehicle_type", "vehicle_mileage", "vehicle_tag", "vehicle_serial", "vehicle_color", "active_vehicle") VALUES (3, 2015, 'Jeep', 'Wrangler', 'SUV', 89000, 'OFF-ROAD', 'VIN77889MNO', 'Forrest Green', true);
    INSERT INTO "customer_vehicle_info" ("customer_id", "vehicle_year", "vehicle_make", "vehicle_model", "vehicle_type", "vehicle_mileage", "vehicle_tag", "vehicle_serial", "vehicle_color", "active_vehicle") VALUES (4, 2022, 'Subaru', 'Outback', 'Wagon', 15000, 'DIA-SUB', 'VIN00112PQR', 'Autumn Green', true);

    -- Orders
    INSERT INTO "orders" ("employee_id", "customer_id", "vehicle_id", "active_order", "order_hash") VALUES (2, 1, 1, false, 'orderhash001');
    INSERT INTO "order_info" ("order_id", "order_total_price", "additional_request", "additional_requests_completed") VALUES (1, 85.50, 'Check tire pressure, please.', true);
    INSERT INTO "order_services" ("order_id", "service_id", "service_completed") VALUES (1, 1, true), (1, 7, true);
    INSERT INTO "order_status" ("order_id", "order_status") VALUES (1, 2);

    INSERT INTO "orders" ("employee_id", "customer_id", "vehicle_id", "active_order", "order_hash") VALUES (3, 2, 3, true, 'orderhash002');
    INSERT INTO "order_info" ("order_id", "order_total_price", "additional_request", "additional_requests_completed") VALUES (2, 350.00, 'Hearing a squeaking noise from the front right wheel.', false);
    INSERT INTO "order_services" ("order_id", "service_id", "service_completed") VALUES (2, 3, false);
    INSERT INTO "order_status" ("order_id", "order_status") VALUES (2, 1);

    INSERT INTO "orders" ("employee_id", "customer_id", "vehicle_id", "active_order", "order_hash") VALUES (2, 3, 4, true, 'orderhash003');
    INSERT INTO "order_info" ("order_id", "order_total_price", "additional_request") VALUES (3, 120.00, NULL);
    INSERT INTO "order_services" ("order_id", "service_id", "service_completed") VALUES (3, 2, false);
    INSERT INTO "order_status" ("order_id", "order_status") VALUES (3, 0);

    INSERT INTO "orders" ("employee_id", "customer_id", "vehicle_id", "active_order", "order_hash") VALUES (1, 4, 6, false, 'orderhash004');
    INSERT INTO "order_info" ("order_id", "order_total_price", "additional_request", "additional_requests_completed") VALUES (4, 199.99, 'Full detail before my trip.', true);
    INSERT INTO "order_services" ("order_id", "service_id", "service_completed") VALUES (4, 10, true);
    INSERT INTO "order_status" ("order_id", "order_status") VALUES (4, 2);

    INSERT INTO "orders" ("employee_id", "customer_id", "vehicle_id", "active_order", "order_hash") VALUES (3, 1, 2, false, 'orderhash005');
    INSERT INTO "order_info" ("order_id", "order_total_price", "additional_request") VALUES (5, 150.00, 'Scheduled for next week, had to cancel.');
    INSERT INTO "order_services" ("order_id", "service_id", "service_completed") VALUES (5, 5, false);
    INSERT INTO "order_status" ("order_id", "order_status") VALUES (5, 3);
  END IF;
END $$;
-- =============================================
-- END OF SCRIPT
-- ============================================= 