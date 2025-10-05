##!/bin/bash
#
## ==============================================================================
## PDEA Application Scaffolding Script
## ==============================================================================
## This script creates the directory structure for the PDEA application,
## following the MODULES > MODULES hierarchy relative to its location.
## It also creates a placeholder +page.svelte file in each SUB directory
## to initialize the SvelteKit routes.
##
## USAGE:
## 1. Place this script inside the target APP folder (e.g., src/routes/GOVT/APPS/PDEA/).
## 2. Navigate to that directory in your terminal.
## 3. Make it executable: chmod +x create_pdea_structure.sh
## 4. Run it from within the APP folder: ./create_pdea_structure.sh
## ==============================================================================
#
## --- CONFIGURATION ---
## No base path is needed; all paths are now relative to the current directory.
#
#echo "🚀 Starting to build the application structure in the current directory..."
#echo "-----------------------------------------------------------------------"
#
## --- MODULE: INTELLIGENCE_AND_INVESTIGATION_PNP ---
#echo "Creating Module: INTELLIGENCE_AND_INVESTIGATION_PNP"
#MODULE_PATH="MODULES/INTELLIGENCE_AND_INVESTIGATION_PNP/MODULES"
#mkdir -p "$MODULE_PATH"
## Create placeholder pages for the module and its sub-modules
#touch "MODULES/INTELLIGENCE_AND_INVESTIGATION_PNP/+page.svelte"
#mkdir -p "$MODULE_PATH/INFORMATION_COLLECTION" && touch "$MODULE_PATH/INFORMATION_COLLECTION/+page.svelte"
#mkdir -p "$MODULE_PATH/TARGET_VALIDATION" && touch "$MODULE_PATH/TARGET_VALIDATION/+page.svelte"
#mkdir -p "$MODULE_PATH/CASE_BUILDUP" && touch "$MODULE_PATH/CASE_BUILDUP/+page.svelte"
#
## --- MODULE: OPERATIONS ---
#echo "Creating Module: OPERATIONS"
#MODULE_PATH="MODULES/OPERATIONS/MODULES"
#mkdir -p "$MODULE_PATH"
#touch "MODULES/OPERATIONS/+page.svelte"
#mkdir -p "$MODULE_PATH/PLANNING" && touch "$MODULE_PATH/PLANNING/+page.svelte"
#mkdir -p "$MODULE_PATH/EXECUTION" && touch "$MODULE_PATH/EXECUTION/+page.svelte"
#mkdir -p "$MODULE_PATH/POST_OPERATION_REPORTING" && touch "$MODULE_PATH/POST_OPERATION_REPORTING/+page.svelte"
#
## --- MODULE: FORENSICS_AND_LABORATORY ---
#echo "Creating Module: FORENSICS_AND_LABORATORY"
#MODULE_PATH="MODULES/FORENSICS_AND_LABORATORY/MODULES"
#mkdir -p "$MODULE_PATH"
#touch "MODULES/FORENSICS_AND_LABORATORY/+page.svelte"
#mkdir -p "$MODULE_PATH/EVIDENCE_RECEIVING" && touch "$MODULE_PATH/EVIDENCE_RECEIVING/+page.svelte"
#mkdir -p "$MODULE_PATH/DRUG_TESTING" && touch "$MODULE_PATH/DRUG_TESTING/+page.svelte"
#mkdir -p "$MODULE_PATH/LABORATORY_REPORTS" && touch "$MODULE_PATH/LABORATORY_REPORTS/+page.svelte"
#
## --- MODULE: LEGAL_AND_PROSECUTION ---
#echo "Creating Module: LEGAL_AND_PROSECUTION"
#MODULE_PATH="MODULES/LEGAL_AND_PROSECUTION/MODULES"
#mkdir -p "$MODULE_PATH"
#touch "MODULES/LEGAL_AND_PROSECUTION/+page.svelte"
#mkdir -p "$MODULE_PATH/CASE_FILING" && touch "$MODULE_PATH/CASE_FILING/+page.svelte"
#mkdir -p "$MODULE_PATH/LITIGATION_SUPPORT" && touch "$MODULE_PATH/LITIGATION_SUPPORT/+page.svelte"
#mkdir -p "$MODULE_PATH/RECORDS_MANAGEMENT" && touch "$MODULE_PATH/RECORDS_MANAGEMENT/+page.svelte"
#
## --- MODULE: PREVENTIVE_EDUCATION ---
#echo "Creating Module: PREVENTIVE_EDUCATION"
#MODULE_PATH="MODULES/PREVENTIVE_EDUCATION/MODULES"
#mkdir -p "$MODULE_PATH"
#touch "MODULES/PREVENTIVE_EDUCATION/+page.svelte"
#mkdir -p "$MODULE_PATH/SEMINAR_MANAGEMENT" && touch "$MODULE_PATH/SEMINAR_MANAGEMENT/+page.svelte"
#mkdir -p "$MODULE_PATH/COMMUNITY_OUTREACH" && touch "$MODULE_PATH/COMMUNITY_OUTREACH/+page.svelte"
#mkdir -p "$MODULE_PATH/MATERIALS_DISTRIBUTION" && touch "$MODULE_PATH/MATERIALS_DISTRIBUTION/+page.svelte"
#
## --- MODULE: ADMINISTRATION ---
#echo "Creating Module: ADMINISTRATION"
#MODULE_PATH="MODULES/ADMINISTRATION/MODULES"
#mkdir -p "$MODULE_PATH"
#touch "MODULES/ADMINISTRATION/+page.svelte"
#mkdir -p "$MODULE_PATH/PERSONNEL_MANAGEMENT" && touch "$MODULE_PATH/PERSONNEL_MANAGEMENT/+page.svelte"
#mkdir -p "$MODULE_PATH/LOGISTICS_AND_SUPPLY" && touch "$MODULE_PATH/LOGISTICS_AND_SUPPLY/+page.svelte"
#mkdir -p "$MODULE_PATH/FINANCE_AND_BUDGET" && touch "$MODULE_PATH/FINANCE_AND_BUDGET/+page.svelte"
#
#echo "-----------------------------------------------------------------------"
#echo "✅ Application structure created successfully!"
#echo "You can now start building components inside the new folders."
#




