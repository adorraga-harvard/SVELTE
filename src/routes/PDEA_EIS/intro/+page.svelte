<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDEA Executive Information System Database Documentation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 2em;
            color: #333;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 900px;
            margin: auto;
            background: #fff;
            padding: 2em;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1, h2, h3 {
            color: #2c3e50;
        }
        h1 {
            border-bottom: 2px solid #3498db;
            padding-bottom: 0.5em;
        }
        h2 {
            margin-top: 1.5em;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        ul li {
            background: #ecf0f1;
            margin-bottom: 0.5em;
            padding: 0.75em;
            border-left: 5px solid #3498db;
        }
        strong {
            color: #2980b9;
        }
        pre {
            background: #2c3e50;
            color: #fff;
            padding: 1em;
            border-radius: 5px;
            overflow-x: auto;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>PDEA Executive Information System Database Documentation</h1>

    <p>This document provides a comprehensive overview of the database schema for the PDEA Executive Information System. It is designed to be easily understood by stakeholders and developers.</p>

    <h2>I. Overview & Schema Design Philosophy</h2>
    <p>The database employs a <strong>normalized schema design</strong>, prioritizing data integrity, consistency, and reduced redundancy. The structure is built on a clear hierarchy:</p>
    <ul>
        <li><strong>Lookup Tables:</strong> The foundation, providing static, controlled data options (e.g., lists of ranks, regions, or drug types). These tables are prefixed with <code>lookup_</code>.</li>
        <li><strong>Main Data Tables:</strong> The core of the database, containing primary operational data (e.g., personnel records, case details).</li>
        <li><strong>Bridge Tables:</strong> These tables resolve many-to-many relationships between main data tables, allowing for flexible and detailed connections without data duplication.</li>
    </ul>
    <p>This layered approach ensures that the system is scalable and easy to maintain.</p>

    <h2>II. Table Descriptions</h2>

    <h3>A. Lookup Tables</h3>
    <p>These tables serve as reference data for the rest of the database.</p>
    <ul>
        <li><strong><code>lookup_barrios</code>:</strong> Geographical data for barrios, cities, provinces, and regions.</li>
        <li><strong><code>lookup_biometric_types</code>:</strong> Lists different types of biometric data (e.g., fingerprint, facial recognition).</li>
        <li><strong><code>lookup_cases_status</code>:</strong> Defines the lifecycle and status of a case (e.g., "Active," "Closed," "On Hold").</li>
        <li><strong><code>lookup_drugs_schedule</code>:</strong> Classification of drugs based on their legal schedule.</li>
        <li><strong><code>lookup_drugs_type</code>:</strong> Categorizes drugs (e.g., "Methamphetamine," "Marijuana," "Cocaine").</li>
        <li><strong><code>lookup_drugs_vendor_category</code>:</strong> Classifies drug vendors (e.g., "Pusher," "Importer," "Manufacturer").</li>
        <li><strong><code>lookup_drugs_vendor_status</code>:</strong> Defines the status of a drug vendor (e.g., "Active," "Monitored," "Deceased").</li>
        <li><strong><code>lookup_drugs_vendor_type</code>:</strong> Differentiates vendor types.</li>
        <li><strong><code>lookup_fullnames</code>:</strong> A lookup for common full names and genders, potentially for data standardization.</li>
        <li><strong><code>lookup_legal_courts</code>:</strong> A list of legal courts across the Philippines.</li>
        <li><strong><code>lookup_legal_order_types</code>:</strong> Defines types of court orders (e.g., "Search Warrant," "Arrest Warrant").</li>
        <li><strong><code>lookup_operations_agency_partners</code>:</strong> Lists partner law enforcement agencies (e.g., "PNP," "NBI," "Bureau of Customs").</li>
        <li><strong><code>lookup_operations_approvers</code>:</strong> Authorized PDEA personnel who can approve operations.</li>
        <li><strong><code>lookup_operations_roles</code>:</strong> Defines the roles personnel play in an operation (e.g., "Team Leader," "Intelligence Officer," "Field Agent").</li>
        <li><strong><code>lookup_operations_types</code>:</strong> Classifies types of operations (e.g., "Buy-Bust," "Warrant Service," "Surveillance").</li>
        <li><strong><code>lookup_pdea_ranks</code>:</strong> Official PDEA ranks.</li>
        <li><strong><code>lookup_pdea_units</code>:</strong> The different units or departments within PDEA.</li>
        <li><strong><code>lookup_regions</code>:</strong> Geographical regions of the Philippines.</li>
        <li><strong><code>lookup_syndicate_roles</code>:</strong> Defines roles within a criminal syndicate (e.g., "Leader," "Financier," "Transporter").</li>
    </ul>

    <h3>B. Main Data Tables</h3>
    <p>These tables store the primary records of the system.</p>
    <ul>
        <li><strong><code>drugs_roster</code>:</strong> The main catalog of drugs, with details like schedule and type.</li>
        <li><strong><code>drugs_vendors</code>:</strong> Contains information on individuals or entities identified as drug vendors.</li>
        <li><strong><code>cases_master</code>:</strong> The central table for all case-related information.</li>
        <li><strong><code>legal_court_orders</code>:</strong> Records all legal court orders relevant to cases.</li>
        <li><strong><code>operations_coc</code>:</strong> A sub-table for Chain of Custody (CoC) documents and details.</li>
        <li><strong><code>operations_master</code>:</strong> The main table for all PDEA operations.</li>
        <li><strong><code>pdea_personnel</code>:</strong> A comprehensive roster of PDEA personnel.</li>
        <li><strong><code>poi_roster</code>:</strong> The central table for <strong>Persons of Interest</strong> (POIs), consolidating key information.</li>
        <li><strong><code>poi_biometrics</code>:</strong> Stores biometric data for POIs.</li>
        <li><strong><code>poi_contacts</code>:</strong> Stores contact information for POIs.</li>
        <li><strong><code>poi_syndicates</code>:</strong> A list of known criminal syndicates.</li>
    </ul>

    <h2>III. Relationships & Data Flow</h2>
    <p>Relationships between tables are established through <strong>foreign keys</strong>, which link a record in one table to a record in another. This section outlines the most critical relationships, highlighting how the data flows within the system.</p>

    <h3>A. Core Relationships</h3>
    <ul>
        <li><strong><code>cases_master</code>:</strong> is the central hub for case information, linking to <code>operations_master</code> (which operation a case belongs to) and <code>lookup_cases_status</code>.</li>
        <li><strong><code>poi_roster</code>:</strong> is the main entry point for all information related to a Person of Interest. It is a parent table to <code>poi_biometrics</code> and <code>poi_contacts</code>, creating a one-to-many relationship where a single POI can have multiple biometric records or contact details.</li>
        <li><strong><code>operations_master</code>:</strong> is the main table for all operations. It references <code>lookup_operations_types</code> and <code>lookup_regions</code>. The <code>operations_master</code> table also connects to <code>operations_coc</code> for chain of custody details.</li>
    </ul>

    <h3>B. Many-to-Many Relationships (Bridge Tables)</h3>
    <p>Bridge tables are crucial for modeling complex real-world connections.</p>
    <ul>
        <li><strong>Case-to-Drug:</strong> The <code>cases_drugs</code> bridge table connects <code>cases_master</code> and <code>drugs_roster</code>. A single case can involve multiple drugs, and a single drug can be part of many cases.</li>
        <li><strong>Case-to-POI:</strong> The <code>cases_poi</code> bridge table links <code>cases_master</code> and <code>poi_roster</code>. This table defines which POIs are involved in a specific case and their role at the time of their arrest.</li>
        <li><strong>Operation-to-Personnel:</strong> The <code>operations_master_operators</code> bridge table connects <code>operations_master</code> to <code>pdea_personnel</code>. It specifies which personnel were part of an operation and their specific role, referencing <code>lookup_operations_roles</code>.</li>
        <li><strong>POI-to-Syndicate:</strong> The <code>poi_syndicate_members</code> bridge table links <code>poi_roster</code> and <code>poi_syndicates</code>. It details which POIs belong to which syndicates and their specific role, referencing <code>lookup_syndicate_roles</code>.</li>
    </ul>

</div>

</body>
</html>