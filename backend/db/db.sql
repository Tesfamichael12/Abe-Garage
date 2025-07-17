-- Customer Tables
CREATE TABLE `customer_identifier` (
  `customer_id` INT AUTO_INCREMENT PRIMARY KEY,
  `customer_email` VARCHAR(255) UNIQUE NOT NULL,
  `customer_phone_number` VARCHAR(20),
  `customer_hash` VARCHAR(255),
  `customer_added_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `customer_info` (
  `customer_info_id` INT AUTO_INCREMENT PRIMARY KEY,
  `customer_id` INT,
  `customer_first_name` VARCHAR(255),
  `customer_last_name` VARCHAR(255),
  `active_customer_status` BOOLEAN,
  FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`customer_id`)
);

-- Employee Tables
CREATE TABLE `employee` (
  `employee_id` INT AUTO_INCREMENT PRIMARY KEY,
  `employee_email` VARCHAR(255) UNIQUE NOT NULL,
  `active_employee` BOOLEAN,
  `added_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `employee_info` (
  `employee_info_id` INT AUTO_INCREMENT PRIMARY KEY,
  `employee_id` INT,
  `employee_first_name` VARCHAR(255),
  `employee_last_name` VARCHAR(255),
  `employee_phone` VARCHAR(20),
  FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`)
);

CREATE TABLE `employee_pass` (
  `employee_pass_id` INT AUTO_INCREMENT PRIMARY KEY,
  `employee_id` INT,
  `employee_password_hashed` VARCHAR(255),
  FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`)
);

CREATE TABLE `company_role` (
  `company_role_id` INT AUTO_INCREMENT PRIMARY KEY,
  `company_role_name` VARCHAR(255)
);

CREATE TABLE `employee_role` (
  `employee_role_id` INT AUTO_INCREMENT PRIMARY KEY,
  `employee_id` INT,
  `company_role_id` INT,
  FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`),
  FOREIGN KEY (`company_role_id`) REFERENCES `company_role`(`company_role_id`)
);

-- Vehicle Table
CREATE TABLE `customer_vehicle_info` (
  `vehicle_id` INT AUTO_INCREMENT PRIMARY KEY,
  `customer_id` INT,
  `vehicle_year` INT,
  `vehicle_make` VARCHAR(255),
  `vehicle_model` VARCHAR(255),
  `vehicle_type` VARCHAR(255),
  `vehicle_mileage` INT,
  `vehicle_tag` VARCHAR(50),
  `vehicle_serial` VARCHAR(255),
  `vehicle_color` VARCHAR(50),
  `active_vehicle` BOOLEAN,
  FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`customer_id`)
);

-- Service Table
CREATE TABLE `common_services` (
  `service_id` INT AUTO_INCREMENT PRIMARY KEY,
  `service_name` VARCHAR(255),
  `service_description` TEXT
);

-- Order Tables
CREATE TABLE `orders` (
  `order_id` INT AUTO_INCREMENT PRIMARY KEY,
  `employee_id` INT,
  `customer_id` INT,
  `vehicle_id` INT,
  `active_order` BOOLEAN,
  `order_hash` VARCHAR(255),
  `order_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`customer_id`),
  FOREIGN KEY (`vehicle_id`) REFERENCES `customer_vehicle_info`(`vehicle_id`)
);

CREATE TABLE `order_info` (
  `order_info_id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT,
  `order_total_price` DECIMAL(10, 2),
  `additional_request` TEXT,
  `additional_requests_completed` BOOLEAN,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`)
);

CREATE TABLE `order_services` (
  `order_service_id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT,
  `service_id` INT,
  `service_completed` BOOLEAN,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`),
  FOREIGN KEY (`service_id`) REFERENCES `common_services`(`service_id`)
);

CREATE TABLE `order_status` (
  `order_status_id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT,
  `order_status` INT,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`)
);

-- Seed Data
INSERT INTO `company_role` (company_role_name) VALUES ('Admin'), ('Mechanic');

-- Seed Admin User
INSERT INTO `employee` (employee_email, active_employee) VALUES ('admin@gmail.com', 1);
SET @last_employee_id = LAST_INSERT_ID();
INSERT INTO `employee_info` (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (@last_employee_id, 'Admin', 'User', '123-456-7890');
INSERT INTO `employee_pass` (employee_id, employee_password_hashed) VALUES (@last_employee_id, '$2b$10$vgHdaY4R/FvIGOu9d2GaTurzg00gr.vpnqhzF2e7VpFFoPnshLRFi');
INSERT INTO `employee_role` (employee_id, company_role_id) VALUES (@last_employee_id, 1); -- Assuming 'Admin' role is ID 1