#!/bin/bash

# ==============================================================================
# Fractal SvelteKit Application Scaffolding Script
# ==============================================================================
# This script creates a fractal directory structure for a SvelteKit application,
# following the nested MODULES pattern shown in your screenshot.
#
# Structure Generated:
# ./
# ├── project_Config.ts
# └── MODULES/
#     └── [ModuleName]/
#         ├── +page.svelte
#         ├── project_Config.ts
#         └── MODULES/
#             └── [SubModuleName]/
#                 └── +page.svelte
#
# USAGE:
# 1. Place this script inside the target APP folder (e.g., src/routes/GOVT/APPS/PDEA/).
# 2. Make it executable: chmod +x create_fractal_structure.sh
# 3. Run it from within the APP folder: ./create_fractal_structure.sh
# ==============================================================================

# --- Helper Function to create the module structure ---
# Arguments:
# 1: Parent Path (e.g., "MODULES")
# 2: Module Name (e.g., "ADMINISTRATION")
# 3+: List of Sub-Module Names (e.g., "PERSONNEL_MANAGEMENT" "LOGISTICS_AND_SUPPLY")
create_module() {
    local parent_path=$1
    local module_name=$2
    shift 2 # Process arguments after the lookups two
    local sub_modules=("$@")

    local module_path="$parent_path/$module_name"

    echo "  Creating Module: $module_name at $module_path"
    mkdir -p "$module_path"
    touch "$module_path/+page.svelte"

    # Check if there are any sub-modules to process
    if [ ${#sub_modules[@]} -gt 0 ]; then
        echo "    - Found sub-modules, creating nested 'MODULES' directory."
        local nested_modules_path="$module_path/MODULES"
        mkdir -p "$nested_modules_path"

        # Create project_Config.ts for the parent module, listing its sub-modules
        local config_content="export const MODULES = [\n"
        for sub_module in "${sub_modules[@]}"; do
            config_content+="  { name: '$sub_module', path: './MODULES/$sub_module' },\n"
        done
        config_content+="];"
        echo -e "$config_content" > "$module_path/config.ts"
        echo "    - Created config.ts in $module_path"

        # Create the sub-module directories and their pages
        for sub_module in "${sub_modules[@]}"; do
            echo "    Creating Sub-Module: $sub_module"
            local sub_module_path="$nested_modules_path/$sub_module"
            mkdir -p "$sub_module_path"
            touch "$sub_module_path/+page.svelte"
        done
    else
        # Create an empty project_Config.ts if there are no sub-modules
        echo "export const MODULES = [];" > "$module_path/config.ts"
        echo "    - No sub-modules found; created empty config.ts in $module_path"
    fi
}

# --- Main Execution ---

echo "🚀 Starting to build the fractal application structure..."
echo "-----------------------------------------------------------------------"

# Define the top-level modules. These will be used to generate the root project_Config.
TOP_LEVEL_MODULES=(
    "INTELLIGENCE_AND_INVESTIGATION"
    "OPERATIONS"
    "FORENSICS_AND_LABORATORY"
    "LEGAL_AND_PROSECUTION"
    "PREVENTIVE_EDUCATION"
    "ADMINISTRATION"
)

# Create the root 'MODULES' directory
mkdir -p "MODULES"

# Create the root project_Config.ts file in the current directory
echo "Creating root config.ts..."
ROOT_CONFIG_CONTENT="export const MODULES = [\n"
for module in "${TOP_LEVEL_MODULES[@]}"; do
    ROOT_CONFIG_CONTENT+="  { name: '$module', path: './MODULES/$module' },\n"
done
ROOT_CONFIG_CONTENT+="];"
echo -e "$ROOT_CONFIG_CONTENT" > "config.ts"

# --- Create Modules and their respective Sub-Modules ---

echo "Processing all modules and sub-modules..."

create_module "MODULES" "INTELLIGENCE_AND_INVESTIGATION" \
    "INFORMATION_COLLECTION" "TARGET_VALIDATION" "CASE_BUILDUP"

create_module "MODULES" "OPERATIONS" \
    "PLANNING" "EXECUTION" "POST_OPERATION_REPORTING"

create_module "MODULES" "FORENSICS_AND_LABORATORY" \
    "EVIDENCE_RECEIVING" "DRUG_TESTING" "LABORATORY_REPORTS"

create_module "MODULES" "LEGAL_AND_PROSECUTION" \
    "CASE_FILING" "LITIGATION_SUPPORT" "RECORDS_MANAGEMENT"

create_module "MODULES" "PREVENTIVE_EDUCATION" \
    "SEMINAR_MANAGEMENT" "COMMUNITY_OUTREACH" "MATERIALS_DISTRIBUTION"

create_module "MODULES" "ADMINISTRATION" \
    "PERSONNEL_MANAGEMENT" "LOGISTICS_AND_SUPPLY" "FINANCE_AND_BUDGET"

echo "-----------------------------------------------------------------------"
echo "✅ Fractal application structure created successfully!"
echo "You can now start building your SvelteKit application."
