-- DDL for core tables

-- Drop the tables in reverse order of foreign key dependencies to avoid errors.
DROP TABLE IF EXISTS core_purchase_order_item;
DROP TABLE IF EXISTS core_work_order_part;
DROP TABLE IF EXISTS core_work_order;
DROP TABLE IF EXISTS core_asset_location;
DROP TABLE IF EXISTS core_personnel;
DROP TABLE IF EXISTS core_aircraft;
DROP TABLE IF EXISTS core_supplier;
DROP TABLE IF EXISTS core_purchase_order;
DROP TABLE IF EXISTS core_asset;

-- 1  The master table for all physical assets in the system.
CREATE TABLE core_asset (
    asset_id INTEGER PRIMARY KEY,
    asset_name TEXT NOT NULL,
    asset_nsn TEXT,
    asset_serial_number TEXT,
    asset_model TEXT,
    asset_receive_date DATE,
    asset_description TEXT,
    asset_type_id_fk INTEGER NOT NULL,
    material_condition_code_id_fk INTEGER NOT NULL,
    unit_of_measure_id_fk INTEGER,
    asset_status_id_fk INTEGER,
    FOREIGN KEY (asset_type_id_fk) REFERENCES lookup_asset_type(asset_type_id),
    FOREIGN KEY (material_condition_code_id_fk) REFERENCES lookup_material_condition_code(material_condition_code_id),
    FOREIGN KEY (unit_of_measure_id_fk) REFERENCES lookup_unit_of_measure(unit_of_measure_id),
    FOREIGN KEY (asset_status_id_fk) REFERENCES lookup_asset_status(asset_status_id)
);

-- 2 Master table for aircraft. This table is a specific type of asset.
CREATE TABLE core_aircraft (
    aircraft_id INTEGER PRIMARY KEY,
    aircraft_name TEXT NOT NULL,
    aircraft_tail_number TEXT UNIQUE NOT NULL,
    aircraft_model TEXT NOT NULL,
    aircraft_hours REAL,
    aircraft_last_inspection_date DATE,
    base_id_fk INTEGER NOT NULL,
    FOREIGN KEY (base_id_fk) REFERENCES lookup_base(base_id)
);

-- Master table for all suppliers.
CREATE TABLE core_supplier (
    supplier_id INTEGER PRIMARY KEY,
    supplier_name TEXT NOT NULL,
    supplier_address TEXT,
    supplier_contact_person TEXT,
    supplier_type_id_fk INTEGER,
    FOREIGN KEY (supplier_type_id_fk) REFERENCES lookup_supplier_type(supplier_type_id)
);

-- Master table for all purchase requests.
CREATE TABLE core_purchase_order (
    order_id INTEGER PRIMARY KEY,
    order_name TEXT NOT NULL,
    order_date DATE,
    order_expected_delivery_date DATE,
    order_total_cost REAL,
    procurement_status_id_fk INTEGER NOT NULL,
    supplier_id_fk INTEGER NOT NULL,
    FOREIGN KEY (procurement_status_id_fk) REFERENCES lookup_procurement_status(procurement_status_id),
    FOREIGN KEY (supplier_id_fk) REFERENCES core_supplier(supplier_id)
);

-- Tracks items in a purchase order.
CREATE TABLE core_purchase_order_item (
    item_id INTEGER PRIMARY KEY,
    item_name TEXT NOT NULL,
    item_quantity INTEGER,
    item_unit_cost REAL,
    order_id_fk INTEGER NOT NULL,
    asset_id_fk INTEGER NOT NULL,
    FOREIGN KEY (order_id_fk) REFERENCES core_purchase_order(order_id),
    FOREIGN KEY (asset_id_fk) REFERENCES core_asset(asset_id)
);

-- Master table for all personnel.
CREATE TABLE core_personnel (
    personnel_id INTEGER PRIMARY KEY,
    personnel_name TEXT NOT NULL,
    personnel_rank TEXT,
    personnel_serial_number TEXT UNIQUE,
    user_role_id_fk INTEGER,
    base_id_fk INTEGER,
    department_id_fk INTEGER,
    FOREIGN KEY (user_role_id_fk) REFERENCES lookup_user_role(user_role_id),
    FOREIGN KEY (base_id_fk) REFERENCES lookup_base(base_id),
    FOREIGN KEY (department_id_fk) REFERENCES lookup_department(department_id)
);

-- Central table for all maintenance activities.
CREATE TABLE core_work_order (
    order_id INTEGER PRIMARY KEY,
    order_name TEXT NOT NULL,
    order_description TEXT,
    order_start_dt DATETIME,
    order_end_dt DATETIME,
    work_order_status_id_fk INTEGER NOT NULL,
    work_order_priority_id_fk INTEGER,
    maintenance_type_id_fk INTEGER,
    asset_id_fk INTEGER NOT NULL,
    personnel_id_fk INTEGER,
    FOREIGN KEY (work_order_status_id_fk) REFERENCES lookup_work_order_status(work_order_status_id),
    FOREIGN KEY (work_order_priority_id_fk) REFERENCES lookup_work_order_priority(work_order_priority_id),
    FOREIGN KEY (maintenance_type_id_fk) REFERENCES lookup_maintenance_type(maintenance_type_id),
    FOREIGN KEY (asset_id_fk) REFERENCES core_asset(asset_id),
    FOREIGN KEY (personnel_id_fk) REFERENCES core_personnel(personnel_id)
);

-- Tracks parts used in a maintenance work order.
CREATE TABLE core_work_order_part (
    part_id INTEGER PRIMARY KEY,
    part_quantity INTEGER,
    order_id_fk INTEGER NOT NULL,
    asset_id_fk INTEGER NOT NULL,
    FOREIGN KEY (order_id_fk) REFERENCES core_work_order(order_id),
    FOREIGN KEY (asset_id_fk) REFERENCES core_asset(asset_id)
);

-- Tracks the real-time location of each asset.
CREATE TABLE core_asset_location (
    location_id INTEGER PRIMARY KEY,
    location_description TEXT,
    location_start_dt DATETIME,
    location_end_dt DATETIME,
    asset_id_fk INTEGER NOT NULL,
    location_type_id_fk INTEGER NOT NULL,
    FOREIGN KEY (asset_id_fk) REFERENCES core_asset(asset_id),
    FOREIGN KEY (location_type_id_fk) REFERENCES lookup_location_type(location_type_id)
);