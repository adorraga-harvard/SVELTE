import type { Route } from './project_Config';

/**
 * @file Config_PDEA.ts
 * @description The definitive "Magnificence" version for the PDEA Command & Control System.
 * This configuration portrays a world-class, intelligence-led agency with a deep,
 * multi-layered operational structure.
 */
export const config: Route[] = [
  // SECTION 1: Intelligence & Fusion Command (INTELCOM)
  {
    fs_path: "intel-command",
    title: "Intelligence & Fusion Command",
    navTitle: "INTELCOM",
    description: "The nerve center for multi-source data fusion, predictive analysis, and actionable intelligence generation.",
    icon: "BrainCircuit",
    end_point: "Providers/pdea/intel-command/+page.svelte",
    end_point_type: "dashboard,map,summary",
    children: [
      {
        fs_path: "target-dossiers",
        title: "High-Value Target Dossiers",
        navTitle: "HVTs",
        description: "Dynamic profiles of HVTs, syndicates, and their networks, updated in real-time.",
        icon: "Target",
        end_point: "Providers/pdea/intel-command/TargetDossiers.svelte",
        end_point_type: "dashboard,profile,table",
      },
      {
        fs_path: "fusion-analytics-center",
        title: "Fusion Analytics Center",
        navTitle: "Analytics",
        description: "AI-driven tools for deep analysis across multiple intelligence disciplines.",
        icon: "Network",
        end_point: "Providers/pdea/intel-command/fusion-analytics-center/+page.svelte",
        end_point_type: "dashboard,analytics",
        children: [
          {
            fs_path: "geospatial-intelligence",
            title: "Geospatial Intelligence (GEOINT)",
            navTitle: "GEOINT",
            description: "Map and analyze drug routes, clandestine laboratories, and operational hotspots.",
            icon: "Map",
            end_point: "Providers/pdea/intel-command/fusion-analytics-center/GeospatialIntel.svelte",
            end_point_type: "map,analytics,report",
          },
          {
            fs_path: "financial-intelligence",
            title: "Financial Intelligence (FININT)",
            navTitle: "FININT",
            description: "Track and disrupt money laundering networks through banks and cryptocurrency.",
            icon: "Bitcoin",
            end_point: "Providers/pdea/intel-command/fusion-analytics-center/FinancialIntel.svelte",
            end_point_type: "analytics,table,report",
          },
          {
            fs_path: "cyber-intelligence",
            title: "Dark Web & Cyber Intelligence (CYBINT)",
            navTitle: "CYBINT",
            description: "Monitor darknet markets, encrypted communications, and online narcotics trafficking.",
            icon: "Laptop",
            end_point: "Providers/pdea/intel-command/fusion-analytics-center/CyberIntel.svelte",
            end_point_type: "dashboard,forum-thread",
          }
        ]
      },
      {
        fs_path: "ci-management",
        title: "Confidential Informant Management",
        navTitle: "CIs",
        description: "Secure, encrypted registry for informant handling, validation, and intelligence reporting.",
        icon: "UserCog",
        end_point: "Providers/pdea/intel-command/CiManagement.svelte",
        end_point_type: "form,table,profile",
      }
    ]
  },

  // SECTION 2: Operations Command (OPSCOM)
  {
    fs_path: "operations-command",
    title: "Operations Command",
    navTitle: "OPSCOM",
    description: "Plan, authorize, and command all national and regional counter-narcotics field operations.",
    icon: "Crosshair",
    end_point: "Providers/pdea/operations-command/+page.svelte",
    end_point_type: "dashboard,map,tracker",
    children: [
      {
        fs_path: "rtoc",
        title: "Real-Time Operations Center (RTOC)",
        navTitle: "RTOC",
        description: "Live situational awareness and command & control for all active missions.",
        icon: "Satellite",
        end_point: "Providers/pdea/operations-command/RTOC.svelte",
        end_point_type: "map,dashboard,chat-container",
      },
      {
        fs_path: "field-operations-log",
        title: "Field Operations Log",
        navTitle: "Ops Log",
        description: "Comprehensive repository of all planned, ongoing, and completed field operations.",
        icon: "BookCopy",
        end_point: "Providers/pdea/operations-command/field-operations-log/+page.svelte",
        end_point_type: "table,summary,map",
        children: [
            {
                fs_path: "buy-bust-ops",
                title: "Buy-Bust Operations",
                navTitle: "Buy-Bust",
                description: "Manage and track all buy-bust operations nationwide.",
                icon: "Handshake",
                end_point: "Providers/pdea/operations-command/field-operations-log/BuyBustOps.svelte",
                end_point_type: "table,tracker,report",
            },
            {
                fs_path: "interdiction-ops",
                title: "Interdiction Operations",
                navTitle: "Interdiction",
                description: "Log operations at seaports, airports, and mail/parcel services.",
                icon: "Ship",
                end_point: "Providers/pdea/operations-command/field-operations-log/InterdictionOps.svelte",
                end_point_type: "table,tracker,report",
            }
        ]
      },
      {
        fs_path: "special-units",
        title: "Special Units Deployment",
        navTitle: "Special Units",
        description: "Manage K-9 Teams, Special Reaction Units (SRU), and Aviation assets.",
        icon: "Dog",
        end_point: "Providers/pdea/operations-command/SpecialUnits.svelte",
        end_point_type: "dashboard,table,settings",
      },
    ]
  },

  // SECTION 3: Investigations & Legal Command
  {
    fs_path: "investigations-legal",
    title: "Investigations & Legal Command",
    navTitle: "Investigation",
    description: "Build airtight cases against drug offenders from arrest to prosecution, ensuring legal compliance.",
    icon: "Gavel",
    end_point: "Providers/pdea/investigations-legal/+page.svelte",
    end_point_type: "dashboard,table",
    children: [
      {
        fs_path: "unified-case-management",
        title: "Unified Case Management",
        navTitle: "Cases",
        description: "The central system for all case files, events, and linked entities from initiation to resolution.",
        icon: "FolderSearch",
        end_point: "Providers/pdea/investigations-legal/unified-case-management/+page.svelte",
        end_point_type: "dashboard,table,tracker",
        children: [
            {
                fs_path: "hvt-cases",
                title: "High-Value Target Cases",
                navTitle: "HVT Cases",
                description: "Specialized tracking for cases involving top-tier drug personalities.",
                icon: "UserCheck",
                end_point: "Providers/pdea/investigations-legal/unified-case-management/HvtCases.svelte",
                end_point_type: "table,tracker,profile",
            },
            {
                fs_path: "syndicate-cases",
                title: "Syndicate Cases",
                navTitle: "Syndicate Cases",
                description: "Investigations focused on dismantling entire drug trafficking organizations.",
                icon: "Users",
                end_point: "Providers/pdea/investigations-legal/unified-case-management/SyndicateCases.svelte",
                end_point_type: "analytics,table,report",
            }
        ]
      },
      {
        fs_path: "prosecution-support",
        title: "Prosecution Support Suite",
        navTitle: "DOJ Support",
        description: "Prepare and transmit evidence packages and case summaries to the Department of Justice.",
        icon: "Landmark",
        end_point: "Providers/pdea/investigations-legal/ProsecutionSupport.svelte",
        end_point_type: "report,checklist,form",
      }
    ]
  },

  // SECTION 4: Forensics & Evidence Directorate
  {
    fs_path: "forensics-evidence",
    title: "Forensics & Evidence Directorate",
    navTitle: "Forensics",
    description: "Ensure the scientific and legal integrity of all seized evidence from collection to court presentation.",
    icon: "Microscope",
    end_point: "Providers/pdea/forensics-evidence/+page.svelte",
    end_point_type: "dashboard,table,summary",
    children: [
      {
        fs_path: "dcoc",
        title: "Digital Chain of Custody (DCOC)",
        navTitle: "Chain of Custody",
        description: "Immutable, tamper-proof log for all evidence handling, compliant with R.A. 9165.",
        icon: "Link",
        end_point: "Providers/pdea/forensics-evidence/DCOC.svelte",
        end_point_type: "tracker,form,report",
      },
      {
        fs_path: "laboratory-services",
        title: "Laboratory Services",
        navTitle: "Labs",
        description: "Manage drug testing, chemical analysis, and results from forensic chemistry labs.",
        icon: "FlaskConical",
        end_point: "Providers/pdea/forensics-evidence/LaboratoryServices.svelte",
        end_point_type: "dashboard,table",
      },
      {
        fs_path: "digital-forensics-unit",
        title: "Digital Forensics Unit",
        navTitle: "Digital Forensics",
        description: "Extract and analyze evidence from seized digital devices and cryptocurrency wallets.",
        icon: "Fingerprint",
        end_point: "Providers/pdea/forensics-evidence/digital-forensics-unit/+page.svelte",
        end_point_type: "dashboard,table",
        children: [
            {
                fs_path: "mobile-forensics",
                title: "Mobile Device Forensics",
                navTitle: "Mobile",
                description: "Case management for analysis of seized mobile phones and tablets.",
                icon: "Smartphone",
                end_point: "Providers/pdea/forensics-evidence/digital-forensics-unit/MobileForensics.svelte",
                end_point_type: "table,tracker",
            },
            {
                fs_path: "computer-forensics",
                title: "Computer Forensics",
                navTitle: "Computer",
                description: "Case management for analysis of seized laptops, desktops, and servers.",
                icon: "Server",
                end_point: "Providers/pdea/forensics-evidence/digital-forensics-unit/ComputerForensics.svelte",
                end_point_type: "table,tracker",
            }
        ]
      }
    ]
  },

  // SECTION 5: Strategic Command & Inter-Agency Hub
  {
    fs_path: "strategic-command",
    title: "Strategic Command",
    navTitle: "STRATCOM",
    description: "High-level policy support, asset forfeiture, and seamless collaboration with local and international partners.",
    icon: "Shield",
    end_point: "Providers/pdea/strategic-command/+page.svelte",
    end_point_type: "dashboard,summary",
    children: [
      {
        fs_path: "asset-forfeiture",
        title: "Asset Forfeiture & Financial Crimes",
        navTitle: "Asset Forfeiture",
        description: "Track financial investigations with AMLC and manage seized assets from drug syndicates.",
        icon: "Banknote",
        end_point: "Providers/pdea/strategic-command/AssetForfeiture.svelte",
        end_point_type: "analytics,table,form",
      },
      {
        fs_path: "inter-agency-portal",
        title: "Inter-Agency Task Force Portal",
        navTitle: "Task Forces",
        description: "Secure collaboration portals for joint task forces with PNP, NBI, AFP, and foreign partners.",
        icon: "Users2",
        end_point: "Providers/pdea/strategic-command/inter-agency-portal/+page.svelte",
        end_point_type: "dashboard,table",
        children: [
            {
                fs_path: "task-force-local",
                title: "Local Task Forces (PNP/NBI)",
                navTitle: "Local TF",
                description: "Joint operations planning and intelligence sharing with local law enforcement.",
                icon: "UserCog",
                end_point: "Providers/pdea/strategic-command/inter-agency-portal/TaskForceLocal.svelte",
                end_point_type: "forum-thread,document_hub,calendar",
            },
            {
                fs_path: "international-liaison",
                title: "International Liaison (DEA/INTERPOL)",
                navTitle: "Int'l Liaison",
                description: "Secure communication channel for coordinating with international partners.",
                icon: "Globe",
                end_point: "Providers/pdea/strategic-command/inter-agency-portal/InternationalLiaison.svelte",
                end_point_type: "chat-container,table,report",
            }
        ]
      }
    ]
  },

  // SECTION 6: Directory & Citizen's Charter (Standard Fixture)
  {
    fs_path: "directory",
    title: "Directory & Citizen's Charter",
    navTitle: "Directory",
    description: "Find office locations, contact personnel, and view our service commitments.",
    icon: "BookUser",
    end_point: "Providers/pdea/directory/+page.svelte",
    end_point_type: "dashboard,summary",
    children: [
      {
        fs_path: "office-locations",
        title: "Regional Office Locations",
        navTitle: "Locations",
        description: "Interactive map and list of all PDEA regional offices nationwide.",
        icon: "MapPinned",
        end_point: "Providers/pdea/directory/OfficeLocations.svelte",
        end_point_type: "map,table",
      },
      {
        fs_path: "key-officials",
        title: "Key Officials Directory",
        navTitle: "Officials",
        description: "Directory of the PDEA Director General, Deputy DGs, and Service Directors.",
        icon: "Users",
        end_point: "Providers/pdea/directory/KeyOfficials.svelte",
        end_point_type: "profile,table",
      },
      {
        fs_path: "citizens-charter",
        title: "Citizen's Charter",
        navTitle: "Charter",
        description: "View our service standards for clearances, reporting, and other public services.",
        icon: "ShieldCheck",
        end_point: "Providers/pdea/directory/CitizensCharter.svelte",
        end_point_type: "document_hub,report",
      }
    ]
  }
];