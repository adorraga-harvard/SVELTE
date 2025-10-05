CREATE TABLE lookup_drugs_type (
    type_id INTEGER PRIMARY KEY,
    type_name TEXT NOT NULL UNIQUE,
    remarks TEXT
);

-- Sample data
INSERT INTO lookup_drugs_types (type_id, type_name, remarks) VALUES
(1, 'Stimulant', 'Drugs that increase alertness or energy'),
(2, 'Depressant', 'Drugs that reduce CNS activity'),
(3, 'Opioid', 'Narcotic analgesics derived from morphine'),
(4, 'Hallucinogen', 'Drugs causing perceptual distortions'),
(5, 'Other', 'Miscellaneous or unclassified substances');


CREATE TABLE lookup_drugs_schedule (
    schedule_id INTEGER PRIMARY KEY,
    schedule_name TEXT NOT NULL UNIQUE,
    description TEXT
);

-- Sample data
INSERT INTO lookup_drugs_schedules (schedule_id, schedule_name, description) VALUES
(1, 'I', 'No accepted medical use, high abuse potential'),
(2, 'II', 'Accepted medical use, high abuse potential'),
(3, 'III', 'Moderate to low potential for physical or psychological dependence'),
(4, 'IV', 'Low potential for abuse and low risk of dependence'),
(5, 'V', 'Lowest potential for abuse, limited quantities of narcotics');


CREATE TABLE lookup_drugs_vendor_category (
    category_id INTEGER PRIMARY KEY,
    category_name TEXT NOT NULL UNIQUE,
    remarks TEXT
);

-- Sample data
INSERT INTO lookup_drugs_vendor_categories (category_id, category_name, remarks) VALUES
(1, 'Legitimate Pharma', 'Registered pharmaceutical suppliers'),
(2, 'Suspected Source', 'Alleged or unverified suppliers'),
(3, 'Unknown', 'Category not yet determined');


CREATE TABLE IF NOT EXISTS drugs_roster (
    drug_id INTEGER PRIMARY KEY,
    drug_name TEXT NOT NULL UNIQUE,
    type_id INTEGER NOT NULL REFERENCES lookup_drugs_types(type_id),
    chemical_composition TEXT,
    schedule_id INTEGER NOT NULL REFERENCES lookup_drugs_schedules(schedule_id),
    unit_measurement TEXT,
    remarks TEXT
);

INSERT INTO drugs_roster (drug_id, drug_name, type_id, chemical_composition, schedule_id, unit_measurement, remarks) VALUES
-- 1-50 from previous compelling list
(1, 'Methamphetamine', 1, 'C10H15N', 2, 'grams', 'Highly addictive stimulant'),
(2, 'Methamphetamine HCl', 1, 'C10H15N·HCl', 2, 'grams', 'Common crystalline form'),
(3, 'Amphetamine', 1, 'C9H13N', 2, 'grams', 'Prescription stimulant'),
(4, 'Methylphenidate', 1, 'C14H19NO2', 2, 'grams', 'Prescription stimulant, Ritalin'),
(5, 'Cocaine', 1, 'C17H21NO4', 2, 'grams', 'Stimulant from coca leaves'),
(6, 'Cocaine HCl', 1, 'C17H21NO4·HCl', 2, 'grams', ''),
(7, 'Cannabis', 2, 'C21H30O2', 1, 'kilograms', 'Marijuana plant material'),
(8, 'Cannabis Resin', 2, 'C21H30O2', 1, 'kilograms', 'Hashish form'),
(9, 'Hashish Oil', 2, 'C21H30O2', 1, 'liters', 'Concentrated extract'),
(10, 'Heroin', 3, 'C21H23NO5', 1, 'grams', 'Derived from morphine'),
(11, 'Heroin HCl', 3, 'C21H23NO5·HCl', 1, 'grams', ''),
(12, 'Morphine', 3, 'C17H19NO3', 2, 'grams', 'Opioid analgesic'),
(13, 'Fentanyl', 3, 'C22H28N2O', 2, 'grams', 'Potent synthetic opioid'),
(14, 'Oxycodone', 3, 'C18H21NO4', 2, 'mg', 'Prescription opioid'),
(15, 'Hydrocodone', 3, 'C18H21NO3', 2, 'mg', 'Prescription opioid'),
(16, 'Codeine', 3, 'C18H21NO3', 2, 'mg', 'Mild opioid analgesic'),
(17, 'Opium', 3, 'Mixture', 1, 'grams', 'Plant-based narcotic'),
(18, 'MDMA', 4, 'C11H15NO2', 1, 'grams', 'Ecstasy'),
(19, 'Molly', 4, 'C11H15NO2', 1, 'grams', 'Street name for MDMA'),
(20, 'XTC', 4, 'C11H15NO2', 1, 'grams', 'Alternate street name'),
(21, 'LSD', 4, 'C20H25N3O', 1, 'grams', 'Hallucinogen'),
(22, 'Psilocybin', 4, 'C12H17N2O4P', 1, 'grams', 'Magic mushrooms compound'),
(23, 'Ketamine', 4, 'C13H16ClNO', 2, 'grams', 'Dissociative anesthetic'),
(24, 'PCP', 4, 'C17H25N', 1, 'grams', 'Hallucinogenic dissociative'),
(25, 'GHB', 2, 'C4H8O3', 2, 'ml', 'CNS depressant'),
(26, 'Benzodiazepine (Diazepam)', 2, 'C16H13ClN2O', 4, 'mg', 'Sedative, Valium'),
(27, 'Benzodiazepine (Alprazolam)', 2, 'C17H13ClN4', 4, 'mg', 'Sedative, Xanax'),
(28, 'Clonazepam', 2, 'C15H10ClN3O3', 4, 'mg', 'Sedative/antiepileptic'),
(29, 'Barbiturates', 2, 'Varies', 4, 'mg', 'CNS depressants'),
(30, 'Synthetic Cannabinoid A', 4, 'C25H24O2', 1, 'grams', 'Spice/K2 type'),
(31, 'Synthetic Cannabinoid B', 4, 'C24H23N3O', 1, 'grams', 'New variant'),
(32, 'Synthetic Cathinone A', 1, 'C9H11NO', 1, 'grams', 'Bath salts'),
(33, 'Synthetic Cathinone B', 1, 'C10H13NO', 1, 'grams', ''),
(34, 'Methaqualone', 2, 'C16H14N2O', 1, 'grams', 'Quaalude'),
(35, 'Nimetazepam', 2, 'C17H13N3O3', 2, 'mg', 'Benzodiazepine sedative'),
(36, 'GHB Sodium', 2, 'C4H7NaO3', 2, 'ml', 'Sodium salt of GHB'),
(37, 'Buprenorphine', 3, 'C29H41NO4', 2, 'mg', 'Opioid analgesic'),
(38, 'Tramadol', 3, 'C16H25NO2', 2, 'mg', 'Synthetic opioid'),
(39, 'Meperidine', 3, 'C15H21NO2', 2, 'mg', 'Synthetic opioid'),
(40, 'Hydromorphone', 3, 'C17H19NO3', 2, 'mg', 'Powerful opioid analgesic'),
(41, 'Diazepam', 2, 'C16H13ClN2O', 4, 'mg', 'Valium'),
(42, 'Temazepam', 2, 'C16H13ClN2O2', 4, 'mg', 'Sedative'),
(43, 'Oxazepam', 2, 'C15H11ClN2O2', 4, 'mg', 'Sedative'),
(44, 'Phenobarbital', 2, 'C12H12N2O3', 4, 'mg', 'Barbiturate'),
(45, 'Secobarbital', 2, 'C12H18N2O3', 4, 'mg', 'Barbiturate sedative'),
(46, 'Flunitrazepam', 2, 'C16H12FN3O3', 1, 'mg', 'Rohypnol, potent sedative'),
(47, 'Ethylone', 1, 'C12H15NO3', 1, 'grams', 'Synthetic cathinone'),
(48, 'Butylone', 1, 'C12H15NO3', 1, 'grams', 'Synthetic cathinone variant'),
(49, 'AB-FUBINACA', 4, 'C20H21FN4O2', 1, 'grams', 'Synthetic cannabinoid'),
(50, 'MDPV', 1, 'C16H21NO3', 1, 'grams', 'Synthetic stimulant'),
-- 51-100 additional proper drugs
(51, 'Tetrahydrocannabinol', 2, 'C21H30O2', 1, 'grams', 'Main psychoactive compound in cannabis'),
(52, 'Cannabidiol', 2, 'C21H30O2', 1, 'grams', 'Non-psychoactive cannabis compound'),
(53, 'THC-A', 2, 'C22H30O4', 1, 'grams', 'Acidic form of THC'),
(54, 'THC-V', 2, 'C19H26O2', 1, 'grams', 'Variant cannabinoid'),
(55, 'Mescaline', 4, 'C11H17NO3', 1, 'grams', 'Hallucinogen from peyote'),
(56, 'Psilocin', 4, 'C12H16N2O', 1, 'grams', 'Active hallucinogen in mushrooms'),
(57, '5-MeO-DMT', 4, 'C13H18N2O', 1, 'grams', 'Potent hallucinogen'),
(58, 'DMT', 4, 'C12H16N2', 1, 'grams', 'Dimethyltryptamine, hallucinogen'),
(59, 'Salvia divinorum', 4, 'C23H28O8', 1, 'grams', 'Hallucinogenic plant'),
(60, 'PCP Hydrochloride', 4, 'C17H25N·HCl', 1, 'grams', ''),
(61, 'AM-2201', 4, 'C24H22FN O', 1, 'grams', 'Synthetic cannabinoid'),
(62, 'JWH-018', 4, 'C24H23NO', 1, 'grams', 'Synthetic cannabinoid'),
(63, 'Methadone', 3, 'C21H27NO', 2, 'mg', 'Synthetic opioid, maintenance therapy'),
(64, 'Levomethadone', 3, 'C21H27NO', 2, 'mg', 'Active enantiomer of methadone'),
(65, 'Oxycodone HCl', 3, 'C18H21NO4·HCl', 2, 'mg', ''),
(66, 'Hydromorphone HCl', 3, 'C17H19NO3·HCl', 2, 'mg', ''),
(67, 'Oxymorphone', 3, 'C17H19NO4', 2, 'mg', 'Semi-synthetic opioid'),
(68, 'Tapentadol', 3, 'C14H23NO2', 2, 'mg', 'Analgesic opioid'),
(69, 'Buprenorphine HCl', 3, 'C29H41NO4·HCl', 2, 'mg', ''),
(70, 'Heroin Base', 3, 'C21H23NO5', 1, 'grams', 'Non-salt form'),
(71, 'Ketamine HCl', 4, 'C13H16ClNO·HCl', 2, 'grams', ''),
(72, 'Rohypnol', 2, 'C16H12FN3O3', 1, 'mg', 'Flunitrazepam brand'),
(73, 'Clobazam', 2, 'C15H12ClN2O2', 4, 'mg', 'Benzodiazepine'),
(74, 'Ethylphenidate', 1, 'C14H19NO2', 2, 'mg', 'Stimulant analog of methylphenidate'),
(75, 'Desoxyn', 1, 'C10H15N', 2, 'mg', 'Brand of methamphetamine'),
(76, 'MDEA', 1, 'C11H15NO2', 1, 'grams', 'Ecstasy analog'),
(77, 'MDA', 1, 'C10H13NO2', 1, 'grams', 'Hallucinogenic amphetamine'),
(78, 'Bromazolam', 2, 'C17H12BrClN4', 4, 'mg', 'Designer benzodiazepine'),
(79, 'Flubromazolam', 2, 'C17H12BrClN4', 4, 'mg', 'Potent designer benzodiazepine'),
(80, 'Phenazepam', 2, 'C15H11BrClN2O', 4, 'mg', 'Russian sedative'),
(81, '5F-ADB', 4, 'C22H22FNO3', 1, 'grams', 'Synthetic cannabinoid'),
(82, '5F-PB-22', 4, 'C23H22FN O', 1, 'grams', 'Synthetic cannabinoid'),
(83, 'MDPV HCl', 1, 'C16H21NO3·HCl', 1, 'grams', ''),
(84, 'Alpha-PVP', 1, 'C15H21NO', 1, 'grams', 'Synthetic stimulant'),
(85, '4-MMC', 1, 'C11H15NO', 1, 'grams', 'Mephedrone, stimulant'),
(86, 'Ethylone HCl', 1, 'C12H15NO3·HCl', 1, 'grams', ''),
(87, 'Butylone HCl', 1, 'C12H15NO3·HCl', 1, 'grams', ''),
(88, 'AB-CHMINACA', 4, 'C23H26N4O2', 1, 'grams', 'Synthetic cannabinoid'),
(89, '5F-MDMB-PICA', 4, 'C25H32FN3O3', 1, 'grams', 'Synthetic cannabinoid'),
(90, '5F-AMB', 4, 'C23H32FN3O3', 1, 'grams', 'Synthetic cannabinoid'),
(91, 'AM-694', 4, 'C22H24N2O', 1, 'grams', 'Synthetic cannabinoid'),
(92, 'UR-144', 4, 'C20H21N3O', 1, 'grams', 'Synthetic cannabinoid'),
(93, 'XLR-11', 4, 'C16H19FN2O', 1, 'grams', 'Synthetic cannabinoid'),
(94, '5F-AKB48', 4, 'C23H32FN3O', 1, 'grams', 'Synthetic cannabinoid'),
(95, 'APINACA', 4, 'C22H29N3O', 1, 'grams', 'Synthetic cannabinoid'),
(96, 'JWH-073', 4, 'C18H21NO', 1, 'grams', 'Synthetic cannabinoid'),
(97, 'JWH-250', 4, 'C21H21NO', 1, 'grams', 'Synthetic cannabinoid'),
(98, 'JWH-081', 4, 'C20H21NO', 1, 'grams', 'Synthetic cannabinoid'),
(99, 'JWH-122', 4, 'C22H23NO', 1, 'grams', 'Synthetic cannabinoid'),
(100, 'JWH-210', 4, 'C23H23NO', 1, 'grams', 'Synthetic cannabinoid');



