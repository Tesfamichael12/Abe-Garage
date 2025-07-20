-- Customers tables
CREATE TABLE IF NOT EXISTS customer_identifier (
  customer_id SERIAL PRIMARY KEY,
  customer_email VARCHAR(255) NOT NULL UNIQUE,
  customer_phone_number VARCHAR(255) NOT NULL,
  customer_added_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  customer_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS customer_info (
  customer_info_id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL,
  customer_first_name VARCHAR(255) NOT NULL,
  customer_last_name VARCHAR(255) NOT NULL,
  active_customer_status INT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
);

CREATE TABLE IF NOT EXISTS customer_vehicle_info (
  vehicle_id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL,
  vehicle_year INT NOT NULL,
  vehicle_make VARCHAR(255) NOT NULL,
  vehicle_model VARCHAR(255) NOT NULL,
  vehicle_type VARCHAR(255) NOT NULL,
  vehicle_mileage INT NOT NULL,
  vehicle_tag VARCHAR(255) NOT NULL,
  vehicle_serial VARCHAR(255) NOT NULL,
  vehicle_color VARCHAR(255) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
);

-- Company tables
CREATE TABLE IF NOT EXISTS company_roles (
  company_role_id SERIAL PRIMARY KEY,
  company_role_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS common_services (
  service_id SERIAL PRIMARY KEY,
  service_name VARCHAR(255) NOT NULL,
  service_description TEXT
);

-- Employee tables
CREATE TABLE IF NOT EXISTS employee (
  employee_id SERIAL PRIMARY KEY,
  employee_email VARCHAR(255) NOT NULL UNIQUE,
  active_employee INT NOT NULL,
  added_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee_info (
  employee_info_id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL,
  employee_first_name VARCHAR(255) NOT NULL,
  employee_last_name VARCHAR(255) NOT NULL,
  employee_phone VARCHAR(255) NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE IF NOT EXISTS employee_pass (
  employee_pass_id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL,
  employee_password_hashed VARCHAR(255) NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE IF NOT EXISTS employee_role (
  employee_role_id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL UNIQUE,
  company_role_id INT NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
  FOREIGN KEY (company_role_id) REFERENCES company_roles(company_role_id)
);

-- Order tables
CREATE TABLE IF NOT EXISTS orders (
  order_id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL,
  customer_id INT NOT NULL,
  vehicle_id INT NOT NULL,
  order_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  active_order INT NOT NULL,
  order_hash VARCHAR(255) NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id),
  FOREIGN KEY (vehicle_id) REFERENCES customer_vehicle_info(vehicle_id)
);

CREATE TABLE IF NOT EXISTS order_info (
  order_info_id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  order_total_price INT NOT NULL,
  additional_request TEXT,
  additional_requests_completed INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE IF NOT EXISTS order_services (
  order_service_id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  service_id INT NOT NULL,
  service_completed INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (service_id) REFERENCES common_services(service_id)
);

CREATE TABLE IF NOT EXISTS order_status (
  order_status_id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  order_status INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Add the roles to the database
INSERT INTO company_roles (company_role_name)
VALUES ('Employee'), ('Manager'), ('Admin'); 