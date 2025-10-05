/**
 * Data structures for the AFP Sentinel Intelligence Database Application.
 * This file defines all TypeScript interfaces for components, pages, and API endpoints.
 */

// --- API Response Types ---
// Standard API response for successful requests.
export interface ApiResponse<T> {
    status: number;
    data: T;
    error?: string;
    detail?: string;
}

// --- General Database Data Types ---
// A generic interface for lookup table items.
export interface LookupItem {
    id: string | number;
    name: string;
    description: string;
}

// A generic interface for a single row of a core table.
export interface CoreTableRow {
    [key: string]: any;
}

// The structure of the data passed to the DataTable component.
export interface TableData {
    columns: string[];
    rows: CoreTableRow[];
}

// --- Core Table Data Interfaces ---
// These interfaces define the shape of the data for each core table.
// They are based on your DDLs.

// core_actor
export interface CoreActor extends CoreTableRow {
    actor_id: number;
    actor_name: string;
    nationality: string;
    vulnerability_score: number;
    type_fk: number;
    threat_level_fk: number;
    creator_fk: number;
    created_on: number;
}

// core_asset
export interface CoreAsset extends CoreTableRow {
    asset_id: number;
    asset_name: string;
    description: string;
    location: string;
    asset_type_fk: number;
    region_fk: number;
    created_on: number;
    updated_on: number;
}

// core_plan
export interface CorePlan extends CoreTableRow {
    plan_id: number;
    plan_name: string;
    description: string;
    plan_status_fk: number;
    region_fk: number;
    created_on: number;
    updated_on: number;
    start_date: number;
    end_date: number;
}

// core_incident
export interface CoreIncident extends CoreTableRow {
    incident_id: number;
    title: string;
    summary: string;
    incident_on: number;
    is_verified: number;
    created_on: number;
    creator_fk: number;
    region_fk: number;
    classification_fk: number;
    impact_level_fk: number;
    source_fk: number;
}

// core_product
export interface CoreProduct extends CoreTableRow {
    product_id: number;
    product_name: string;
    description: string;
    class_fk: number;
    creator_fk: number;
    created_on: number;
    updated_on: number;
    publication_date: number;
}