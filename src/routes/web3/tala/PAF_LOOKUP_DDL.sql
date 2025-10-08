-- Asset-Related Lookups

CREATE TABLE lookup_asset_type (
    type_id INTEGER PRIMARY KEY,
    type_name TEXT NOT NULL,
    type_description TEXT
);

CREATE TABLE lookup_material_condition_code (
    code_id INTEGER PRIMARY KEY,
    code_name TEXT NOT NULL,
    code_description TEXT
);

CREATE TABLE lookup_unit_of_measure (
    measure_id INTEGER PRIMARY KEY,
    measure_name TEXT NOT NULL,
    measure_description TEXT
);

CREATE TABLE lookup_hazard_class (
    class_id INTEGER PRIMARY KEY,
    class_name TEXT NOT NULL,
    class_description TEXT
);

CREATE TABLE lookup_storage_location_type (
    type_id INTEGER PRIMARY KEY,
    type_name TEXT NOT NULL,
    type_description TEXT
);

CREATE TABLE lookup_asset_status (
    status_id INTEGER PRIMARY KEY,
    status_name TEXT NOT NULL,
    status_description TEXT
);

-- Maintenance & Readiness Lookups

CREATE TABLE lookup_work_order_status (
    status_id INTEGER PRIMARY KEY,
    status_name TEXT NOT NULL,
    status_description TEXT
);

CREATE TABLE lookup_work_order_priority (
    priority_id INTEGER PRIMARY KEY,
    priority_name TEXT NOT NULL,
    priority_description TEXT
);

CREATE TABLE lookup_maintenance_type (
    type_id INTEGER PRIMARY KEY,
    type_name TEXT NOT NULL,
    type_description TEXT
);

CREATE TABLE lookup_failure_mode (
    mode_id INTEGER PRIMARY KEY,
    mode_name TEXT NOT NULL,
    mode_description TEXT
);

CREATE TABLE lookup_technician_specialty (
    specialty_id INTEGER PRIMARY KEY,
    specialty_name TEXT NOT NULL,
    specialty_description TEXT
);

-- Supply Chain Lookups

CREATE TABLE lookup_procurement_status (
    status_id INTEGER PRIMARY KEY,
    status_name TEXT NOT NULL,
    status_description TEXT
);

CREATE TABLE lookup_supplier_type (
    type_id INTEGER PRIMARY KEY,
    type_name TEXT NOT NULL,
    type_description TEXT
);

CREATE TABLE lookup_shipment_method (
    method_id INTEGER PRIMARY KEY,
    method_name TEXT NOT NULL,
    method_description TEXT
);

CREATE TABLE lookup_currency (
    currency_id INTEGER PRIMARY KEY,
    currency_name TEXT NOT NULL,
    currency_description TEXT
);

-- System & User Lookups

CREATE TABLE lookup_user_role (
    role_id INTEGER PRIMARY KEY,
    role_name TEXT NOT NULL,
    role_description TEXT
);

CREATE TABLE lookup_department (
    department_id INTEGER PRIMARY KEY,
    department_name TEXT NOT NULL,
    department_description TEXT
);

CREATE TABLE lookup_base (
    base_id INTEGER PRIMARY KEY,
    base_name TEXT NOT NULL,
    base_description TEXT
);



_______________________________________________________
INSERT INTO lookup_asset_type (type_id, type_name, type_description) VALUES
(1, 'Aircraft', 'A complete flying machine, including all systems.'),
(2, 'Engine', 'A propulsion unit for an aircraft.'),
(3, 'Component', 'A sub-assembly or part of a major system.'),
(4, 'Consumable', 'A single-use item that is expended during use.'),
(5, 'Tool', 'Equipment used to perform maintenance or repair.');

INSERT INTO lookup_material_condition_code (code_id, code_name, code_description) VALUES
(1, 'Serviceable', 'Ready for immediate issue or use.'),
(2, 'Unserviceable (Repairable)', 'Requires repair to restore to a serviceable condition.'),
(3, 'Unserviceable (Condemned)', 'Beyond economical repair and must be disposed of.'),
(4, 'In Transit', 'Being moved from one location to another.');

INSERT INTO lookup_unit_of_measure (measure_id, measure_name, measure_description) VALUES
(1, 'Each', 'A single item.'),
(2, 'Gallon', 'A unit of volume for liquids.'),
(3, 'Meter', 'A standard unit of length.'),
(4, 'Kilogram', 'A standard unit of mass.');

INSERT INTO lookup_hazard_class (class_id, class_name, class_description) VALUES
(1, 'Flammable', 'Material that can ignite easily.'),
(2, 'Corrosive', 'Material that can cause damage to other materials.'),
(3, 'Explosive', 'Material that can undergo rapid decomposition.'),
(4, 'Oxidizer', 'Material that can cause or contribute to the combustion of other material.');

INSERT INTO lookup_storage_location_type (type_id, type_name, type_description) VALUES
(1, 'Hangar', 'A large building for housing aircraft.'),
(2, 'Warehouse', 'A facility for storing goods and materials.'),
(3, 'Munitions Storage', 'A secure facility for storing ordnance.'),
(4, 'Flightline', 'An operational area where aircraft are serviced.');

INSERT INTO lookup_asset_status (status_id, status_name, status_description) VALUES
(1, 'Active', 'Currently in use or in inventory.'),
(2, 'Retired', 'No longer in service.'),
(3, 'Disposed', 'Legally disposed of or destroyed.'),
(4, 'Lost', 'Location is unknown and presumed lost.');