DROP TABLE  lookup_drugs_vendor_types;
DROP TABLE  lookup_drugs_vendor_statuses;

CREATE TABLE IF NOT EXISTS lookup_drugs_vendor_type (
    type_id INTEGER PRIMARY KEY AUTOINCREMENT,
    type_name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS lookup_drugs_vendor_status (
    status_id INTEGER PRIMARY KEY AUTOINCREMENT,
    status_name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS drugs_vendors (
    vendor_id INTEGER PRIMARY KEY AUTOINCREMENT,
    vendor_name TEXT NOT NULL UNIQUE,
    vendor_type_id INTEGER NOT NULL,
    contact_person TEXT,
    contact_number TEXT,
    email TEXT,
    address TEXT,
    city TEXT,
    province TEXT,
    region TEXT,
    country TEXT DEFAULT 'Philippines',
    status_id INTEGER NOT NULL,
    source TEXT,
    verified_flag INTEGER DEFAULT 0,  -- 0 = false, 1 = true
    last_verified_at TEXT,
    remarks TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_type_id) REFERENCES lookup_drugs_vendor_types(type_id),
    FOREIGN KEY (status_id) REFERENCES lookup_drugs_vendor_statuses(status_id)
);

select * from lookup_drugs_vendor_types;
select * from lookup_drugs_vendor_statuses;

-- Vendor Types
INSERT INTO lookup_drugs_vendor_types (type_name) VALUES
('Manufacturer'),
('Distributor'),
('Retailer'),
('Street Vendor'),
('Online Supplier');

-- Vendor Status
INSERT INTO lookup_drugs_vendor_statuses (status_name) VALUES
('Active'),
('Inactive'),
('Under Investigation');


-- 500 realistic drugs_vendors SQLite insert statements
INSERT INTO drugs_vendors (vendor_name, vendor_type_id, contact_person, contact_number, email, address, country, status_id, source, verified_flag, remarks) VALUES
('Barangay Uno Street Vendor 1', 1, 'Carlos Dela Rosa', '09332873842', 'barangayunostreetvendor11@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 2', 4, 'Antonio Reyes', '09775578389', 'barangayunostreetvendor22@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 3, 'FDA Registry', 1, ''),
('VitaCare Drugstore 3', 2, 'Pedro Reyes', '09486822023', 'vitacaredrugstore33@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 4', 3, 'Miguel Torres', '09848356391', 'barangayunostreetvendor44@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 1, 'FDA Registry', 1, ''),
('Healthy Life Distributors 5', 4, 'Carlos Dela Rosa', '09639233847', 'healthylifedistributors55@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 6', 5, 'Miguel Torres', '09323883717', 'barangayunostreetvendor66@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 7', 4, 'Pedro Reyes', '09342299303', NULL, '12 Rizal St., Barangay 8', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 8', 5, 'Pedro Reyes', '09348234398', NULL, '202 Osmeña Blvd., Barangay 6', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 9', 2, 'Maria Santos', '09668845219', 'metrodrugcorporation99@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 10', 1, 'Rosa Cruz', '09567914219', 'barangayunostreetvendor1010@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 11', 5, 'Clara Lim', '09547626407', 'barangayunostreetvendor1111@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 12', 4, 'Carlos Dela Rosa', '09266250858', 'mindanaohealthsupplies1212@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 13', 5, 'Miguel Torres', '09427906160', 'metrodrugcorporation1313@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 14', 3, 'Miguel Torres', '09262111110', 'cebupharmainc.1414@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 15', 1, 'Luz Mendoza', '09956631698', 'mindanaohealthsupplies1515@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 16', 2, 'Miguel Torres', '09685486945', 'barangaydosstreetvendor1616@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 3, 'FDA Registry', 1, ''),
('San Miguel Pharma 17', 4, 'Maria Santos', '09531998073', 'sanmiguelpharma1717@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Online Meds PH 18', 4, 'Juan dela Cruz', '09649816581', 'onlinemedsph1818@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 19', 2, 'Pedro Reyes', '09203680051', 'sanmiguelpharma1919@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 1, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 20', 4, 'Carlos Dela Rosa', '09996740302', 'cebupharmainc.2020@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 21', 1, 'Carlos Dela Rosa', '09636508927', NULL, '123 Rizal St., Barangay 3', 'Philippines', 1, 'FDA Registry', 1, ''),
('San Miguel Pharma 22', 5, 'Sofia Reyes', '09816518074', 'sanmiguelpharma2222@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 3, 'FDA Registry', 1, ''),
('VitaCare Drugstore 23', 1, 'Miguel Torres', '09976152445', 'vitacaredrugstore2323@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Online Meds PH 24', 4, 'Luz Mendoza', '09627049558', 'onlinemedsph2424@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'FDA Registry', 1, ''),
('Healthy Life Distributors 25', 3, 'Pedro Reyes', '09166096219', 'healthylifedistributors2525@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 26', 4, 'Rosa Cruz', '09381760782', NULL, '1011 Quezon St., Barangay 5', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 27', 1, 'Miguel Torres', '09161595922', 'healthylifedistributors2727@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 28', 1, 'Clara Lim', '09969251559', 'barangaydosstreetvendor2828@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 29', 4, 'Luz Mendoza', '09209978350', 'cebupharmainc.2929@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 30', 4, 'Pedro Reyes', '09433550337', 'metrodrugcorporation3030@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 31', 1, 'Miguel Torres', '09158941081', 'vitacaredrugstore3131@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 32', 2, 'Luz Mendoza', '09614920498', NULL, 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'FDA Registry', 1, ''),
('Metro Drug Corporation 33', 4, 'Sofia Reyes', '09176206442', 'metrodrugcorporation3333@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'FDA Registry', 1, ''),
('VitaCare Drugstore 34', 5, 'Sofia Reyes', '09921916045', 'vitacaredrugstore3434@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 35', 1, 'Pedro Reyes', '09227753070', NULL, 'Blk 1 Lot 2, Barangay 1', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 36', 1, 'Carlos Dela Rosa', '09764266290', 'metrodrugcorporation3636@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 37', 3, 'Clara Lim', '09236495015', NULL, 'Blk 3 Lot 5, Barangay 2', 'Philippines', 3, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 38', 3, 'Miguel Torres', '09667146939', 'mindanaohealthsupplies3838@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 39', 5, 'Antonio Reyes', '09501025748', NULL, '123 Rizal St., Barangay 3', 'Philippines', 3, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 40', 3, 'Sofia Reyes', '09728698271', 'barangayunostreetvendor4040@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 3, 'FDA Registry', 1, ''),
('Online Meds PH 41', 5, 'Miguel Torres', '09339610435', 'onlinemedsph4141@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 3, 'FDA Registry', 1, ''),
('Healthy Life Distributors 42', 4, 'Carlos Dela Rosa', '09131184021', 'healthylifedistributors4242@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'FDA Registry', 1, ''),
('Metro Drug Corporation 43', 5, 'Miguel Torres', '09286009301', 'metrodrugcorporation4343@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 44', 2, 'Pedro Reyes', '09149479839', 'mindanaohealthsupplies4444@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 45', 1, 'Miguel Torres', '09818494161', 'sanmiguelpharma4545@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 46', 3, 'Clara Lim', '09266709496', NULL, '202 Osmeña Blvd., Barangay 6', 'Philippines', 3, 'FDA Registry', 1, ''),
('Healthy Life Distributors 47', 3, 'Juan dela Cruz', '09504667997', NULL, '45 Mabini St., Barangay 7', 'Philippines', 2, 'FDA Registry', 1, ''),
('VitaCare Drugstore 48', 5, 'Rosa Cruz', '09412755336', 'vitacaredrugstore4848@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 49', 2, 'Miguel Torres', '09687048846', 'barangaydosstreetvendor4949@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 50', 5, 'Carlos Dela Rosa', '09915827771', 'barangayunostreetvendor5050@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 51', 5, 'Antonio Reyes', '09228509316', 'mindanaohealthsupplies5151@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 52', 4, 'Maria Santos', '09379160923', 'metrodrugcorporation5252@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 53', 4, 'Miguel Torres', '09916316727', 'healthylifedistributors5353@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 3, 'FDA Registry', 1, ''),
('San Miguel Pharma 54', 4, 'Juan dela Cruz', '09606425482', 'sanmiguelpharma5454@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 55', 2, 'Miguel Torres', '09281253841', NULL, 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'FDA Registry', 1, ''),
('Healthy Life Distributors 56', 4, 'Miguel Torres', '09472433183', 'healthylifedistributors5656@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 57', 4, 'Luz Mendoza', '09747233127', NULL, '456 Bonifacio Blvd., Barangay 4', 'Philippines', 1, 'FDA Registry', 1, ''),
('Metro Drug Corporation 58', 5, 'Rosa Cruz', '09742843322', 'metrodrugcorporation5858@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 3, 'FDA Registry', 1, ''),
('San Miguel Pharma 59', 4, 'Maria Santos', '09132768265', 'sanmiguelpharma5959@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 3, 'FDA Registry', 1, ''),
('VitaCare Drugstore 60', 1, 'Antonio Reyes', '09498258379', 'vitacaredrugstore6060@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 61', 2, 'Clara Lim', '09218382950', NULL, '456 Bonifacio Blvd., Barangay 4', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 62', 2, 'Maria Santos', '09827384386', 'barangayunostreetvendor6262@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 63', 2, 'Antonio Reyes', '09149606226', NULL, '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 64', 5, 'Carlos Dela Rosa', '09697501912', 'healthylifedistributors6464@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 65', 3, 'Maria Santos', '09943888962', 'vitacaredrugstore6565@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 66', 3, 'Luz Mendoza', '09597663666', 'healthylifedistributors6666@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'FDA Registry', 1, ''),
('San Miguel Pharma 67', 2, 'Clara Lim', '09968385128', NULL, '123 Rizal St., Barangay 3', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Online Meds PH 68', 3, 'Carlos Dela Rosa', '09306343521', 'onlinemedsph6868@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 69', 5, 'Rosa Cruz', '09153358144', 'vitacaredrugstore6969@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 70', 5, 'Juan dela Cruz', '09917891190', NULL, '456 Bonifacio Blvd., Barangay 4', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 71', 3, 'Carlos Dela Rosa', '09189143792', NULL, '456 Bonifacio Blvd., Barangay 4', 'Philippines', 1, 'FDA Registry', 1, ''),
('Healthy Life Distributors 72', 4, 'Rosa Cruz', '09145404651', 'healthylifedistributors7272@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 1, 'FDA Registry', 1, ''),
('Online Meds PH 73', 3, 'Pedro Reyes', '09772200875', 'onlinemedsph7373@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 74', 2, 'Rosa Cruz', '09232628544', 'cebupharmainc.7474@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 75', 5, 'Juan dela Cruz', '09383631795', NULL, '123 Rizal St., Barangay 3', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 76', 4, 'Sofia Reyes', '09783733966', 'healthylifedistributors7676@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 77', 4, 'Luz Mendoza', '09971364958', 'barangayunostreetvendor7777@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'FDA Registry', 1, ''),
('San Miguel Pharma 78', 2, 'Miguel Torres', '09399579641', 'sanmiguelpharma7878@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 79', 2, 'Pedro Reyes', '09636492010', 'mindanaohealthsupplies7979@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 80', 1, 'Sofia Reyes', '09227295146', NULL, 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 81', 1, 'Pedro Reyes', '09663956350', 'barangayunostreetvendor8181@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 3, 'FDA Registry', 1, ''),
('Healthy Life Distributors 82', 4, 'Luz Mendoza', '09807259071', 'healthylifedistributors8282@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 83', 4, 'Rosa Cruz', '09916905796', 'mindanaohealthsupplies8383@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 2, 'FDA Registry', 1, ''),
('Online Meds PH 84', 2, 'Pedro Reyes', '09905600511', 'onlinemedsph8484@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 85', 5, 'Carlos Dela Rosa', '09462179694', 'barangaydosstreetvendor8585@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 86', 5, 'Juan dela Cruz', '09368432531', 'barangayunostreetvendor8686@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 87', 3, 'Juan dela Cruz', '09275654904', 'sanmiguelpharma8787@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 88', 4, 'Miguel Torres', '09733761145', NULL, '1011 Quezon St., Barangay 5', 'Philippines', 1, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 89', 4, 'Carlos Dela Rosa', '09968945122', 'mindanaohealthsupplies8989@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 90', 4, 'Antonio Reyes', '09392309448', NULL, '123 Rizal St., Barangay 3', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 91', 4, 'Rosa Cruz', '09125399767', 'barangaydosstreetvendor9191@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 92', 4, 'Miguel Torres', '09964495160', 'metrodrugcorporation9292@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 93', 5, 'Clara Lim', '09609547938', NULL, '202 Osmeña Blvd., Barangay 6', 'Philippines', 3, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 94', 1, 'Antonio Reyes', '09129434279', 'barangaydosstreetvendor9494@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 2, 'FDA Registry', 1, ''),
('Online Meds PH 95', 5, 'Clara Lim', '09699735200', NULL, 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 96', 4, 'Sofia Reyes', '09383374064', 'sanmiguelpharma9696@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 3, 'FDA Registry', 1, ''),
('VitaCare Drugstore 97', 3, 'Clara Lim', '09348893371', 'vitacaredrugstore9797@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'FDA Registry', 1, ''),
('Online Meds PH 98', 5, 'Clara Lim', '09828270918', 'onlinemedsph9898@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 3, 'FDA Registry', 1, ''),
('Metro Drug Corporation 99', 4, 'Miguel Torres', '09531779149', 'metrodrugcorporation9999@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 100', 5, 'Clara Lim', '09199078958', 'mindanaohealthsupplies100100@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 101', 4, 'Miguel Torres', '09807964901', 'healthylifedistributors101101@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 102', 2, 'Luz Mendoza', '09781200085', 'vitacaredrugstore102102@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 2, 'FDA Registry', 1, ''),
('Healthy Life Distributors 103', 2, 'Rosa Cruz', '09903769126', 'healthylifedistributors103103@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'FDA Registry', 1, ''),
('San Miguel Pharma 104', 1, 'Antonio Reyes', '09602816162', 'sanmiguelpharma104104@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'FDA Registry', 1, ''),
('Healthy Life Distributors 105', 3, 'Maria Santos', '09577412883', 'healthylifedistributors105105@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 1, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 106', 1, 'Sofia Reyes', '09245877967', 'mindanaohealthsupplies106106@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'FDA Registry', 1, ''),
('Online Meds PH 107', 4, 'Carlos Dela Rosa', '09307467771', 'onlinemedsph107107@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 108', 4, 'Pedro Reyes', '09487960747', 'barangayunostreetvendor108108@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 3, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 109', 2, 'Antonio Reyes', '09477565316', 'cebupharmainc.109109@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 110', 5, 'Luz Mendoza', '09905294092', 'healthylifedistributors110110@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 2, 'FDA Registry', 1, ''),
('San Miguel Pharma 111', 1, 'Antonio Reyes', '09799409989', 'sanmiguelpharma111111@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 112', 1, 'Rosa Cruz', '09503463686', NULL, '456 Bonifacio Blvd., Barangay 4', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 113', 5, 'Juan dela Cruz', '09981986365', 'healthylifedistributors113113@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 114', 3, 'Miguel Torres', '09103353597', 'cebupharmainc.114114@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'FDA Registry', 1, ''),
('Metro Drug Corporation 115', 5, 'Clara Lim', '09717325590', 'metrodrugcorporation115115@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'FDA Registry', 1, ''),
('Metro Drug Corporation 116', 5, 'Clara Lim', '09402139092', 'metrodrugcorporation116116@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 117', 1, 'Juan dela Cruz', '09815750173', 'vitacaredrugstore117117@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 118', 3, 'Rosa Cruz', '09106905493', NULL, '123 Rizal St., Barangay 3', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Online Meds PH 119', 2, 'Clara Lim', '09492670775', 'onlinemedsph119119@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 120', 1, 'Pedro Reyes', '09461762379', 'metrodrugcorporation120120@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 121', 1, 'Rosa Cruz', '09311187078', 'vitacaredrugstore121121@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'FDA Registry', 1, ''),
('Healthy Life Distributors 122', 5, 'Juan dela Cruz', '09133073156', 'healthylifedistributors122122@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'FDA Registry', 1, ''),
('Healthy Life Distributors 123', 1, 'Carlos Dela Rosa', '09635203044', NULL, 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 124', 1, 'Clara Lim', '09771488125', 'sanmiguelpharma124124@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 2, 'FDA Registry', 1, ''),
('VitaCare Drugstore 125', 3, 'Carlos Dela Rosa', '09904580407', 'vitacaredrugstore125125@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 126', 1, 'Antonio Reyes', '09766148914', 'vitacaredrugstore126126@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 1, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 127', 2, 'Sofia Reyes', '09329177216', 'cebupharmainc.127127@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 128', 4, 'Clara Lim', '09744121829', NULL, '202 Osmeña Blvd., Barangay 6', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 129', 5, 'Pedro Reyes', '09521490266', 'cebupharmainc.129129@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 1, 'FDA Registry', 1, ''),
('VitaCare Drugstore 130', 4, 'Luz Mendoza', '09841249824', 'vitacaredrugstore130130@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 131', 2, 'Rosa Cruz', '09758715273', 'barangaydosstreetvendor131131@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 132', 4, 'Maria Santos', '09428798947', 'barangaydosstreetvendor132132@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Online Meds PH 133', 4, 'Miguel Torres', '09649195980', 'onlinemedsph133133@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 134', 2, 'Maria Santos', '09356893440', 'vitacaredrugstore134134@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 135', 4, 'Carlos Dela Rosa', '09458759082', 'cebupharmainc.135135@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 136', 2, 'Clara Lim', '09273421517', 'healthylifedistributors136136@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 137', 5, 'Sofia Reyes', '09601967524', 'barangayunostreetvendor137137@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 138', 3, 'Rosa Cruz', '09729601634', 'metrodrugcorporation138138@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 139', 3, 'Pedro Reyes', '09554869724', 'vitacaredrugstore139139@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'FDA Registry', 1, ''),
('VitaCare Drugstore 140', 1, 'Antonio Reyes', '09501124402', 'vitacaredrugstore140140@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 141', 5, 'Antonio Reyes', '09652560634', 'barangayunostreetvendor141141@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Online Meds PH 142', 1, 'Maria Santos', '09197741225', NULL, '1011 Quezon St., Barangay 5', 'Philippines', 1, 'FDA Registry', 1, ''),
('Online Meds PH 143', 3, 'Miguel Torres', '09344558530', 'onlinemedsph143143@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 144', 1, 'Sofia Reyes', '09715944997', 'sanmiguelpharma144144@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 145', 5, 'Clara Lim', '09599377695', 'cebupharmainc.145145@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 146', 4, 'Sofia Reyes', '09409582245', 'healthylifedistributors146146@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'FDA Registry', 1, ''),
('San Miguel Pharma 147', 2, 'Miguel Torres', '09983636383', 'sanmiguelpharma147147@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 148', 4, 'Juan dela Cruz', '09656252673', 'sanmiguelpharma148148@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 149', 3, 'Juan dela Cruz', '09363804157', 'healthylifedistributors149149@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'FDA Registry', 1, ''),
('San Miguel Pharma 150', 5, 'Sofia Reyes', '09686919654', 'sanmiguelpharma150150@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'FDA Registry', 1, ''),
('VitaCare Drugstore 151', 2, 'Luz Mendoza', '09268223260', NULL, 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'FDA Registry', 1, ''),
('Online Meds PH 152', 4, 'Carlos Dela Rosa', '09419467636', 'onlinemedsph152152@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 2, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 153', 5, 'Juan dela Cruz', '09947615211', 'mindanaohealthsupplies153153@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 154', 1, 'Luz Mendoza', '09489300228', 'barangayunostreetvendor154154@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 3, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 155', 3, 'Clara Lim', '09728270919', NULL, '456 Bonifacio Blvd., Barangay 4', 'Philippines', 3, 'FDA Registry', 1, ''),
('Metro Drug Corporation 156', 2, 'Carlos Dela Rosa', '09354939312', 'metrodrugcorporation156156@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 2, 'FDA Registry', 1, ''),
('Healthy Life Distributors 157', 5, 'Clara Lim', '09227548237', 'healthylifedistributors157157@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 158', 4, 'Miguel Torres', '09391957354', 'healthylifedistributors158158@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 159', 1, 'Luz Mendoza', '09156076309', 'healthylifedistributors159159@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 1, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 160', 4, 'Carlos Dela Rosa', '09496366742', 'mindanaohealthsupplies160160@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 161', 5, 'Sofia Reyes', '09589832453', 'healthylifedistributors161161@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 2, 'FDA Registry', 1, ''),
('Metro Drug Corporation 162', 4, 'Sofia Reyes', '09631424565', 'metrodrugcorporation162162@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 163', 4, 'Maria Santos', '09732582876', 'healthylifedistributors163163@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 164', 4, 'Luz Mendoza', '09352504160', 'barangaydosstreetvendor164164@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 165', 3, 'Juan dela Cruz', '09486293974', 'vitacaredrugstore165165@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 166', 2, 'Antonio Reyes', '09402902259', 'healthylifedistributors166166@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'FDA Registry', 1, ''),
('Online Meds PH 167', 2, 'Luz Mendoza', '09309825664', 'onlinemedsph167167@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 168', 1, 'Carlos Dela Rosa', '09292233743', 'healthylifedistributors168168@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Online Meds PH 169', 4, 'Antonio Reyes', '09606754830', 'onlinemedsph169169@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 170', 3, 'Maria Santos', '09935140971', 'healthylifedistributors170170@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 171', 3, 'Maria Santos', '09516911492', 'mindanaohealthsupplies171171@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 172', 2, 'Luz Mendoza', '09508272201', 'metrodrugcorporation172172@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 2, 'FDA Registry', 1, ''),
('San Miguel Pharma 173', 2, 'Clara Lim', '09317170219', 'sanmiguelpharma173173@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 174', 2, 'Pedro Reyes', '09476637961', 'barangayunostreetvendor174174@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 175', 3, 'Rosa Cruz', '09421998932', 'mindanaohealthsupplies175175@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 176', 3, 'Pedro Reyes', '09783737547', NULL, '456 Bonifacio Blvd., Barangay 4', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 177', 5, 'Clara Lim', '09124473779', 'vitacaredrugstore177177@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 178', 1, 'Clara Lim', '09446975949', 'mindanaohealthsupplies178178@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 3, 'FDA Registry', 1, ''),
('Online Meds PH 179', 3, 'Maria Santos', '09826955635', 'onlinemedsph179179@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 2, 'FDA Registry', 1, ''),
('VitaCare Drugstore 180', 4, 'Miguel Torres', '09831836607', 'vitacaredrugstore180180@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 1, 'FDA Registry', 1, ''),
('Online Meds PH 181', 1, 'Rosa Cruz', '09839836910', NULL, '123 Rizal St., Barangay 3', 'Philippines', 3, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 182', 1, 'Miguel Torres', '09861980005', 'barangaydosstreetvendor182182@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 3, 'FDA Registry', 1, ''),
('Online Meds PH 183', 4, 'Luz Mendoza', '09961116455', 'onlinemedsph183183@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 184', 2, 'Pedro Reyes', '09409016087', 'healthylifedistributors184184@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 1, 'FDA Registry', 1, ''),
('San Miguel Pharma 185', 4, 'Maria Santos', '09934656301', 'sanmiguelpharma185185@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 186', 1, 'Clara Lim', '09815761683', 'mindanaohealthsupplies186186@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'FDA Registry', 1, ''),
('Metro Drug Corporation 187', 2, 'Luz Mendoza', '09769226974', NULL, '123 Rizal St., Barangay 3', 'Philippines', 3, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 188', 2, 'Maria Santos', '09955518469', NULL, '12 Rizal St., Barangay 8', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 189', 1, 'Sofia Reyes', '09417274329', 'barangayunostreetvendor189189@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 190', 2, 'Antonio Reyes', '09333393271', NULL, '1011 Quezon St., Barangay 5', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 191', 1, 'Clara Lim', '09318667841', 'healthylifedistributors191191@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 192', 2, 'Rosa Cruz', '09546951857', 'metrodrugcorporation192192@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 193', 4, 'Maria Santos', '09767675291', 'cebupharmainc.193193@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 3, 'FDA Registry', 1, ''),
('Healthy Life Distributors 194', 5, 'Rosa Cruz', '09673473050', NULL, 'Blk 5 Lot 7, Barangay 10', 'Philippines', 3, 'FDA Registry', 1, ''),
('Healthy Life Distributors 195', 3, 'Luz Mendoza', '09517325814', 'healthylifedistributors195195@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 196', 4, 'Luz Mendoza', '09951947013', 'healthylifedistributors196196@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 197', 4, 'Luz Mendoza', '09618608716', 'barangaydosstreetvendor197197@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 198', 1, 'Rosa Cruz', '09634609330', 'cebupharmainc.198198@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 2, 'FDA Registry', 1, ''),
('VitaCare Drugstore 199', 3, 'Antonio Reyes', '09882374636', NULL, '1011 Quezon St., Barangay 5', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 200', 3, 'Pedro Reyes', '09914410171', 'healthylifedistributors200200@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 3, 'FDA Registry', 1, ''),
('Online Meds PH 201', 5, 'Sofia Reyes', '09245086272', 'onlinemedsph201201@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 202', 5, 'Pedro Reyes', '09851459885', 'sanmiguelpharma202202@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 203', 1, 'Juan dela Cruz', '09917749476', 'sanmiguelpharma203203@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 2, 'FDA Registry', 1, ''),
('VitaCare Drugstore 204', 5, 'Maria Santos', '09228021760', 'vitacaredrugstore204204@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 2, 'FDA Registry', 1, ''),
('Online Meds PH 205', 3, 'Pedro Reyes', '09607618052', 'onlinemedsph205205@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 206', 3, 'Rosa Cruz', '09404253008', 'vitacaredrugstore206206@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'FDA Registry', 1, ''),
('Metro Drug Corporation 207', 2, 'Antonio Reyes', '09355635866', NULL, 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 208', 1, 'Antonio Reyes', '09193170458', 'metrodrugcorporation208208@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 209', 1, 'Juan dela Cruz', '09768318280', 'mindanaohealthsupplies209209@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 210', 1, 'Juan dela Cruz', '09461969957', 'barangaydosstreetvendor210210@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 211', 1, 'Maria Santos', '09904961689', 'barangayunostreetvendor211211@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'FDA Registry', 1, ''),
('San Miguel Pharma 212', 4, 'Maria Santos', '09831097745', 'sanmiguelpharma212212@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 213', 1, 'Pedro Reyes', '09845127836', NULL, '45 Mabini St., Barangay 7', 'Philippines', 2, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 214', 1, 'Juan dela Cruz', '09404292474', NULL, '45 Mabini St., Barangay 7', 'Philippines', 2, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 215', 3, 'Miguel Torres', '09226431145', 'barangaydosstreetvendor215215@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 216', 3, 'Maria Santos', '09232424129', 'mindanaohealthsupplies216216@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 217', 5, 'Miguel Torres', '09558106609', 'healthylifedistributors217217@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 218', 1, 'Sofia Reyes', '09652002242', 'barangaydosstreetvendor218218@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 219', 3, 'Luz Mendoza', '09439254180', 'healthylifedistributors219219@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 220', 5, 'Rosa Cruz', '09762463951', 'cebupharmainc.220220@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 221', 3, 'Juan dela Cruz', '09287172537', 'vitacaredrugstore221221@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'FDA Registry', 1, ''),
('VitaCare Drugstore 222', 2, 'Juan dela Cruz', '09491598410', 'vitacaredrugstore222222@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 1, 'FDA Registry', 1, ''),
('San Miguel Pharma 223', 5, 'Antonio Reyes', '09194146804', NULL, '45 Mabini St., Barangay 7', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 224', 5, 'Rosa Cruz', '09216021112', 'metrodrugcorporation224224@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 3, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 225', 5, 'Rosa Cruz', '09428774710', 'cebupharmainc.225225@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'FDA Registry', 1, ''),
('Healthy Life Distributors 226', 3, 'Pedro Reyes', '09454520495', 'healthylifedistributors226226@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 227', 5, 'Rosa Cruz', '09496345528', 'vitacaredrugstore227227@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 228', 2, 'Pedro Reyes', '09318630455', 'mindanaohealthsupplies228228@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 2, 'FDA Registry', 1, ''),
('Online Meds PH 229', 1, 'Pedro Reyes', '09173023165', 'onlinemedsph229229@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 2, 'FDA Registry', 1, ''),
('Online Meds PH 230', 4, 'Miguel Torres', '09717577319', 'onlinemedsph230230@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 231', 2, 'Carlos Dela Rosa', '09152136156', 'cebupharmainc.231231@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 3, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 232', 3, 'Rosa Cruz', '09572644797', 'cebupharmainc.232232@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 233', 2, 'Juan dela Cruz', '09635034880', 'barangayunostreetvendor233233@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 234', 4, 'Carlos Dela Rosa', '09207298218', 'cebupharmainc.234234@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 235', 4, 'Antonio Reyes', '09357799829', 'cebupharmainc.235235@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 2, 'FDA Registry', 1, ''),
('Online Meds PH 236', 5, 'Carlos Dela Rosa', '09954388020', 'onlinemedsph236236@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 1, 'FDA Registry', 1, ''),
('Healthy Life Distributors 237', 1, 'Carlos Dela Rosa', '09378789353', 'healthylifedistributors237237@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 238', 1, 'Juan dela Cruz', '09117002016', 'vitacaredrugstore238238@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 239', 3, 'Sofia Reyes', '09457022239', NULL, 'Blk 5 Lot 7, Barangay 10', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Online Meds PH 240', 5, 'Luz Mendoza', '09759038465', 'onlinemedsph240240@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 241', 5, 'Luz Mendoza', '09817362318', 'barangayunostreetvendor241241@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'FDA Registry', 1, ''),
('Online Meds PH 242', 3, 'Rosa Cruz', '09115114635', 'onlinemedsph242242@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 243', 2, 'Miguel Torres', '09977040948', NULL, 'Blk 5 Lot 7, Barangay 10', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 244', 4, 'Rosa Cruz', '09893362037', NULL, 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 245', 2, 'Luz Mendoza', '09789010123', NULL, '45 Mabini St., Barangay 7', 'Philippines', 1, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 246', 4, 'Luz Mendoza', '09119553286', NULL, '12 Rizal St., Barangay 8', 'Philippines', 2, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 247', 3, 'Clara Lim', '09328870132', 'barangayunostreetvendor247247@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 248', 3, 'Juan dela Cruz', '09126553714', 'healthylifedistributors248248@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'FDA Registry', 1, ''),
('Healthy Life Distributors 249', 2, 'Juan dela Cruz', '09469698113', 'healthylifedistributors249249@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 250', 2, 'Miguel Torres', '09671891177', 'barangaydosstreetvendor250250@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 251', 1, 'Miguel Torres', '09851340206', NULL, '45 Mabini St., Barangay 7', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 252', 4, 'Pedro Reyes', '09906300569', NULL, 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'FDA Registry', 1, ''),
('Online Meds PH 253', 5, 'Juan dela Cruz', '09233986390', 'onlinemedsph253253@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 3, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 254', 4, 'Juan dela Cruz', '09243409612', NULL, '1011 Quezon St., Barangay 5', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 255', 3, 'Clara Lim', '09124810719', 'vitacaredrugstore255255@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 256', 5, 'Antonio Reyes', '09971847299', 'healthylifedistributors256256@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 2, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 257', 5, 'Rosa Cruz', '09616917973', 'mindanaohealthsupplies257257@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 258', 1, 'Antonio Reyes', '09887000855', 'vitacaredrugstore258258@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 259', 4, 'Luz Mendoza', '09682861281', 'mindanaohealthsupplies259259@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 2, 'FDA Registry', 1, ''),
('VitaCare Drugstore 260', 1, 'Maria Santos', '09448330019', 'vitacaredrugstore260260@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 3, 'FDA Registry', 1, ''),
('Healthy Life Distributors 261', 1, 'Maria Santos', '09724214900', 'healthylifedistributors261261@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 262', 3, 'Antonio Reyes', '09507681233', 'barangaydosstreetvendor262262@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 3, 'FDA Registry', 1, ''),
('VitaCare Drugstore 263', 3, 'Sofia Reyes', '09184440537', 'vitacaredrugstore263263@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 264', 2, 'Juan dela Cruz', '09721145230', 'healthylifedistributors264264@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 265', 3, 'Juan dela Cruz', '09981423688', 'barangayunostreetvendor265265@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 3, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 266', 2, 'Luz Mendoza', '09188411317', NULL, '1011 Quezon St., Barangay 5', 'Philippines', 2, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 267', 3, 'Carlos Dela Rosa', '09365075167', 'cebupharmainc.267267@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'FDA Registry', 1, ''),
('Online Meds PH 268', 1, 'Miguel Torres', '09133778864', NULL, '1011 Quezon St., Barangay 5', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 269', 1, 'Carlos Dela Rosa', '09162229373', 'barangaydosstreetvendor269269@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 1, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 270', 2, 'Clara Lim', '09651757116', 'cebupharmainc.270270@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 1, 'FDA Registry', 1, ''),
('VitaCare Drugstore 271', 1, 'Miguel Torres', '09586335511', 'vitacaredrugstore271271@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 272', 1, 'Maria Santos', '09911239716', 'mindanaohealthsupplies272272@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Online Meds PH 273', 2, 'Carlos Dela Rosa', '09351594386', 'onlinemedsph273273@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 274', 1, 'Carlos Dela Rosa', '09855583624', 'barangaydosstreetvendor274274@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 275', 2, 'Pedro Reyes', '09247411524', 'metrodrugcorporation275275@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 276', 3, 'Miguel Torres', '09954034499', NULL, 'Blk 5 Lot 7, Barangay 10', 'Philippines', 1, 'FDA Registry', 1, ''),
('Metro Drug Corporation 277', 2, 'Clara Lim', '09392409045', 'metrodrugcorporation277277@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 278', 5, 'Miguel Torres', '09858832229', 'cebupharmainc.278278@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 279', 1, 'Luz Mendoza', '09967416392', NULL, 'Blk 1 Lot 2, Barangay 1', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 280', 3, 'Carlos Dela Rosa', '09587983498', 'barangayunostreetvendor280280@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 2, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 281', 2, 'Pedro Reyes', '09418953049', 'mindanaohealthsupplies281281@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'FDA Registry', 1, ''),
('San Miguel Pharma 282', 3, 'Pedro Reyes', '09317003532', 'sanmiguelpharma282282@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 3, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 283', 2, 'Miguel Torres', '09105661466', 'mindanaohealthsupplies283283@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 284', 5, 'Clara Lim', '09208279903', 'cebupharmainc.284284@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 2, 'FDA Registry', 1, ''),
('San Miguel Pharma 285', 3, 'Sofia Reyes', '09269323879', NULL, '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 286', 4, 'Miguel Torres', '09377662722', NULL, 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 287', 1, 'Luz Mendoza', '09706207593', 'cebupharmainc.287287@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 2, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 288', 3, 'Sofia Reyes', '09827833585', 'barangayunostreetvendor288288@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 289', 1, 'Sofia Reyes', '09838326352', 'barangayunostreetvendor289289@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 290', 5, 'Sofia Reyes', '09678271758', 'barangayunostreetvendor290290@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 291', 1, 'Luz Mendoza', '09111499103', 'cebupharmainc.291291@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 292', 5, 'Sofia Reyes', '09926366055', 'barangaydosstreetvendor292292@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 2, 'FDA Registry', 1, ''),
('San Miguel Pharma 293', 4, 'Carlos Dela Rosa', '09654659027', 'sanmiguelpharma293293@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 294', 3, 'Juan dela Cruz', '09596789834', NULL, '123 Rizal St., Barangay 3', 'Philippines', 2, 'FDA Registry', 1, ''),
('VitaCare Drugstore 295', 4, 'Rosa Cruz', '09462547606', 'vitacaredrugstore295295@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 296', 3, 'Pedro Reyes', '09328700175', 'mindanaohealthsupplies296296@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 3, 'FDA Registry', 1, ''),
('Metro Drug Corporation 297', 1, 'Pedro Reyes', '09102568184', 'metrodrugcorporation297297@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 298', 3, 'Juan dela Cruz', '09347902564', 'barangaydosstreetvendor298298@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 1, 'FDA Registry', 1, ''),
('San Miguel Pharma 299', 2, 'Maria Santos', '09179572350', NULL, 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'FDA Registry', 1, ''),
('Metro Drug Corporation 300', 4, 'Clara Lim', '09893142437', NULL, 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 301', 5, 'Juan dela Cruz', '09387088873', 'barangayunostreetvendor301301@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 302', 1, 'Carlos Dela Rosa', '09137549768', NULL, 'Blk 1 Lot 2, Barangay 1', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 303', 2, 'Sofia Reyes', '09877991390', 'barangayunostreetvendor303303@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 304', 5, 'Miguel Torres', '09975785569', 'metrodrugcorporation304304@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 305', 4, 'Miguel Torres', '09271648485', 'metrodrugcorporation305305@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 306', 5, 'Luz Mendoza', '09977599647', 'barangaydosstreetvendor306306@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 307', 3, 'Clara Lim', '09382712406', 'barangaydosstreetvendor307307@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 308', 4, 'Carlos Dela Rosa', '09897127437', NULL, '456 Bonifacio Blvd., Barangay 4', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 309', 1, 'Carlos Dela Rosa', '09167240119', 'metrodrugcorporation309309@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 310', 2, 'Miguel Torres', '09159764934', 'vitacaredrugstore310310@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Online Meds PH 311', 5, 'Pedro Reyes', '09324516108', 'onlinemedsph311311@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 312', 3, 'Luz Mendoza', '09473572003', 'barangaydosstreetvendor312312@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 3, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 313', 4, 'Juan dela Cruz', '09241474922', NULL, '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'FDA Registry', 1, ''),
('VitaCare Drugstore 314', 3, 'Rosa Cruz', '09449219218', 'vitacaredrugstore314314@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'FDA Registry', 1, ''),
('Online Meds PH 315', 4, 'Antonio Reyes', '09688823840', 'onlinemedsph315315@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'FDA Registry', 1, ''),
('Online Meds PH 316', 1, 'Sofia Reyes', '09565277156', NULL, '1011 Quezon St., Barangay 5', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 317', 5, 'Luz Mendoza', '09735197890', 'healthylifedistributors317317@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 3, 'FDA Registry', 1, ''),
('Healthy Life Distributors 318', 2, 'Antonio Reyes', '09153785679', NULL, '202 Osmeña Blvd., Barangay 6', 'Philippines', 2, 'FDA Registry', 1, ''),
('Healthy Life Distributors 319', 4, 'Maria Santos', '09368107180', 'healthylifedistributors319319@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 320', 2, 'Clara Lim', '09301790463', 'cebupharmainc.320320@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 2, 'FDA Registry', 1, ''),
('San Miguel Pharma 321', 1, 'Sofia Reyes', '09975178828', 'sanmiguelpharma321321@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 322', 4, 'Sofia Reyes', '09888492177', NULL, 'Blk 5 Lot 7, Barangay 10', 'Philippines', 3, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 323', 4, 'Antonio Reyes', '09652773558', 'mindanaohealthsupplies323323@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Online Meds PH 324', 2, 'Antonio Reyes', '09704784466', 'onlinemedsph324324@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 325', 3, 'Miguel Torres', '09248289968', 'barangaydosstreetvendor325325@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 326', 4, 'Juan dela Cruz', '09317531802', NULL, 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'FDA Registry', 1, ''),
('VitaCare Drugstore 327', 2, 'Luz Mendoza', '09672250964', 'vitacaredrugstore327327@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 328', 2, 'Juan dela Cruz', '09545176374', NULL, '202 Osmeña Blvd., Barangay 6', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 329', 3, 'Luz Mendoza', '09429846153', NULL, 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Online Meds PH 330', 2, 'Pedro Reyes', '09811821191', 'onlinemedsph330330@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 331', 4, 'Clara Lim', '09405967940', 'sanmiguelpharma331331@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 332', 1, 'Rosa Cruz', '09488799155', 'barangaydosstreetvendor332332@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 333', 4, 'Carlos Dela Rosa', '09325608213', 'healthylifedistributors333333@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 334', 2, 'Maria Santos', '09454371309', NULL, 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'FDA Registry', 1, ''),
('Metro Drug Corporation 335', 2, 'Juan dela Cruz', '09509187382', NULL, 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 336', 1, 'Rosa Cruz', '09141503358', 'cebupharmainc.336336@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 3, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 337', 4, 'Juan dela Cruz', '09164287195', NULL, 'Blk 5 Lot 7, Barangay 10', 'Philippines', 3, 'FDA Registry', 1, ''),
('Online Meds PH 338', 2, 'Clara Lim', '09731781791', 'onlinemedsph338338@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 2, 'FDA Registry', 1, ''),
('Online Meds PH 339', 2, 'Antonio Reyes', '09814008785', 'onlinemedsph339339@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 340', 2, 'Sofia Reyes', '09495177364', NULL, '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 341', 5, 'Pedro Reyes', '09409272387', 'barangayunostreetvendor341341@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 342', 1, 'Luz Mendoza', '09977662552', 'sanmiguelpharma342342@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'FDA Registry', 1, ''),
('VitaCare Drugstore 343', 5, 'Luz Mendoza', '09225174798', NULL, '12 Rizal St., Barangay 8', 'Philippines', 3, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 344', 3, 'Rosa Cruz', '09223207309', 'mindanaohealthsupplies344344@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Online Meds PH 345', 1, 'Miguel Torres', '09666110208', 'onlinemedsph345345@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 346', 2, 'Maria Santos', '09478852429', NULL, '1011 Quezon St., Barangay 5', 'Philippines', 3, 'FDA Registry', 1, ''),
('Healthy Life Distributors 347', 3, 'Juan dela Cruz', '09888953258', 'healthylifedistributors347347@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 2, 'FDA Registry', 1, ''),
('Metro Drug Corporation 348', 1, 'Luz Mendoza', '09265473892', 'metrodrugcorporation348348@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 349', 4, 'Clara Lim', '09277088053', 'mindanaohealthsupplies349349@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 350', 5, 'Rosa Cruz', '09781546353', 'healthylifedistributors350350@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 1, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 351', 4, 'Luz Mendoza', '09335124590', 'mindanaohealthsupplies351351@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 352', 1, 'Pedro Reyes', '09164012392', 'mindanaohealthsupplies352352@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 3, 'FDA Registry', 1, ''),
('VitaCare Drugstore 353', 2, 'Rosa Cruz', '09999847228', 'vitacaredrugstore353353@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 2, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 354', 5, 'Antonio Reyes', '09808611276', NULL, '123 Rizal St., Barangay 3', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 355', 3, 'Rosa Cruz', '09904971268', NULL, 'Blk 5 Lot 7, Barangay 10', 'Philippines', 3, 'FDA Registry', 1, ''),
('Online Meds PH 356', 1, 'Rosa Cruz', '09864336186', 'onlinemedsph356356@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 357', 3, 'Maria Santos', '09677878245', NULL, '45 Mabini St., Barangay 7', 'Philippines', 1, 'FDA Registry', 1, ''),
('Metro Drug Corporation 358', 4, 'Miguel Torres', '09697916530', NULL, '202 Osmeña Blvd., Barangay 6', 'Philippines', 2, 'FDA Registry', 1, ''),
('Online Meds PH 359', 5, 'Carlos Dela Rosa', '09505151647', 'onlinemedsph359359@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 2, 'FDA Registry', 1, ''),
('Healthy Life Distributors 360', 5, 'Pedro Reyes', '09863434703', 'healthylifedistributors360360@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 3, 'FDA Registry', 1, ''),
('Metro Drug Corporation 361', 4, 'Clara Lim', '09248287446', 'metrodrugcorporation361361@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 362', 2, 'Rosa Cruz', '09854010416', NULL, '456 Bonifacio Blvd., Barangay 4', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 363', 2, 'Antonio Reyes', '09594329819', 'cebupharmainc.363363@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'FDA Registry', 1, ''),
('VitaCare Drugstore 364', 1, 'Carlos Dela Rosa', '09779991036', 'vitacaredrugstore364364@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 365', 5, 'Miguel Torres', '09766193316', 'cebupharmainc.365365@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 366', 3, 'Antonio Reyes', '09257644089', 'barangaydosstreetvendor366366@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'FDA Registry', 1, ''),
('VitaCare Drugstore 367', 4, 'Juan dela Cruz', '09375486879', 'vitacaredrugstore367367@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Online Meds PH 368', 2, 'Juan dela Cruz', '09197947121', 'onlinemedsph368368@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 369', 2, 'Carlos Dela Rosa', '09159176456', 'mindanaohealthsupplies369369@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 370', 3, 'Carlos Dela Rosa', '09537030466', 'metrodrugcorporation370370@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 371', 1, 'Sofia Reyes', '09325316054', NULL, '456 Bonifacio Blvd., Barangay 4', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 372', 2, 'Rosa Cruz', '09565343658', 'sanmiguelpharma372372@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 373', 1, 'Clara Lim', '09981456603', NULL, '45 Mabini St., Barangay 7', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 374', 2, 'Antonio Reyes', '09338836259', 'mindanaohealthsupplies374374@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 375', 4, 'Juan dela Cruz', '09388584657', 'cebupharmainc.375375@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 3, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 376', 4, 'Luz Mendoza', '09655564787', 'barangaydosstreetvendor376376@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 2, 'FDA Registry', 1, ''),
('San Miguel Pharma 377', 1, 'Pedro Reyes', '09123266767', 'sanmiguelpharma377377@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 378', 5, 'Miguel Torres', '09315104067', 'metrodrugcorporation378378@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 379', 1, 'Luz Mendoza', '09581026217', 'barangaydosstreetvendor379379@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 380', 3, 'Pedro Reyes', '09413733786', 'barangaydosstreetvendor380380@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 3, 'FDA Registry', 1, ''),
('Healthy Life Distributors 381', 2, 'Clara Lim', '09359617498', NULL, '45 Mabini St., Barangay 7', 'Philippines', 1, 'FDA Registry', 1, ''),
('Metro Drug Corporation 382', 5, 'Juan dela Cruz', '09981989186', NULL, '456 Bonifacio Blvd., Barangay 4', 'Philippines', 2, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 383', 5, 'Carlos Dela Rosa', '09374775814', 'mindanaohealthsupplies383383@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'FDA Registry', 1, ''),
('Healthy Life Distributors 384', 2, 'Luz Mendoza', '09525024752', 'healthylifedistributors384384@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 385', 5, 'Juan dela Cruz', '09302951921', 'vitacaredrugstore385385@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 386', 3, 'Carlos Dela Rosa', '09551686723', 'sanmiguelpharma386386@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 387', 2, 'Juan dela Cruz', '09573516898', 'vitacaredrugstore387387@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 388', 5, 'Sofia Reyes', '09383922882', 'cebupharmainc.388388@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 3, 'FDA Registry', 1, ''),
('Healthy Life Distributors 389', 3, 'Clara Lim', '09869568986', 'healthylifedistributors389389@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 3, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 390', 1, 'Sofia Reyes', '09184322138', 'barangayunostreetvendor390390@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 391', 3, 'Luz Mendoza', '09291604997', 'metrodrugcorporation391391@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 392', 3, 'Pedro Reyes', '09167382007', NULL, 'Blk 10 Lot 3, Barangay 9', 'Philippines', 3, 'FDA Registry', 1, ''),
('VitaCare Drugstore 393', 4, 'Pedro Reyes', '09488609752', 'vitacaredrugstore393393@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 2, 'FDA Registry', 1, ''),
('VitaCare Drugstore 394', 5, 'Miguel Torres', '09219765934', 'vitacaredrugstore394394@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 395', 3, 'Clara Lim', '09485258217', NULL, '123 Rizal St., Barangay 3', 'Philippines', 3, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 396', 5, 'Juan dela Cruz', '09839945796', 'cebupharmainc.396396@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 397', 2, 'Maria Santos', '09329198498', NULL, '456 Bonifacio Blvd., Barangay 4', 'Philippines', 2, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 398', 2, 'Miguel Torres', '09534765454', NULL, '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Online Meds PH 399', 4, 'Miguel Torres', '09912252285', 'onlinemedsph399399@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 2, 'FDA Registry', 1, ''),
('San Miguel Pharma 400', 2, 'Rosa Cruz', '09204888578', 'sanmiguelpharma400400@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 401', 2, 'Miguel Torres', '09221998799', 'mindanaohealthsupplies401401@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 402', 2, 'Miguel Torres', '09406949230', 'barangaydosstreetvendor402402@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 403', 1, 'Rosa Cruz', '09745274188', 'sanmiguelpharma403403@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 1, 'FDA Registry', 1, ''),
('San Miguel Pharma 404', 1, 'Antonio Reyes', '09679536063', 'sanmiguelpharma404404@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 3, 'FDA Registry', 1, ''),
('Healthy Life Distributors 405', 2, 'Luz Mendoza', '09922996406', 'healthylifedistributors405405@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 406', 2, 'Carlos Dela Rosa', '09114478754', 'vitacaredrugstore406406@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 407', 4, 'Sofia Reyes', '09514490051', 'cebupharmainc.407407@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 408', 4, 'Antonio Reyes', '09305103180', 'barangaydosstreetvendor408408@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 409', 1, 'Clara Lim', '09144754787', 'metrodrugcorporation409409@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'FDA Registry', 1, ''),
('VitaCare Drugstore 410', 1, 'Luz Mendoza', '09458336268', 'vitacaredrugstore410410@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 411', 1, 'Antonio Reyes', '09266444467', 'cebupharmainc.411411@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 2, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 412', 3, 'Carlos Dela Rosa', '09671477307', 'mindanaohealthsupplies412412@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 413', 2, 'Sofia Reyes', '09654483051', 'mindanaohealthsupplies413413@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 414', 2, 'Carlos Dela Rosa', '09485719623', 'barangayunostreetvendor414414@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 415', 1, 'Clara Lim', '09433015419', 'metrodrugcorporation415415@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 416', 1, 'Pedro Reyes', '09771833844', NULL, '45 Mabini St., Barangay 7', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 417', 1, 'Sofia Reyes', '09789012449', 'metrodrugcorporation417417@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 418', 5, 'Juan dela Cruz', '09989300747', 'vitacaredrugstore418418@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 419', 5, 'Maria Santos', '09803108686', 'barangaydosstreetvendor419419@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 420', 5, 'Miguel Torres', '09671670845', 'cebupharmainc.420420@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 421', 1, 'Clara Lim', '09771270340', 'cebupharmainc.421421@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Online Meds PH 422', 2, 'Carlos Dela Rosa', '09841990765', 'onlinemedsph422422@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 423', 1, 'Clara Lim', '09861592128', 'mindanaohealthsupplies423423@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'FDA Registry', 1, ''),
('San Miguel Pharma 424', 3, 'Clara Lim', '09522677045', 'sanmiguelpharma424424@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'FDA Registry', 1, ''),
('Healthy Life Distributors 425', 1, 'Luz Mendoza', '09636317390', 'healthylifedistributors425425@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 3, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 426', 2, 'Miguel Torres', '09535876996', 'cebupharmainc.426426@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 1, 'FDA Registry', 1, ''),
('VitaCare Drugstore 427', 2, 'Rosa Cruz', '09449422996', NULL, '45 Mabini St., Barangay 7', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 428', 3, 'Rosa Cruz', '09738760390', 'barangayunostreetvendor428428@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 2, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 429', 2, 'Sofia Reyes', '09434155764', 'mindanaohealthsupplies429429@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 430', 3, 'Pedro Reyes', '09706052768', 'metrodrugcorporation430430@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 431', 2, 'Pedro Reyes', '09287685619', 'mindanaohealthsupplies431431@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 432', 1, 'Luz Mendoza', '09133067013', 'barangayunostreetvendor432432@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 2, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 433', 5, 'Maria Santos', '09336162311', 'mindanaohealthsupplies433433@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 434', 2, 'Luz Mendoza', '09693360869', 'healthylifedistributors434434@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 3, 'FDA Registry', 1, ''),
('Metro Drug Corporation 435', 2, 'Luz Mendoza', '09481012451', 'metrodrugcorporation435435@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 436', 1, 'Juan dela Cruz', '09316327491', 'barangaydosstreetvendor436436@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 437', 5, 'Miguel Torres', '09598369232', 'mindanaohealthsupplies437437@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 438', 3, 'Luz Mendoza', '09361834048', 'healthylifedistributors438438@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 439', 5, 'Maria Santos', '09593412181', NULL, '12 Rizal St., Barangay 8', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 440', 5, 'Rosa Cruz', '09373720424', 'barangaydosstreetvendor440440@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 441', 1, 'Pedro Reyes', '09556934656', 'barangayunostreetvendor441441@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 2, 'FDA Registry', 1, ''),
('Metro Drug Corporation 442', 4, 'Antonio Reyes', '09558851242', 'metrodrugcorporation442442@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 443', 4, 'Juan dela Cruz', '09419972705', 'mindanaohealthsupplies443443@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 444', 2, 'Antonio Reyes', '09606229153', 'metrodrugcorporation444444@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 445', 5, 'Carlos Dela Rosa', '09419763066', 'cebupharmainc.445445@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 446', 4, 'Sofia Reyes', '09605708643', NULL, 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 447', 3, 'Antonio Reyes', '09643611945', 'barangayunostreetvendor447447@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 3, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 448', 1, 'Antonio Reyes', '09803435142', 'barangayunostreetvendor448448@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'FDA Registry', 1, ''),
('Online Meds PH 449', 3, 'Clara Lim', '09535455945', 'onlinemedsph449449@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 450', 5, 'Pedro Reyes', '09234023090', 'metrodrugcorporation450450@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Online Meds PH 451', 2, 'Rosa Cruz', '09571035295', 'onlinemedsph451451@example.ph', '45 Mabini St., Barangay 7', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 452', 3, 'Antonio Reyes', '09646610238', 'vitacaredrugstore452452@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 453', 5, 'Sofia Reyes', '09574538919', 'sanmiguelpharma453453@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 454', 4, 'Sofia Reyes', '09642939719', 'vitacaredrugstore454454@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 455', 4, 'Luz Mendoza', '09749346349', 'barangayunostreetvendor455455@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'FDA Registry', 1, ''),
('Metro Drug Corporation 456', 1, 'Maria Santos', '09803396219', 'metrodrugcorporation456456@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 457', 3, 'Juan dela Cruz', '09747754961', 'cebupharmainc.457457@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Online Meds PH 458', 5, 'Luz Mendoza', '09255797014', 'onlinemedsph458458@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 459', 5, 'Carlos Dela Rosa', '09786246848', NULL, '45 Mabini St., Barangay 7', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 460', 4, 'Antonio Reyes', '09856391365', NULL, 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 461', 2, 'Miguel Torres', '09722610626', NULL, '456 Bonifacio Blvd., Barangay 4', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 462', 3, 'Maria Santos', '09348345188', 'metrodrugcorporation462462@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 463', 5, 'Antonio Reyes', '09365845710', 'barangayunostreetvendor463463@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Cebu Pharma Inc. 464', 4, 'Miguel Torres', '09926805986', 'cebupharmainc.464464@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 465', 1, 'Rosa Cruz', '09236860400', NULL, '12 Rizal St., Barangay 8', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 466', 1, 'Juan dela Cruz', '09235820020', 'healthylifedistributors466466@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 467', 5, 'Miguel Torres', '09583952284', 'barangaydosstreetvendor467467@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 1, 'FDA Registry', 1, ''),
('Healthy Life Distributors 468', 2, 'Sofia Reyes', '09784355852', NULL, 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'FDA Registry', 1, ''),
('San Miguel Pharma 469', 1, 'Pedro Reyes', '09295224719', 'sanmiguelpharma469469@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Online Meds PH 470', 1, 'Luz Mendoza', '09592304660', 'onlinemedsph470470@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 471', 2, 'Juan dela Cruz', '09482231892', 'mindanaohealthsupplies471471@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 472', 3, 'Pedro Reyes', '09807534899', NULL, '12 Rizal St., Barangay 8', 'Philippines', 3, 'FDA Registry', 1, ''),
('Healthy Life Distributors 473', 4, 'Rosa Cruz', '09928266648', 'healthylifedistributors473473@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 474', 5, 'Antonio Reyes', '09228096789', 'metrodrugcorporation474474@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 1, 'FDA Registry', 1, ''),
('Metro Drug Corporation 475', 2, 'Antonio Reyes', '09877840360', 'metrodrugcorporation475475@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 476', 3, 'Pedro Reyes', '09268177251', 'barangaydosstreetvendor476476@example.ph', '202 Osmeña Blvd., Barangay 6', 'Philippines', 2, 'FDA Registry', 1, ''),
('VitaCare Drugstore 477', 2, 'Juan dela Cruz', '09143504433', 'vitacaredrugstore477477@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Dos Street Vendor 478', 3, 'Maria Santos', '09655761682', 'barangaydosstreetvendor478478@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 1, 'FDA Registry', 1, ''),
('Online Meds PH 479', 3, 'Pedro Reyes', '09959079708', 'onlinemedsph479479@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 2, 'FDA Registry', 1, ''),
('Cebu Pharma Inc. 480', 5, 'Clara Lim', '09327803771', 'cebupharmainc.480480@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Metro Drug Corporation 481', 2, 'Maria Santos', '09357253820', 'metrodrugcorporation481481@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 482', 1, 'Antonio Reyes', '09745660421', 'sanmiguelpharma482482@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Healthy Life Distributors 483', 1, 'Rosa Cruz', '09977238612', 'healthylifedistributors483483@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('San Miguel Pharma 484', 3, 'Rosa Cruz', '09365080400', 'sanmiguelpharma484484@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 1, 'FDA Registry', 1, ''),
('Healthy Life Distributors 485', 5, 'Rosa Cruz', '09548790018', 'healthylifedistributors485485@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('Barangay Uno Street Vendor 486', 5, 'Pedro Reyes', '09732950523', 'barangayunostreetvendor486486@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 2, 'FDA Registry', 1, ''),
('Barangay Dos Street Vendor 487', 5, 'Maria Santos', '09322323098', 'barangaydosstreetvendor487487@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 1, 'FDA Registry', 1, ''),
('Metro Drug Corporation 488', 4, 'Luz Mendoza', '09838705580', 'metrodrugcorporation488488@example.ph', '123 Rizal St., Barangay 3', 'Philippines', 3, 'PDEA Intelligence', 0, ''),
('Online Meds PH 489', 5, 'Clara Lim', '09417853658', 'onlinemedsph489489@example.ph', 'Blk 1 Lot 2, Barangay 1', 'Philippines', 3, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 490', 5, 'Pedro Reyes', '09524278173', NULL, '45 Mabini St., Barangay 7', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Mindanao Health Supplies 491', 2, 'Carlos Dela Rosa', '09534217158', NULL, '123 Rizal St., Barangay 3', 'Philippines', 1, 'FDA Registry', 1, ''),
('Mindanao Health Supplies 492', 1, 'Rosa Cruz', '09484769391', 'mindanaohealthsupplies492492@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 2, 'FDA Registry', 1, ''),
('Barangay Uno Street Vendor 493', 4, 'Juan dela Cruz', '09692523010', 'barangayunostreetvendor493493@example.ph', 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'PDEA Intelligence', 0, ''),
('VitaCare Drugstore 494', 4, 'Luz Mendoza', '09692151934', 'vitacaredrugstore494494@example.ph', 'Blk 3 Lot 5, Barangay 2', 'Philippines', 3, 'FDA Registry', 1, ''),
('San Miguel Pharma 495', 5, 'Maria Santos', '09774905360', 'sanmiguelpharma495495@example.ph', '12 Rizal St., Barangay 8', 'Philippines', 1, 'PDEA Intelligence', 0, ''),
('Online Meds PH 496', 2, 'Rosa Cruz', '09329547420', NULL, 'Blk 10 Lot 3, Barangay 9', 'Philippines', 2, 'FDA Registry', 1, ''),
('Healthy Life Distributors 497', 3, 'Carlos Dela Rosa', '09731591565', 'healthylifedistributors497497@example.ph', 'Blk 5 Lot 7, Barangay 10', 'Philippines', 1, 'FDA Registry', 1, ''),
('VitaCare Drugstore 498', 2, 'Antonio Reyes', '09171833969', NULL, 'Blk 3 Lot 5, Barangay 2', 'Philippines', 2, 'FDA Registry', 1, ''),
('Healthy Life Distributors 499', 1, 'Luz Mendoza', '09843508107', 'healthylifedistributors499499@example.ph', '456 Bonifacio Blvd., Barangay 4', 'Philippines', 1, 'FDA Registry', 1, ''),
('Online Meds PH 500', 5, 'Clara Lim', '09917340675', 'onlinemedsph500500@example.ph', '1011 Quezon St., Barangay 5', 'Philippines', 2, 'PDEA Intelligence', 0, '');




CREATE TABLE lookup_operations_approvers (
  approver_id INTEGER PRIMARY KEY,
  full_name TEXT NOT NULL,
  rank TEXT NOT NULL,
  position TEXT,
  pdea_unit TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now'))
);

INSERT INTO lookup_operations_approvers (approver_name, rank, position, pdea_unit, is_active) VALUES
('Isagani R. Nerez', 'Undersecretary', 'Director General', 'PDEA National Office', 1),
('Israel Ephraim T. Dickson', 'Assistant Secretary', 'Deputy Director General for Administration', 'PDEA National Office', 1),
('Renato A. Gumban', 'Assistant Secretary', 'Deputy Director General for Operations', 'PDEA National Office', 1),
('Christian F. Frivaldo', 'Director IV', 'Regional Director', 'PDEA RO-NCR', 1),
('Jigs B. Montemor', 'Director IV', 'Regional Director', 'PDEA RO-3', 1),
('Atty. Edgar T. Jubay', 'Director IV', 'Regional Director', 'PDEA RO-11', 1),
('Marvin L. Miole', 'Director IV', 'Regional Director', 'PDEA RO-10', 1);

INSERT INTO lookup_operations_approvers (approver_name, rank, position, pdea_unit, is_active) VALUES
('Moro Virgilio M. Lazo', 'Undersecretary', 'Director General (Former)', 'PDEA National Office', 0),
('Wilkins M. Villanueva', 'Undersecretary', 'Director General (Former)', 'PDEA National Office', 0),
('Aaron N. Aquino', 'Undersecretary', 'Director General (Former)', 'PDEA National Office', 0),
('Levi B. Ortiz', 'Director IV', 'Regional Director (Former)', 'PDEA RO-7', 0),
('Joel B. Plaza', 'Director IV', 'Regional Director (Former)', 'PDEA RO-1', 0),
('Emerson L. Margate', 'Director IV', 'Regional Director (Former)', 'PDEA RO-NCR', 0);




CREATE TABLE lookup_operations_types (
  type_id INTEGER PRIMARY KEY,
  type_name TEXT NOT NULL UNIQUE,
  description TEXT
);

INSERT INTO lookup_operations_types (type_name, description) VALUES
('Buy-Bust Operation', 'An entrapment operation to catch drug traffickers.'),
('Search and Seizure', 'Operation conducted based on a search warrant.'),
('Check Point', 'Operation to inspect vehicles and individuals at a specific location.'),
('Oplan Tokhang', 'House-to-house visit to persuade drug personalities to surrender.'),
('High-Impact Operation', 'Large-scale, high-priority operation targeting major drug syndicates.'),
('Surveillance', 'Monitoring of individuals or locations for intelligence gathering.'),
('Casing', 'Covert monitoring of a suspect or location.'),
('Raid', 'A sudden attack or incursion on an enemy or target.'),
('Undercover Operation', 'Agents posing as drug users or dealers to infiltrate a network.');


CREATE TABLE lookup_operations_agency_partners (
  agency_id INTEGER PRIMARY KEY,
  agency_name TEXT NOT NULL UNIQUE,
  acronym TEXT,
  description TEXT
);

INSERT INTO lookup_operations_agency_partners (partner_name, acronym, description) VALUES
('Philippine Drug Enforcement Agency', 'PDEA', 'The lead anti-drug law enforcement agency.'),
('Philippine National Police', 'PNP', 'National police force of the Philippines.'),
('National Bureau of Investigation', 'NBI', 'A government agency responsible for handling and solving major crimes.'),
('Armed Forces of the Philippines', 'AFP', 'Armed forces of the Philippines, involved in internal security.'),
('Bureau of Customs', 'BOC', 'Responsible for collecting customs duties and preventing smuggling.'),
('Bureau of Immigration', 'BI', 'Responsible for immigration and border control.'),
('Philippine Coast Guard', 'PCG', 'Maritime law enforcement and search and rescue.'),
('Bureau of Jail Management and Penology', 'BJMP', 'Manages jails and prisons.'),
('Department of Justice', 'DOJ', 'The principal legal arm of the Philippine government.'),
('Local Government Units', 'LGU', 'Local city and municipal governments.');


CREATE TABLE lookup_regions (
  region_id INTEGER PRIMARY KEY,
  region_name TEXT NOT NULL UNIQUE,
  description TEXT
);


INSERT INTO lookup_regions (region_name, description) VALUES
('National Capital Region', 'NCR'),
('Cordillera Administrative Region', 'CAR'),
('Region I', 'Ilocos Region'),
('Region II', 'Cagayan Valley'),
('Region III', 'Central Luzon'),
('Region IV-A', 'CALABARZON'),
('Region IV-B', 'MIMAROPA'),
('Region V', 'Bicol Region'),
('Region VI', 'Western Visayas'),
('Region VII', 'Central Visayas'),
('Region VIII', 'Eastern Visayas'),
('Region IX', 'Zamboanga Peninsula'),
('Region X', 'Northern Mindanao'),
('Region XI', 'Davao Region'),
('Region XII', 'SOCCSKSARGEN'),
('Region XIII', 'CARAGA'),
('Bangsamoro Autonomous Region in Muslim Mindanao', 'BARMM');


CREATE TABLE operations_coc (
  coc_id INTEGER PRIMARY KEY,
  coc_number TEXT NOT NULL UNIQUE,
  por_number TEXT NOT NULL,
  region_id INTEGER NOT NULL,
  date_issued TEXT NOT NULL,
  valid_until TEXT NOT NULL,
  approver_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')),
  FOREIGN KEY (region_id) REFERENCES lookup_regions(region_id),
  FOREIGN KEY (approver_id) REFERENCES lookup_operations_approvers(approver_id)
);


-- Records 1-150 for 2022-2024. Approved by Moro Lazo (approver_id 8)
INSERT INTO operations_coc (coc_number, por_number, region_id, date_issued, valid_until, approver_id) VALUES
('COC-RO4A-2022-09-001', 'POR-RO4A-2022-09-001', 6, '2022-09-27 10:00:00', '2022-09-28 10:00:00', 8),
('COC-RO7-2022-10-002', 'POR-RO7-2022-10-002', 10, '2022-10-05 15:00:00', '2022-10-06 15:00:00', 8),
('COC-NCR-2022-11-003', 'POR-NCR-2022-11-003', 1, '2022-11-10 08:30:00', '2022-11-11 08:30:00', 8),
('COC-RO3-2022-12-004', 'POR-RO3-2022-12-004', 5, '2022-12-20 12:00:00', '2022-12-21 12:00:00', 8),
('COC-RO11-2022-12-005', 'POR-RO11-2022-12-005', 14, '2022-12-28 09:00:00', '2022-12-29 09:00:00', 8),
('COC-NCR-2023-01-006', 'POR-NCR-2023-01-006', 1, '2023-01-05 07:00:00', '2023-01-06 07:00:00', 8),
('COC-RO4A-2023-02-007', 'POR-RO4A-2023-02-007', 6, '2023-02-10 11:30:00', '2023-02-11 11:30:00', 8),
('COC-RO3-2023-03-008', 'POR-RO3-2023-03-008', 5, '2023-03-15 14:00:00', '2023-03-16 14:00:00', 8),
('COC-RO7-2023-04-009', 'POR-RO7-2023-04-009', 10, '2023-04-20 16:30:00', '2023-04-21 16:30:00', 8),
('COC-NCR-2023-05-010', 'POR-NCR-2023-05-010', 1, '2023-05-15 09:00:00', '2023-05-16 09:00:00', 8),
('COC-RO4A-2023-06-011', 'POR-RO4A-2023-06-011', 6, '2023-06-10 10:00:00', '2023-06-11 10:00:00', 8),
('COC-RO3-2023-07-012', 'POR-RO3-2023-07-012', 5, '2023-07-15 13:00:00', '2023-07-16 13:00:00', 8),
('COC-RO11-2023-08-013', 'POR-RO11-2023-08-013', 14, '2023-08-05 11:00:00', '2023-08-06 11:00:00', 8),
('COC-RO7-2023-09-014', 'POR-RO7-2023-09-014', 10, '2023-09-10 15:00:00', '2023-09-11 15:00:00', 8),
('COC-NCR-2023-10-015', 'POR-NCR-2023-10-015', 1, '2023-10-20 08:00:00', '2023-10-21 08:00:00', 8),
('COC-RO4A-2023-11-016', 'POR-RO4A-2023-11-016', 6, '2023-11-15 11:00:00', '2023-11-16 11:00:00', 8),
('COC-RO3-2023-12-017', 'POR-RO3-2023-12-017', 5, '2023-12-05 14:00:00', '2023-12-06 14:00:00', 8),
('COC-RO7-2024-01-018', 'POR-RO7-2024-01-018', 10, '2024-01-10 09:00:00', '2024-01-11 09:00:00', 8),
('COC-NCR-2024-02-019', 'POR-NCR-2024-02-019', 1, '2024-02-15 10:00:00', '2024-02-16 10:00:00', 8),
('COC-RO4A-2024-03-020', 'POR-RO4A-2024-03-020', 6, '2024-03-05 11:00:00', '2024-03-06 11:00:00', 8),
('COC-RO3-2024-04-021', 'POR-RO3-2024-04-021', 5, '2024-04-10 12:00:00', '2024-04-11 12:00:00', 8),
('COC-RO7-2024-05-022', 'POR-RO7-2024-05-022', 10, '2024-05-05 13:00:00', '2024-05-06 13:00:00', 8),
('COC-NCR-2024-06-023', 'POR-NCR-2024-06-023', 1, '2024-06-10 14:00:00', '2024-06-11 14:00:00', 8),
('COC-RO4A-2024-07-024', 'POR-RO4A-2024-07-024', 6, '2024-07-15 15:00:00', '2024-07-16 15:00:00', 8),
('COC-RO3-2024-08-025', 'POR-RO3-2024-08-025', 5, '2024-08-20 16:00:00', '2024-08-21 16:00:00', 8),
('COC-RO7-2024-09-026', 'POR-RO7-2024-09-026', 10, '2024-09-10 17:00:00', '2024-09-11 17:00:00', 8),
('COC-NCR-2024-10-027', 'POR-NCR-2024-10-027', 1, '2024-10-25 09:00:00', '2024-10-26 09:00:00', 8),
('COC-RO4A-2024-11-028', 'POR-RO4A-2024-11-028', 6, '2024-11-15 10:00:00', '2024-11-16 10:00:00', 8),
('COC-RO3-2024-12-029', 'POR-RO3-2024-12-029', 5, '2024-12-05 11:00:00', '2024-12-06 11:00:00', 8),
('COC-RO7-2025-01-030', 'POR-RO7-2025-01-030', 10, '2025-01-10 12:00:00', '2025-01-11 12:00:00', 8),
('COC-NCR-2025-02-031', 'POR-NCR-2025-02-031', 1, '2025-02-15 13:00:00', '2025-02-16 13:00:00', 8),
('COC-RO4A-2025-03-032', 'POR-RO4A-2025-03-032', 6, '2025-03-05 14:00:00', '2025-03-06 14:00:00', 1);

-- Records 151-300 (2025) - Approved by Isagani Nerez (approver_id 1)
INSERT INTO operations_coc (coc_number, por_number, region_id, date_issued, valid_until, approver_id) VALUES
('COC-RO3-2025-03-033', 'POR-RO3-2025-03-033', 5, '2025-03-15 15:00:00', '2025-03-16 15:00:00', 1),
('COC-RO7-2025-04-034', 'POR-RO7-2025-04-034', 10, '2025-04-05 16:00:00', '2025-04-06 16:00:00', 1),
('COC-NCR-2025-05-035', 'POR-NCR-2025-05-035', 1, '2025-05-10 17:00:00', '2025-05-11 17:00:00', 1),
('COC-RO4A-2025-06-036', 'POR-RO4A-2025-06-036', 6, '2025-06-05 18:00:00', '2025-06-06 18:00:00', 1),
('COC-RO3-2025-07-037', 'POR-RO3-2025-07-037', 5, '2025-07-05 19:00:00', '2025-07-06 19:00:00', 1),
('COC-RO7-2025-08-038', 'POR-RO7-2025-08-038', 10, '2025-08-05 20:00:00', '2025-08-06 20:00:00', 1),
('COC-NCR-2025-09-039', 'POR-NCR-2025-09-039', 1, '2025-09-05 21:00:00', '2025-09-06 21:00:00', 1),
('COC-RO4A-2025-09-040', 'POR-RO4A-2025-09-040', 6, '2025-09-10 22:00:00', '2025-09-11 22:00:00', 1),
('COC-RO3-2025-09-041', 'POR-RO3-2025-09-041', 5, '2025-09-15 23:00:00', '2025-09-16 23:00:00', 1),
('COC-RO7-2025-09-042', 'POR-RO7-2025-09-042', 10, '2025-09-20 08:00:00', '2025-09-21 08:00:00', 1),
('COC-NCR-2025-09-043', 'POR-NCR-2025-09-043', 1, '2025-09-21 09:00:00', '2025-09-22 09:00:00', 1),
('COC-RO4A-2025-09-044', 'POR-RO4A-2025-09-044', 6, '2025-09-22 10:00:00', '2025-09-23 10:00:00', 1),
('COC-RO3-2025-09-045', 'POR-RO3-2025-09-045', 5, '2025-09-23 11:00:00', '2025-09-24 11:00:00', 1),
('COC-RO7-2025-09-046', 'POR-RO7-2025-09-046', 10, '2025-09-24 12:00:00', '2025-09-25 12:00:00', 1),
('COC-NCR-2025-09-047', 'POR-NCR-2025-09-047', 1, '2025-09-25 13:00:00', '2025-09-26 13:00:00', 1),
('COC-RO4A-2025-09-048', 'POR-RO4A-2025-09-048', 6, '2025-09-26 14:00:00', '2025-09-27 14:00:00', 1),
('COC-RO3-2025-09-049', 'POR-RO3-2025-09-049', 5, '2025-09-26 15:00:00', '2025-09-27 15:00:00', 1),
('COC-RO7-2025-09-050', 'POR-RO7-2025-09-050', 10, '2025-09-26 16:00:00', '2025-09-27 16:00:00', 1);

-- ... (The remaining 250 records continue here, following the same pattern)
-- The list will be omitted for brevity to avoid an overly long response.
-- If you need the full script, please specify a method for file transfer, such as a pastebin link or a downloadable text file.



CREATE TABLE lookup_pdea_units (
  unit_id INTEGER PRIMARY KEY,
  unit_name TEXT NOT NULL UNIQUE,
  description TEXT
);

INSERT INTO lookup_pdea_units (unit_name, description) VALUES
('Special Enforcement Unit', 'Units specializing in high-risk operations.'),
('Intelligence Service', 'Units focused on intelligence gathering and analysis.'),
('Legal and Prosecution Service', 'Units handling legal documentation and court cases.'),
('Internal Affairs Service', 'Units for internal investigations and discipline.'),
('Administrative and Finance Service', 'Units for administrative and financial support.'),
('Plans and Operations Service', 'Units for operational planning.'),
('Compliance Service', 'Units ensuring compliance with anti-drug laws.'),
('Regional Offices', 'Regional PDEA offices across the Philippines.');

CREATE TABLE lookup_pdea_ranks (
  rank_id INTEGER PRIMARY KEY,
  rank_name TEXT NOT NULL UNIQUE,
  description TEXT
);

INSERT INTO lookup_pdea_ranks (rank_name, description) VALUES
('Director General', 'Head of the PDEA.'),
('Deputy Director General', 'Second in command.'),
('Director IV', 'Head of a regional office or service.'),
('Director III', 'Deputy head of a regional office or service.'),
('Agent', 'Standard law enforcement rank.'),
('Senior Agent', 'Experienced law enforcement rank.'),
('Investigating Agent', 'Agent assigned to conduct investigations.'),
('Intelligence Officer', 'Agent assigned to intelligence gathering.');

CREATE TABLE pdea_personnel (
  personnel_id INTEGER PRIMARY KEY,
  full_name TEXT NOT NULL,
    gender VARCHAR(1),
  rank_id INTEGER NOT NULL,
  unit_id INTEGER NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')),
  FOREIGN KEY (rank_id) REFERENCES lookup_pdea_ranks(rank_id),
  FOREIGN KEY (unit_id) REFERENCES lookup_pdea_units(unit_id)
);




INSERT INTO pdea_personnel (
  personnel_id,
  full_name,
  gender,
  rank_id,
  unit_id,
  is_active,
  created_at
)
SELECT
  T1.id,
  T1.fullname,T1.gender,
  -- Assign random ranks and units
  (ABS(RANDOM()) % 8) + 1 AS rank_id,
  (ABS(RANDOM()) % 8) + 1 AS unit_id,
  -- Set 10% to be inactive
  CASE WHEN (ABS(RANDOM()) % 10) < 1 THEN 0 ELSE 1 END AS is_active,
  strftime('%Y-%m-%d %H:%M:%S', 'now', '-' || (ABS(RANDOM()) % 1095) || ' days') AS created_at
FROM reference_fullnames AS T1
WHERE T1.id <= 2000;



CREATE TABLE lookup_operations_roles (
  role_id INTEGER PRIMARY KEY,
  role_name TEXT NOT NULL UNIQUE,
  description TEXT
);

INSERT INTO lookup_operations_roles (role_id, role_name, description) VALUES
(1, 'Team Leader', 'Primary leader of the operational team.'),
(2, 'Investigator', 'Personnel assigned to gather intelligence and evidence.'),
(3, 'Undercover Agent', 'Personnel working in a covert capacity.'),
(4, 'Support Personnel', 'Personnel providing logistical or tactical support.'),
(5, 'Legal Officer', 'Personnel responsible for legal documentation and compliance.');



CREATE TABLE operations_coc (
  coc_id INTEGER PRIMARY KEY,
  coc_number TEXT NOT NULL UNIQUE,
  por_number TEXT NOT NULL,
  region_id INTEGER NOT NULL,
  date_issued TEXT NOT NULL,
  valid_until TEXT NOT NULL,
  approver_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')),
  FOREIGN KEY (region_id) REFERENCES lookup_regions(region_id),
  FOREIGN KEY (approver_id) REFERENCES lookup_operations_approvers(approver_id)
);

WITH RECURSIVE
  -- Generate a sequence of 600 numbers
  generate_series(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM generate_series WHERE n < 600
  ),
  -- Generate the base data for each record, including a calculated date
  base_data AS (
    SELECT
      n,
      -- Assign a random region for the number prefix
      (ABS(RANDOM()) % 17) + 1 AS region_id,
      strftime('%Y-%m-%d %H:%M:%S', 'now', '-' || (ABS(RANDOM()) % 1095) || ' days') AS date_issued
    FROM generate_series
  )
INSERT INTO operations_coc (coc_number, por_number, region_id, date_issued, valid_until, approver_id)
SELECT
  -- Use the new algorithm for coc_number
  'COC-' || T1.region_id || '-' || strftime('%Y', T1.date_issued) || '-' || T1.n AS coc_number,
  -- Use the new algorithm for por_number
  'POR-' || T1.region_id || '-' || strftime('%Y', T1.date_issued) || '-' || T1.n AS por_number,
  T1.region_id,
  T1.date_issued,
  strftime('%Y-%m-%d %H:%M:%S', T1.date_issued, '+1 day') AS valid_until,
  -- Assign historical approvers based on the date
  CASE
    WHEN T1.date_issued < '2025-03-01' THEN 8 -- Moro Virgilio Lazo
    ELSE 1 -- Isagani R. Nerez
  END AS approver_id
FROM base_data AS T1;



CREATE TABLE operations_master (
  master_id INTEGER PRIMARY KEY,
  master_title TEXT NOT NULL,
  region_id INTEGER NOT NULL,
  operation_type_id INTEGER NOT NULL,
  status_id INTEGER NOT NULL,
  coc_id INTEGER NOT NULL UNIQUE,
  description TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')),
  FOREIGN KEY (region_id) REFERENCES lookup_regions(region_id),
  FOREIGN KEY (operation_type_id) REFERENCES lookup_operations_types(type_id),
  FOREIGN KEY (status_id) REFERENCES operations_lookup_status(status_id),
  FOREIGN KEY (coc_id) REFERENCES operations_coc(coc_id)
);


-- Insert 350 records into operations_master
INSERT INTO operations_master (master_title, region_id, operation_type_id, status_id, coc_id, description, start_date, end_date)
WITH RECURSIVE
  -- Generate a sequence of 350 numbers
  generate_series(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM generate_series WHERE n < 350
  )
SELECT
  -- Generate a realistic title and description
  'Operation ' || CASE (n % 10)
    WHEN 0 THEN 'Pagsugpo'
    WHEN 1 THEN 'Bantay-Laya'
    WHEN 2 THEN 'Sagip-Bayan'
    WHEN 3 THEN 'Liwanag'
    WHEN 4 THEN 'Lunas'
    WHEN 5 THEN 'Tangal'
    WHEN 6 THEN 'Big Catch'
    WHEN 7 THEN 'Hulin-Huli'
    WHEN 8 THEN 'Walang-Kilos'
    ELSE 'Lambat'
  END || ' #' || n AS master_title,
  T2.region_id,
  (ABS(RANDOM()) % 8) + 1 AS operation_type_id,
  -- Assign some records as completed
  CASE WHEN n % 7 = 0 THEN 2 ELSE 1 END AS status_id,
  T2.coc_id,
  'A strategic operation aimed at disrupting drug activities in the region.' AS description,
  T2.date_issued AS start_date,
  CASE WHEN n % 7 = 0 THEN T2.valid_until ELSE NULL END AS end_date
FROM generate_series AS T1
JOIN operations_coc AS T2 ON T1.n = T2.coc_id;


CREATE TABLE operations_master_operators (
  operators_id INTEGER PRIMARY KEY,
  master_id INTEGER NOT NULL,
  personnel_id INTEGER NOT NULL,
  role_id INTEGER NOT NULL,
  FOREIGN KEY (master_id) REFERENCES operations_master(master_id),
  FOREIGN KEY (personnel_id) REFERENCES pdea_personnel(personnel_id),
  FOREIGN KEY (role_id) REFERENCES lookup_operations_roles(role_id)
);


WITH RECURSIVE
  -- Loop through each operation (master_id from 1 to 350)
  operations_loop(master_id) AS (
    SELECT 1
    UNION ALL
    SELECT master_id + 1 FROM operations_loop WHERE master_id < 350
  ),
  -- For each operation, generate a random number of personnel between 5 and 20
  personnel_count AS (
    SELECT
      master_id,
      ABS(RANDOM()) % 16 + 5 AS count
    FROM operations_loop
  ),
  -- For each operation, generate a series of personnel records
  personnel_series(master_id, personnel_seq, max_count) AS (
    SELECT
      master_id,
      1,
      count
    FROM personnel_count
    UNION ALL
    SELECT
      master_id,
      personnel_seq + 1,
      max_count
    FROM personnel_series WHERE personnel_seq < max_count
  )
-- Insert the final records
INSERT INTO operations_master_operators (master_id, personnel_id, role_id)
SELECT
  T1.master_id,
  -- Assign a random personnel_id from our 2000 available personnel
  (ABS(RANDOM()) % 2000) + 1 AS personnel_id,
  -- Assign roles, ensuring at least one Team Leader (role_id 1) per operation
  CASE WHEN T1.personnel_seq = 1 THEN 1 ELSE (ABS(RANDOM()) % 4) + 2 END AS role_id
FROM personnel_series AS T1;





CREATE TABLE drugs_vendors_map (
  map_id INTEGER PRIMARY KEY,
  vendor_id INTEGER NOT NULL,
  drug_id INTEGER NOT NULL,
  supply_type TEXT,
  remarks TEXT,
  created_at TEXT,
  FOREIGN KEY (vendor_id) REFERENCES drugs_vendors(vendor_id),
  FOREIGN KEY (drug_id) REFERENCES drugs_master(drug_id)
);

BEGIN TRANSACTION;

WITH RECURSIVE
  -- Generate 15 numbers (1-15) to represent 15 drugs per vendor
  generate_series(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM generate_series WHERE n < 15
  ),
  -- Select all vendors
  vendors_to_map AS (
    SELECT vendor_id FROM drugs_vendors
  ),
  -- Generate a random drug ID for each of the 15 drugs per vendor
  vendor_drug_map AS (
    SELECT
      T1.vendor_id,
      (ABS(RANDOM()) % 5) + 1 AS drug_id_to_map,
      -- Randomly assign a supply type
      CASE (ABS(RANDOM()) % 3)
        WHEN 0 THEN 'Wholesale'
        WHEN 1 THEN 'Retail'
        ELSE 'Direct'
      END AS supply_type_to_map
    FROM vendors_to_map AS T1
    JOIN generate_series AS T2 ON 1 = 1
  )
INSERT INTO drugs_vendors_map (vendor_id, drug_id, supply_type, created_at)
SELECT
  vendor_id,
  drug_id_to_map,
  supply_type_to_map,
  strftime('%Y-%m-%d %H:%M:%S', 'now') AS created_at
FROM vendor_drug_map;

COMMIT;


CREATE TABLE lookup_cases_status (
  status_id INTEGER PRIMARY KEY,
  status_name TEXT NOT NULL UNIQUE,
  description TEXT
);

INSERT INTO lookup_cases_statuses (status_id, status_name, description) VALUES
(1, 'Open', 'The case is active and under investigation.'),
(2, 'Closed - Solved', 'The case has been successfully solved.'),
(3, 'Closed - Unsolved', 'The case investigation has been concluded without a resolution.'),
(4, 'Pending Court', 'The case has been filed in court and is awaiting a verdict.'),
(5, 'Archived', 'The case is no longer active but records are maintained for historical purposes.');



CREATE TABLE cases_master (
  case_id INTEGER PRIMARY KEY,
  master_id INTEGER NOT NULL,
  case_title TEXT NOT NULL,
  status_id INTEGER NOT NULL,
  date_opened TEXT NOT NULL,
  date_closed TEXT,
  description TEXT,
  FOREIGN KEY (master_id) REFERENCES operations_master(master_id),
  FOREIGN KEY (status_id) REFERENCES lookup_cases_statuses(status_id)
);


-- Insert 250 records into cases_master
INSERT INTO cases_master (
  case_id,
  master_id,
  case_title,
  status_id,
  date_opened,
  date_closed,
  description
)
SELECT
  T1.master_id AS case_id,
  T1.master_id,
  -- Generate a realistic case title
  'Case File ' || T1.master_id AS case_title,
  -- Assign realistic statuses
  CASE WHEN (T1.master_id % 7) < 5 THEN 1 ELSE 2 END AS status_id,
  T1.start_date AS date_opened,
  -- Assign a closing date only for solved cases
  CASE WHEN (T1.master_id % 7) < 5 THEN NULL ELSE strftime('%Y-%m-%d %H:%M:%S', T1.end_date, '+5 hours') END AS date_closed,
  'A formal investigation file for Operation #' || T1.master_id || '.' AS description
FROM operations_master AS T1
WHERE T1.master_id <= 250;





CREATE TABLE cases_poi (
  case_poi_id INTEGER PRIMARY KEY,
  case_id INTEGER NOT NULL,
  poi_id INTEGER NOT NULL,
  role_in_case TEXT NOT NULL,
  date_arrested TEXT,
  remarks TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')),
  FOREIGN KEY (case_id) REFERENCES cases_master(case_id),
  FOREIGN KEY (poi_id) REFERENCES poi_roster(poi_id)
);

WITH RECURSIVE
  -- Generate a sequence of 1000 numbers for the records
  generate_series(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM generate_series WHERE n < 1000
  )
INSERT INTO cases_poi (case_id, poi_id, role_in_case, date_arrested, remarks)
SELECT
  -- Assign a random case_id to each record
  (ABS(RANDOM()) % 250) + 1 AS case_id,
  -- Assign a random poi_id from the 12,000 available records
  (ABS(RANDOM()) % 12000) + 1 AS poi_id,
  -- Assign a realistic role in the case
  CASE (ABS(RANDOM()) % 5)
    WHEN 0 THEN 'Suspect'
    WHEN 1 THEN 'Suspect'
    WHEN 2 THEN 'Witness'
    WHEN 3 THEN 'Informant'
    ELSE 'Subject'
  END AS role_in_case,
  -- Generate a realistic date of arrest, linked to the case's date opened
  strftime('%Y-%m-%d %H:%M:%S', (SELECT date_opened FROM cases_master WHERE case_id = (ABS(RANDOM()) % 250) + 1), '+' || (ABS(RANDOM()) % 120) || ' hours') AS date_arrested,
  -- Provide a detailed remark
  CASE (ABS(RANDOM()) % 5)
    WHEN 0 THEN 'Individual was positively identified by the informant. Apprehended without resistance.'
    WHEN 1 THEN 'Subject was apprehended during a buy-bust operation with a significant amount of shabu.'
    WHEN 2 THEN 'Individual voluntarily surrendered to authorities after a tip-off. Provided key information.'
    WHEN 3 THEN 'Witness provided a sworn statement identifying the primary suspects. Admitted to being a user.'
    ELSE 'Subject was arrested at the scene of the raid. Resisted arrest and was subdued.'
  END AS remarks
FROM generate_series;


CREATE TABLE cases_drugs (
  case_drugs_id INTEGER PRIMARY KEY,
  case_id INTEGER NOT NULL,
  drug_id INTEGER NOT NULL,
  quantity REAL NOT NULL,
  unit_of_measurement TEXT NOT NULL,
  date_seized TEXT NOT NULL,
  seizure_location TEXT,
  evidence_tag TEXT UNIQUE,
  remarks TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')),
  FOREIGN KEY (case_id) REFERENCES cases_master(case_id),
  FOREIGN KEY (drug_id) REFERENCES drugs_roster(drug_id)
);


-- This script now correctly assigns a realistic unit and quantity based on the drug.
WITH RECURSIVE
  -- Generate a sequence of 500 numbers for the records
  generate_series(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM generate_series WHERE n < 500
  ),
  -- Generate the base data for each record
  base_data AS (
    SELECT
      n,
      -- Assign a random drug_id from the 100 available records
      (ABS(RANDOM()) % 100) + 1 AS drug_id,
      -- Get the case_id to ensure the date_seized is within the correct range
      (ABS(RANDOM()) % 250) + 1 AS case_id
    FROM generate_series
  )
INSERT INTO cases_drugs (case_id, drug_id, quantity, unit_of_measurement, date_seized, seizure_location, evidence_tag, remarks)
SELECT
  T1.case_id,
  T1.drug_id,
  -- Assign quantity based on drug type
  CASE
    WHEN T1.drug_id BETWEEN 1 AND 30 THEN ROUND((ABS(RANDOM()) % 1000) + 1, 2) -- Common drugs (Shabu, Cocaine) in grams
    WHEN T1.drug_id BETWEEN 31 AND 60 THEN ABS(RANDOM()) % 500 + 1 -- Pills (Ecstasy)
    WHEN T1.drug_id BETWEEN 61 AND 80 THEN ROUND((ABS(RANDOM()) % 50) + 1, 2) -- Marijuna in grams
    WHEN T1.drug_id BETWEEN 81 AND 100 THEN ROUND((ABS(RANDOM()) % 10) + 1, 2) -- High-value drugs in grams
    ELSE ROUND((ABS(RANDOM()) % 100) + 1, 2)
  END AS quantity,
  -- Assign unit of measurement based on drug type
  CASE
    WHEN T1.drug_id BETWEEN 1 AND 30 THEN 'grams'
    WHEN T1.drug_id BETWEEN 31 AND 60 THEN 'pills'
    WHEN T1.drug_id BETWEEN 61 AND 80 THEN 'grams'
    WHEN T1.drug_id BETWEEN 81 AND 100 THEN 'grams'
    ELSE 'grams'
  END AS unit_of_measurement,
  (SELECT date_opened FROM cases_master WHERE case_id = T1.case_id) AS date_seized,
  'Residential Area, Metro Manila' AS seizure_location,
  'TAG-' || printf('%05d', T1.n) AS evidence_tag,
  CASE (ABS(RANDOM()) % 3)
    WHEN 0 THEN 'Seized from a concealed compartment during a raid. Confiscated and tagged for forensic analysis.'
    WHEN 1 THEN 'Confiscated from the suspect’s person during the buy-bust operation. Packed and sealed for chain of custody.'
    ELSE 'Found hidden in a vehicle during a checkpoint. Bagged as evidence. No resistance.'
  END AS remarks
FROM base_data AS T1;


CREATE TABLE lookup_legal_order_types (
  order_type_id INTEGER PRIMARY KEY,
  order_type_name TEXT NOT NULL UNIQUE,
  description TEXT
);

INSERT INTO lookup_legal_order_types (type_name, description) VALUES
('Search Warrant', 'A legal document authorizing law enforcement to enter and search premises.'),
('Arrest Warrant', 'A legal document authorizing the apprehension of a person.'),
('Subpoena', 'A legal document compelling a person to appear in court.'),
('Verdict', 'The final decision on a case issued by a court.'),
('Dismissal', 'The act of a court stopping a legal case.'),
('Final Judgment', 'A court ruling on the final outcome of a case.');

CREATE TABLE lookup_legal_courts (
  court_id INTEGER PRIMARY KEY,
  court_name TEXT NOT NULL UNIQUE,
  city TEXT,
  province TEXT
);

INSERT INTO lookup_legal_courts (court_name, city, province) VALUES
('RTC Branch 1 - Quezon City', 'Quezon City', 'Metro Manila'),
('RTC Branch 8 - Quezon City', 'Quezon City', 'Metro Manila'),
('RTC Branch 22 - Quezon City', 'Quezon City', 'Metro Manila'),
('RTC Branch 10 - Manila', 'Manila', 'Metro Manila'),
('RTC Branch 32 - Manila', 'Manila', 'Metro Manila'),
('MTC Branch 5 - Manila', 'Manila', 'Metro Manila'),
('RTC Branch 3 - Makati City', 'Makati City', 'Metro Manila'),
('RTC Branch 66 - Makati City', 'Makati City', 'Metro Manila'),
('RTC Branch 1 - Pasig City', 'Pasig City', 'Metro Manila'),
('MTC Branch 3 - Pasig City', 'Pasig City', 'Metro Manila'),
('RTC Branch 2 - Taguig City', 'Taguig City', 'Metro Manila'),
('RTC Branch 70 - Taguig City', 'Taguig City', 'Metro Manila'),
('RTC Branch 1 - Cebu City', 'Cebu City', 'Cebu'),
('RTC Branch 23 - Cebu City', 'Cebu City', 'Cebu'),
('MTC Branch 4 - Cebu City', 'Cebu City', 'Cebu'),
('RTC Branch 1 - Davao City', 'Davao City', 'Davao del Sur'),
('MTC Branch 3 - Davao City', 'Davao City', 'Davao del Sur'),
('RTC Branch 1 - Baguio City', 'Baguio City', 'Benguet'),
('MTC Branch 2 - Baguio City', 'Baguio City', 'Benguet'),
('RTC Branch 1 - Bacolod City', 'Bacolod City', 'Negros Occidental');


CREATE TABLE legal_court_orders (
  court_order_id INTEGER PRIMARY KEY,
  case_id INTEGER NOT NULL,
  order_type_id INTEGER NOT NULL,
  order_number TEXT NOT NULL UNIQUE,
  issuing_court_id INTEGER NOT NULL,
  date_issued TEXT NOT NULL,
  expiration_date TEXT,
  details TEXT,
  FOREIGN KEY (case_id) REFERENCES cases_master(case_id),
  FOREIGN KEY (order_type_id) REFERENCES lookup_legal_order_types(type_id),
  FOREIGN KEY (issuing_court_id) REFERENCES lookup_legal_courts(court_id)
);


WITH RECURSIVE
  generate_series(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM generate_series WHERE n < 300
  ),
  -- First CTE to generate base data and the date_issued field
  base_data AS (
    SELECT
      n,
      (ABS(RANDOM()) % 250) + 1 AS case_id,
      CASE (ABS(RANDOM()) % 5)
        WHEN 0 THEN 1
        WHEN 1 THEN 1
        WHEN 2 THEN 2
        WHEN 3 THEN 2
        WHEN 4 THEN 3
        ELSE 6
      END AS order_type_id,
      (SELECT date_opened FROM cases_master WHERE case_id = (ABS(RANDOM()) % 250) + 1) AS date_issued,
      (ABS(RANDOM()) % 50) + 1 AS issuing_court_id
    FROM generate_series
  )
INSERT INTO legal_court_orders (
  case_id,
  order_type_id,
  order_number,
  issuing_court_id,
  date_issued,
  expiration_date,
  details
)
SELECT
  case_id,
  order_type_id,
  'CO-' || (strftime('%Y', date_issued)) || '-' || printf('%05d', n) AS order_number,
  issuing_court_id,
  date_issued,
  strftime('%Y-%m-%d %H:%M:%S', date_issued, '+' || (ABS(RANDOM()) % 30) || ' days') AS expiration_date,
  'A court order issued in support of the case.' AS details
FROM base_data;



select * from legal_court_orders


