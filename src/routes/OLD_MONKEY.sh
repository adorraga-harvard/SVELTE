#!/usr/bin/env bash
set -euo pipefail

# =================================================================
# MONKEY.sh (v3.3 - Final Version with Explicit Overwrite Choices)
# =================================================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Directory & File Names
TEMPLATE_DIR_NAME="_TEMPLATES"
CONFIG_PREFIX="Config_"
CONFIG_TARGET="project_Config.ts"
STATIC_ONE_DIR="STATIC_ONE"
STATIC_TWO_DIR="STATIC_TWO"
SLUG_DIR="[...slug]"

# =================================================================
# FUNCTIONS
# =================================================================

show_help() {
  echo -e "\n${YELLOW}!!! INSUFFICIENT ARGUMENTS !!!${NC}" >&2
  echo -e "Usage: $0 ${GREEN}<TARGET_NAME>${NC} ${YELLOW}[CONFIG_SOURCE]${NC}" >&2
  echo -e "  ${GREEN}TARGET_NAME:${NC} Folder name for the new solution (e.g., AMADOR)" >&2
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
  export TEMPLATE_ROOT="../../${TEMPLATE_DIR_NAME}"
  export DST="${CURRENT_DIR}/${TARGET_NAME}"

  echo -e "  - ${GREEN}Target Name:${NC} ${TARGET_NAME}"
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

  echo -e "  - Copying project_* resources from STATIC_ONE..."
  cp "$TEMPLATE_ROOT/$STATIC_ONE_DIR/project_"* "$DST/"
  echo -e "    -> Copied static resources."

  echo -e "  - Copying root route files (+layout, +page)..."
  (cp "$TEMPLATE_ROOT/$STATIC_ONE_DIR/+"* "$DST/" 2>/dev/null) || true
  echo -e "    -> Copied root layout and page files."

  local source_config_file="$TEMPLATE_ROOT/$STATIC_ONE_DIR/${CONFIG_PREFIX}${CONFIG_ARG}.ts"
  if [ ! -f "$source_config_file" ]; then
    echo -e "\n${RED}ERROR: Config file not found:${NC} ${source_config_file}" >&2
    rm -rf "$DST"
    exit 1
  fi
  cp "$source_config_file" "$DST/$CONFIG_TARGET"
  echo -e "  - Copied config: ${CYAN}${source_config_file}${NC} -> ${GREEN}${CONFIG_TARGET}${NC}"

  mkdir -p "$DST/$SLUG_DIR"
  echo -e "  - Created slug folder: ${YELLOW}$DST/$SLUG_DIR${NC}"
  cp "$TEMPLATE_ROOT/$STATIC_TWO_DIR/"* "$DST/$SLUG_DIR/"
  echo -e "    -> Copied dynamic route files."

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
