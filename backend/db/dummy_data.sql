-- =============================================
-- DUMMY DATA FOR ABE GARAGE
-- =============================================

-- ---------------------------------------------
-- Common Services
-- ---------------------------------------------
INSERT INTO `common_services` (service_name, service_description) VALUES
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

-- ---------------------------------------------
-- Additional Employees (Mechanics)
-- The password for all dummy employees is 'password123'
-- The hash is: $2b$10$vgHdaY4R/FvIGOu9d2GaTurzg00gr.vpnqhzF2e7VpFFoPnshLRFi
-- ---------------------------------------------
INSERT INTO `employee` (employee_email, active_employee) VALUES ('john.doe@garage.com', 1);
SET @john_id = LAST_INSERT_ID();
INSERT INTO `employee_info` (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (@john_id, 'John', 'Doe', '555-0101');
INSERT INTO `employee_pass` (employee_id, employee_password_hashed) VALUES (@john_id, '$2b$10$vgHdaY4R/FvIGOu9d2GaTurzg00gr.vpnqhzF2e7VpFFoPnshLRFi');
INSERT INTO `employee_role` (employee_id, company_role_id) VALUES (@john_id, 2); -- Role 2: Mechanic

INSERT INTO `employee` (employee_email, active_employee) VALUES ('jane.smith@garage.com', 1);
SET @jane_id = LAST_INSERT_ID();
INSERT INTO `employee_info` (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (@jane_id, 'Jane', 'Smith', '555-0102');
INSERT INTO `employee_pass` (employee_id, employee_password_hashed) VALUES (@jane_id, '$2b$10$vgHdaY4R/FvIGOu9d2GaTurzg00gr.vpnqhzF2e7VpFFoPnshLRFi');
INSERT INTO `employee_role` (employee_id, company_role_id) VALUES (@jane_id, 2); -- Role 2: Mechanic

-- ---------------------------------------------
-- Customers
-- For dummy data, customer_hash is a simple placeholder.
-- ---------------------------------------------
INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES ('alice.w@example.com', '555-0103', 'dummyhash1');
SET @alice_id = LAST_INSERT_ID();
INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (@alice_id, 'Alice', 'Williams', 1);

INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES ('bob.j@example.com', '555-0104', 'dummyhash2');
SET @bob_id = LAST_INSERT_ID();
INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (@bob_id, 'Bob', 'Johnson', 1);

INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES ('charlie.b@example.com', '555-0105', 'dummyhash3');
SET @charlie_id = LAST_INSERT_ID();
INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (@charlie_id, 'Charlie', 'Brown', 1);

INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES ('diana.m@example.com', '555-0106', 'dummyhash4');
SET @diana_id = LAST_INSERT_ID();
INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (@diana_id, 'Diana', 'Miller', 1);

INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES ('edward.g@example.com', '555-0107', 'dummyhash5');
SET @edward_id = LAST_INSERT_ID();
INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (@edward_id, 'Edward', 'Green', 0); -- Inactive customer

-- ---------------------------------------------
-- Customer Vehicles
-- ---------------------------------------------
-- Alice's Vehicles
INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color, active_vehicle) VALUES (@alice_id, 2018, 'Toyota', 'Camry', 'Sedan', 54321, 'ALC-001', 'VIN12345ABC', 'Midnight Blue', 1);
SET @alice_v1 = LAST_INSERT_ID();
INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color, active_vehicle) VALUES (@alice_id, 2020, 'Ford', 'F-150', 'Truck', 32100, 'ALC-002', 'VIN67890DEF', 'Ruby Red', 1);
SET @alice_v2 = LAST_INSERT_ID();

-- Bob's Vehicle
INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color, active_vehicle) VALUES (@bob_id, 2019, 'Honda', 'Civic', 'Sedan', 41000, 'BOB-CAR', 'VIN11223GHI', 'Lunar Silver', 1);
SET @bob_v1 = LAST_INSERT_ID();

