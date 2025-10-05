#!/usr/bin/env bash
set -euo pipefail

# =================================================================
# MONKEY.sh (v4.0 - Refactored for Fixtures & Configs)
# =================================================================
# This script scaffolds a new solution by:
# 1. Recursively copying a 'FIXTURES' directory.
# 2. Copying a specific 'CONFIGS' file.
# =================================================================

# --- Style & Color ---
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

# --- Directory & File Configuration ---
TEMPLATE_ROOT_DIR="../../_TEMPLATES"
FIXTURES_DIR="FIXTURES"
CONFIGS_DIR="CONFIGS"
CONFIG_PREFIX="Config_"
CONFIG_TARGET="project_Config.ts"

# =================================================================
# FUNCTIONS
# =================================================================

show_help() {
	echo -e "\n${YELLOW}!!! INSUFFICIENT ARGUMENTS !!!${NC}" >&2
	echo -e "Usage: $0 ${GREEN}<TARGET_NAME>${NC} ${YELLOW}[CONFIG_SOURCE]${NC}" >&2
	echo -e "  ${GREEN}TARGET_NAME:${NC}   Folder name for the new solution (e.g., KURAP)" >&2
	echo -e "  ${YELLOW}CONFIG_SOURCE:${NC} (Optional) Config source (defaults to TARGET_NAME)" >&2
}

setup_environment() {
	echo -e "\n${CYAN}>>> Setting up environment...${NC}"
	if [ "$#" -lt 1 ]; then
		show_help
		exit 1
	fi

	export TARGET_NAME="$1"
	export CONFIG_ARG="${2:-$1}"

	export CURRENT_DIR=$(pwd)
	export TEMPLATE_ROOT="${TEMPLATE_ROOT_DIR}"
	export DST="${CURRENT_DIR}/${TARGET_NAME}"

	echo -e "  - ${GREEN}Target Name:${NC}   ${TARGET_NAME}"
	echo -e "  - ${GREEN}Config Source:${NC} ${CONFIG_ARG}"
}

confirm_overwrite() {
	echo -e "${YELLOW}Directory '${TARGET_NAME}' already exists.${NC}"
	echo -e "Choose an option:"
	echo -e "  ${GREEN}[O]verwrite${NC} -> Delete the old folder and create a new one"
	echo -e "  ${CYAN}[S]kip${NC}      -> Keep existing folder intact"
	echo -e "  ${RED}[C]ancel${NC}    -> Abort the script"

	while true; do
		read -rp "Your choice (O/S/C): " choice
		case "${choice,,}" in
		o)
			echo -e "  - ${YELLOW}Deleting existing folder...${NC}"
			rm -rf "$DST"
			echo -e "  - ${GREEN}Old folder deleted.${NC}"
			break
			;;
		s)
			echo -e "  - ${CYAN}Skipping skeleton creation. Existing folder left intact.${NC}"
			return 1
			;;
		c)
			echo -e "  - ${RED}Operation cancelled.${NC}"
			exit 0
			;;
		*)
			echo -e "${YELLOW}Invalid choice. Please enter O, S, or C.${NC}"
			;;
		esac
	done
	return 0
}

build_skeleton() {
	echo -e "\n${CYAN}>>> Building skeleton...${NC}"

	if [ -d "$DST" ]; then
		confirm_overwrite || return
	fi

	echo -e "  - ${CYAN}Creating new folder...${NC}"
	mkdir -p "$DST"
	echo -e "  - ${GREEN}Folder created: ${DST}${NC}"

	# 1. Copy all contents from the FIXTURES directory
	local fixtures_source_dir="${TEMPLATE_ROOT}/${FIXTURES_DIR}/"
	if [ -d "$fixtures_source_dir" ]; then
		echo -e "  - Copying all files and folders from ${CYAN}${FIXTURES_DIR}${NC}..."
		cp -r "${fixtures_source_dir}." "$DST/"
		echo -e "    -> Copied fixtures."
	else
		echo -e "  - ${YELLOW}Warning: Fixtures directory not found, skipping:${NC} ${fixtures_source_dir}"
	fi

	# 2. Copy the specific config file from the CONFIGS directory
	local source_config_file="${TEMPLATE_ROOT}/${CONFIGS_DIR}/${CONFIG_PREFIX}${CONFIG_ARG}.ts"
	if [ ! -f "$source_config_file" ]; then
		echo -e "\n${RED}ERROR: Config file not found:${NC} ${source_config_file}" >&2
		rm -rf "$DST"
		exit 1
	fi
	cp "$source_config_file" "$DST/$CONFIG_TARGET"
	echo -e "  - Copied config: ${CYAN}${CONFIGS_DIR}/${CONFIG_PREFIX}${CONFIG_ARG}.ts${NC} -> ${GREEN}${CONFIG_TARGET}${NC}"

	echo -e "  ${GREEN}✔ Skeleton construction complete.${NC}"
}

main() {
	clear
	setup_environment "$@"
	build_skeleton
	echo -e "\n${GREEN}>>> MONKEY's work is done!${NC}"
	echo -e "${CYAN}Changing directory to target folder: ${DST}${NC}"
	cd "$DST" || exit 1
	echo -e "${GREEN}✔ Now inside target folder: $(pwd)${NC}"
}

# =================================================================
# EXECUTION
# =================================================================
main "$@"