INSERT INTO lookup_work_order_status (status_id, status_name, status_description) VALUES
(1, 'Pending', 'Awaiting approval or assignment.'),
(2, 'In Progress', 'Actively being worked on by technicians.'),
(3, 'Completed', 'All work has been finished and recorded.'),
(4, 'Canceled', 'The work order was discontinued.');

INSERT INTO lookup_work_order_priority (priority_id, priority_name, priority_description) VALUES
(1, 'Emergency', 'Requires immediate attention to prevent mission failure or danger.'),
(2, 'Urgent', 'Requires action within a short timeframe to avoid delays.'),
(3, 'Routine', 'Standard, scheduled work that can be done at a convenient time.');

INSERT INTO lookup_maintenance_type (type_id, type_name, type_description) VALUES
(1, 'Corrective', 'Unscheduled maintenance to fix a failure.'),
(2, 'Preventive', 'Scheduled maintenance to prevent future failures.'),
(3, 'Inspection', 'A formal check to ensure compliance and readiness.');

INSERT INTO lookup_failure_mode (mode_id, mode_name, mode_description) VALUES
(1, 'Wear and Tear', 'Failure due to normal operational use.'),
(2, 'Corrosion', 'Failure due to chemical degradation.'),
(3, 'Electrical Fault', 'Failure due to an issue with wiring or circuitry.'),
(4, 'Foreign Object Damage', 'Damage caused by external debris.');

INSERT INTO lookup_technician_specialty (specialty_id, specialty_name, specialty_description) VALUES
(1, 'Avionics', 'Specialist in aircraft electronic systems.'),
(2, 'Powerplant', 'Specialist in aircraft engines and propulsion.'),
(3, 'Hydraulics', 'Specialist in fluid power systems.'),
(4, 'Structures', 'Specialist in the aircraft airframe and structural integrity.');






INSERT INTO lookup_procurement_status (status_id, status_name, status_description) VALUES
(1, 'Awaiting Approval', 'The purchase request is pending management approval.'),
(2, 'Submitted to Supplier', 'The official order has been sent to the supplier.'),
(3, 'In Transit', 'The ordered item has shipped and is on its way.'),
(4, 'Received', 'The item has been received at the designated location.'),
(5, 'Cancelled', 'The order was cancelled before it could be fulfilled.');

INSERT INTO lookup_supplier_type (type_id, type_name, type_description) VALUES
(1, 'Local', 'A supplier based within the Philippines.'),
(2, 'International', 'A supplier based outside the Philippines.'),
(3, 'Government', 'A government agency or state-owned enterprise.'),
(4, 'Private', 'A privately owned commercial company.');

INSERT INTO lookup_shipment_method (method_id, method_name, method_description) VALUES
(1, 'Air Freight', 'Shipped via air cargo for fastest delivery.'),
(2, 'Sea Freight', 'Shipped via ocean vessel for cost-efficiency.'),
(3, 'Ground', 'Shipped via truck or other land transport.');

INSERT INTO lookup_currency (currency_id, currency_name, currency_description) VALUES
(1, 'PHP', 'Philippine Peso'),
(2, 'USD', 'United States Dollar'),
(3, 'JPY', 'Japanese Yen'),
(4, 'EUR', 'Euro');





INSERT INTO lookup_user_role (role_id, role_name, role_description) VALUES
(1, 'Administrator', 'Full system access and management privileges.'),
(2, 'Commander', 'Oversight and readiness dashboard access.'),
(3, 'Supply Officer', 'Manages inventory, procurement, and asset tracking.'),
(4, 'Technician', 'Records maintenance actions and part usage.'),
(5, 'Read-Only User', 'View-only access to all reports and data.');

INSERT INTO lookup_department (department_id, department_name, department_description) VALUES
(1, 'Logistics Group', 'Responsible for supply chain and inventory.'),
(2, 'Maintenance Wing', 'Responsible for aircraft and equipment repair.'),
(3, 'Operations Wing', 'Responsible for all mission-related activities.'),
(4, 'Procurement Division', 'Responsible for all purchasing.');

INSERT INTO lookup_base (base_id, base_name, base_description) VALUES
(1, 'Clark Air Base', 'The main logistics hub and former US Air Force base in Pampanga.'),
(2, 'Basa Air Base', 'Fighter jet base in Floridablanca, Pampanga.'),
(3, 'Villamor Air Base', 'Headquarters of the Philippine Air Force in Pasay City.'),
(4, 'Mactan-Benito Ebuen Air Base', 'Air base in Lapu-Lapu City, Cebu, and a main hub for HADR.');



CREATE TABLE lookup_personnel_rank (
    rank_id INTEGER PRIMARY KEY,
    rank_name TEXT NOT NULL,
    rank_description TEXT
);

INSERT INTO lookup_personnel_rank (rank_id, rank_name, rank_description) VALUES
(1, 'Airman Basic', 'AB'),
(2, 'Airman', 'Amn'),
(3, 'Airman First Class', 'A1C'),
(4, 'Senior Airman', 'SrA'),
(5, 'Staff Sergeant', 'SSgt'),
(6, 'Technical Sergeant', 'TSgt'),
(7, 'Master Sergeant', 'MSgt'),
(8, 'Senior Master Sergeant', 'SMSgt'),
(9, 'Chief Master Sergeant', 'CMSgt'),
(10, 'Second Lieutenant', '2Lt'),
(11, 'First Lieutenant', '1Lt'),
(12, 'Captain', 'Capt'),
(13, 'Major', 'Maj'),
(14, 'Lieutenant Colonel', 'LtCol'),
(15, 'Colonel', 'Col'),
(16, 'Brigadier General', 'BGen'),
(17, 'Major General', 'MGen'),
(18, 'Lieutenant General', 'LGen');