-- Charlie's Vehicles
INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color, active_vehicle) VALUES (@charlie_id, 2021, 'Tesla', 'Model 3', 'Electric', 22000, 'CHL-E', 'VIN44556JKL', 'Pearl White', 1);
SET @charlie_v1 = LAST_INSERT_ID();
INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color, active_vehicle) VALUES (@charlie_id, 2015, 'Jeep', 'Wrangler', 'SUV', 89000, 'OFF-ROAD', 'VIN77889MNO', 'Forrest Green', 1);
SET @charlie_v2 = LAST_INSERT_ID();

-- Diana's Vehicle
INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color, active_vehicle) VALUES (@diana_id, 2022, 'Subaru', 'Outback', 'Wagon', 15000, 'DIA-SUB', 'VIN00112PQR', 'Autumn Green', 1);
SET @diana_v1 = LAST_INSERT_ID();

-- ---------------------------------------------
-- Orders
-- order_status: 0=Pending, 1=In Progress, 2=Completed, 3=Cancelled
-- ---------------------------------------------
-- Order 1: Alice's Camry, handled by John. Completed.
INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) VALUES (@john_id, @alice_id, @alice_v1, 0, 'orderhash001');
SET @order1_id = LAST_INSERT_ID();
INSERT INTO order_info (order_id, order_total_price, additional_request, additional_requests_completed) VALUES (@order1_id, 85.50, 'Check tire pressure, please.', 1);
INSERT INTO order_services (order_id, service_id, service_completed) VALUES (@order1_id, 1, 1), (@order1_id, 7, 1); -- Oil Change, Air Filter Replacement
INSERT INTO order_status (order_id, order_status) VALUES (@order1_id, 2);

-- Order 2: Bob's Civic, handled by Jane. In Progress.
INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) VALUES (@jane_id, @bob_id, @bob_v1, 1, 'orderhash002');
SET @order2_id = LAST_INSERT_ID();
INSERT INTO order_info (order_id, order_total_price, additional_request, additional_requests_completed) VALUES (@order2_id, 350.00, 'Hearing a squeaking noise from the front right wheel.', 0);
INSERT INTO order_services (order_id, service_id, service_completed) VALUES (@order2_id, 3, 0); -- Brake Inspection
INSERT INTO order_status (order_id, order_status) VALUES (@order2_id, 1);

-- Order 3: Charlie's Tesla, handled by John. Pending.
INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) VALUES (@john_id, @charlie_id, @charlie_v1, 1, 'orderhash003');
SET @order3_id = LAST_INSERT_ID();
INSERT INTO order_info (order_id, order_total_price, additional_request, additional_requests_completed) VALUES (@order3_id, 120.00, NULL, NULL);
INSERT INTO order_services (order_id, service_id, service_completed) VALUES (@order3_id, 2, 0); -- Tire Rotation
INSERT INTO order_status (order_id, order_status) VALUES (@order3_id, 0);

-- Order 4: Diana's Subaru, handled by Admin. Completed.
INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) VALUES (1, @diana_id, @diana_v1, 0, 'orderhash004');
SET @order4_id = LAST_INSERT_ID();
INSERT INTO order_info (order_id, order_total_price, additional_request, additional_requests_completed) VALUES (@order4_id, 199.99, 'Full detail before my trip.', 1);
INSERT INTO order_services (order_id, service_id, service_completed) VALUES (@order4_id, 10, 1); -- Full Detail
INSERT INTO order_status (order_id, order_status) VALUES (@order4_id, 2);

-- Order 5: Alice's F-150, handled by Jane. Cancelled.
INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) VALUES (@jane_id, @alice_id, @alice_v2, 0, 'orderhash005');
SET @order5_id = LAST_INSERT_ID();
INSERT INTO order_info (order_id, order_total_price, additional_request, additional_requests_completed) VALUES (@order5_id, 150.00, 'Scheduled for next week, had to cancel.', 0);
INSERT INTO order_services (order_id, service_id, service_completed) VALUES (@order5_id, 5, 0); -- Wheel Alignment
INSERT INTO order_status (order_id, order_status) VALUES (@order5_id, 3); 