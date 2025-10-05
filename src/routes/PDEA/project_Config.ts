export interface Route {
  fs_path: string;
  navTitle: string;
  description: string;
  icon: string;
  templates: string;
  children?: Route[];
}

export const config: Route[] = [
  // SECTION 1: Intelligence & Fusion Command (INTELCOM)
  {
    fs_path: "intel-command",
    navTitle: "INTELCOM",
    description: "The nerve center for multi-source data fusion, predictive analysis, and actionable intelligence generation.",
    icon: "BrainCircuit",
    templates: "dashboard,map,info",
    children: [
      {
        fs_path: "target-dossiers",
        navTitle: "HVTs",
        description: "Dynamic profiles of HVTs, syndicates, and their networks, updated in real-time.",
        icon: "Target",
        templates: "dashboard,profile,table",
      },
      {
        fs_path: "fusion-analytics-center",
        navTitle: "Analytics",
        description: "AI-driven tools for deep analysis across multiple intelligence disciplines.",
        icon: "Network",
        templates: "dashboard,chart",
        children: [
          {
            fs_path: "geospatial-intelligence",
            navTitle: "GEOINT",
            description: "Map and analyze drug routes, clandestine laboratories, and operational hotspots.",
            icon: "Map",
            templates: "map,chart,report,gps",
          },
          {
            fs_path: "financial-intelligence",
            navTitle: "FININT",
            description: "Track and disrupt money laundering networks through banks and cryptocurrency.",
            icon: "Bitcoin",
            templates: "chart,table,report",
          },
          {
            fs_path: "cyber-intelligence",
            navTitle: "CYBINT",
            description: "Monitor darknet markets, encrypted communications, and online narcotics trafficking.",
            icon: "Laptop",
            templates: "dashboard,feed,chat",
          }
        ]
      },
      {
        fs_path: "ci-management",
        navTitle: "CIs",
        description: "Secure, encrypted registry for informant handling, validation, and intelligence reporting.",
        icon: "UserCog",
        templates: "form,table,profile",
      }
    ]
  },

  // SECTION 2: Operations Command (OPSCOM)
  {
    fs_path: "operations-command",
    navTitle: "OPSCOM",
    description: "Plan, authorize, and command all national and regional counter-narcotics field operations.",
    icon: "Crosshair",
    templates: "dashboard,map,tracker",
    children: [
      {
        fs_path: "rtoc",
        navTitle: "RTOC",
        description: "Live situational awareness and command & control for all active missions.",
        icon: "Satellite",
        templates: "map,dashboard,chat,gps,camera,sms",
      },
      {
        fs_path: "field-operations-log",
        navTitle: "Ops Log",
        description: "Comprehensive repository of all planned, ongoing, and completed field operations.",
        icon: "BookCopy",
        templates: "table,info,map",
        children: [
            {
                fs_path: "buy-bust-ops",
                navTitle: "Buy-Bust",
                description: "Manage and track all buy-bust operations nationwide.",
                icon: "Handshake",
                templates: "table,tracker,report,camera,qr-code",
            },
            {
                fs_path: "interdiction-ops",
                navTitle: "Interdiction",
                description: "Log operations at seaports, airports, and mail/parcel services.",
                icon: "Ship",
                templates: "table,tracker,report,camera,qr-code",
            }
        ]
      },
      {
        fs_path: "special-units",
        navTitle: "Special Units",
        description: "Manage K-9 Teams, Special Reaction Units (SRU), and Aviation assets.",
        icon: "Dog",
        templates: "dashboard,table,info,gps",
      },
    ]
  },

  // SECTION 3: Investigations & Legal Command
  {
    fs_path: "investigations-legal",
    navTitle: "Investigation",
    description: "Build airtight cases against drug offenders from arrest to prosecution, ensuring legal compliance.",
    icon: "Gavel",
    templates: "dashboard,table",
    children: [
      {
        fs_path: "unified-case-management",
        navTitle: "Cases",
        description: "The central system for all case files, events, and linked entities from initiation to resolution.",
        icon: "FolderSearch",
        templates: "dashboard,table,tracker",
        children: [
            {
                fs_path: "hvt-cases",
                navTitle: "HVT Cases",
                description: "Specialized tracking for cases involving top-tier drug personalities.",
                icon: "UserCheck",
                templates: "table,tracker,profile",
            },
            {
                fs_path: "syndicate-cases",
                navTitle: "Syndicate Cases",
                description: "Investigations focused on dismantling entire drug trafficking organizations.",
                icon: "Users",
                templates: "chart,table,report",
            }
        ]
      },
      {
        fs_path: "prosecution-support",
        navTitle: "DOJ Support",
        description: "Prepare and transmit evidence packages and case summaries to the Department of Justice.",
        icon: "Landmark",
        templates: "report,checklist,form,DocumentHub",
      }
    ]
  },

  // SECTION 4: Forensics & Evidence Directorate
  {
    fs_path: "forensics-evidence",
    navTitle: "Forensics",
    description: "Ensure the scientific and legal integrity of all seized evidence from collection to court presentation.",
    icon: "Microscope",
    templates: "dashboard,table,info",
    children: [
      {
        fs_path: "dcoc",
        navTitle: "Chain of Custody",
        description: "Immutable, tamper-proof log for all evidence handling, compliant with R.A. 9165.",
        icon: "Link",
        templates: "tracker,form,report,qr-code,camera",
      },
      {
        fs_path: "laboratory-services",
        navTitle: "Labs",
        description: "Manage drug testing, chemical analysis, and results from forensic chemistry labs.",
        icon: "FlaskConical",
        templates: "dashboard,table,form",
      },
      {
        fs_path: "digital-forensics-unit",
        navTitle: "Digital Forensics",
        description: "Extract and analyze evidence from seized digital devices and cryptocurrency wallets.",
        icon: "Fingerprint",
        templates: "dashboard,table",
        children: [
            {
                fs_path: "mobile-forensics",
                navTitle: "Mobile",
                description: "Case management for analysis of seized mobile phones and tablets.",
                icon: "Smartphone",
                templates: "table,tracker,DocumentHub",
            },
            {
                fs_path: "computer-forensics",
                navTitle: "Computer",
                description: "Case management for analysis of seized laptops, desktops, and servers.",
                icon: "Server",
                templates: "table,tracker,DocumentHub",
            }
        ]
      }
    ]
  },

  // SECTION 5: Strategic Command & Inter-Agency Hub
  {
    fs_path: "strategic-command",
    navTitle: "STRATCOM",
    description: "High-level policy support, asset forfeiture, and seamless collaboration with local and international partners.",
    icon: "Shield",
    templates: "dashboard,info",
    children: [
      {
        fs_path: "asset-forfeiture",
        navTitle: "Asset Forfeiture",
        description: "Track financial investigations with AMLC and manage seized assets from drug syndicates.",
        icon: "Banknote",
        templates: "chart,table,form",
      },
      {
        fs_path: "inter-agency-portal",
        navTitle: "Task Forces",
        description: "Secure collaboration portals for joint task forces with PNP, NBI, AFP, and foreign partners.",
        icon: "Users2",
        templates: "dashboard,table",
        children: [
            {
                fs_path: "task-force-local",
                navTitle: "Local TF",
                description: "Joint operations planning and intelligence sharing with local law enforcement.",
                icon: "UserCog",
                templates: "feed,DocumentHub,calendar,sms",
            },
            {
                fs_path: "international-liaison",
                navTitle: "Int'l Liaison",
                description: "Secure communication channel for coordinating with international partners.",
                icon: "Globe",
                templates: "chat,table,report,sms",
            }
        ]
      }
    ]
  },

  // SECTION 6: Directory & Citizen's Charter (Standard Fixture)
  {
    fs_path: "directory",
    navTitle: "Directory",
    description: "Find office locations, contact personnel, and view our service commitments.",
    icon: "BookUser",
    templates: "dashboard,info",
    children: [
      {
        fs_path: "office-locations",
        navTitle: "Locations",
        description: "Interactive map and list of all PDEA regional offices nationwide.",
        icon: "MapPinned",
        templates: "map,table,gps",
      },
      {
        fs_path: "key-officials",
        navTitle: "Officials",
        description: "Directory of the PDEA Director General, Deputy DGs, and Service Directors.",
        icon: "Users",
        templates: "profile,table",
      },
      {
        fs_path: "citizens-charter",
        navTitle: "Charter",
        description: "View our service standards for clearances, reporting, and other public services.",
        icon: "ShieldCheck",
        templates: "DocumentHub,report",
      }
    ]
  }
];