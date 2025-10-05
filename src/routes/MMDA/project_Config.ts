import type { Route } from './project_Config';

/**
 * @file Config_MMDA.ts
 * @description The definitive "Smart Megacity" configuration for the MMDA.
 * This system is envisioned as the unified command, control, and intelligence platform
 * for Metro Manila, showcasing a magnificent and significant vision for urban management.
 */
export const config: Route[] = [
  // SECTION 1: Metropolitan Command Center (METROCOM)
  {
    fs_path: "metrocom",
    title: "Metropolitan Command Center",
    navTitle: "METROCOM",
    description: "The 24/7 heart of Metro Manila's operations, fusing all data streams into a single, unified picture for decisive action.",
    icon: "Orbit",
    end_point: "Providers/mmda/metrocom/Index.svelte",
    end_point_type: "dashboard,map,summary",
    children: [
      {
        fs_path: "unified-operations-picture",
        title: "Unified Operations Picture (UOP)",
        navTitle: "UOP",
        description: "A live, multi-layered GIS dashboard displaying traffic, flood, incident, and asset data across the 17 LGUs.",
        icon: "Layers",
        end_point: "Providers/mmda/metrocom/UnifiedOperationsPicture.svelte",
        end_point_type: "map,dashboard,tracker",
      },
      {
        fs_path: "predictive-analytics-unit",
        title: "Predictive Analytics Unit",
        navTitle: "Predictive AI",
        description: "AI-driven forecasting of traffic congestion, flood events, and air pollution hotspots hours before they occur.",
        icon: "BrainCircuit",
        end_point: "Providers/mmda/metrocom/PredictiveAnalytics.svelte",
        end_point_type: "analytics,dashboard,report",
      },
      {
        fs_path: "crisis-management",
        title: "Crisis & Disaster Management",
        navTitle: "Crisis Mgt.",
        description: "Coordinate city-wide response to earthquakes, typhoons, and major incidents with all emergency services.",
        icon: "ShieldAlert",
        end_point: "Providers/mmda/metrocom/CrisisManagement.svelte",
        end_point_type: "tracker,map,chat-container",
      }
    ]
  },

  // SECTION 2: Mobility & Transport Command (MTC)
  {
    fs_path: "mobility-command",
    title: "Mobility & Transport Command",
    navTitle: "Mobility",
    description: "Engineer and orchestrate a seamless, efficient, and multi-modal transportation network for all.",
    icon: "TramFront",
    end_point: "Providers/mmda/mobility/Index.svelte",
    end_point_type: "dashboard,map",
    children: [
      {
        fs_path: "intelligent-traffic-systems",
        title: "Intelligent Traffic Systems (ITS)",
        navTitle: "ITS",
        description: "AI-powered, adaptive control of all traffic signals and management of the No-Contact Apprehension Program (NCAP).",
        icon: "TrafficCone",
        end_point: "Providers/mmda/mobility/IntelligentTrafficSystems.svelte",
        end_point_type: "dashboard,settings,table",
      },
      {
        fs_path: "public-transport-authority",
        title: "Public Transport Network Authority",
        navTitle: "Public Transport",
        description: "Optimize and manage the EDSA Busway, city bus routes, and integration with rail and ferry services.",
        icon: "Bus",
        end_point: "Providers/mmda/mobility/PublicTransportAuthority.svelte",
        end_point_type: "map,tracker,analytics",
      },
      {
        fs_path: "active-transport",
        title: "Active Transport & Micromobility",
        navTitle: "Active Transport",
        description: "Plan, monitor, and promote the expansion of protected bike lanes, walkways, and shared e-mobility zones.",
        icon: "Bike",
        end_point: "Providers/mmda/mobility/ActiveTransport.svelte",
        end_point_type: "map,info,forum-thread",
      }
    ]
  },

  // SECTION 3: Urban Resilience & Environmental Command (UREC)
  {
    fs_path: "resilience-command",
    title: "Urban Resilience & Environment",
    navTitle: "Resilience",
    description: "Future-proof the metropolis against climate change and foster a sustainable urban ecosystem.",
    icon: "Wind",
    end_point: "Providers/mmda/resilience/Index.svelte",
    end_point_type: "dashboard,analytics",
    children: [
      {
        fs_path: "flood-water-management",
        title: "Flood Control & Water Management",
        navTitle: "Flood Control",
        description: "Operate and monitor the network of pumping stations and floodgates, powered by real-time sensor data.",
        icon: "Waves",
        end_point: "Providers/mmda/resilience/FloodWaterManagement.svelte",
        end_point_type: "dashboard,map,settings",
      },
      {
        fs_path: "climate-adaptation",
        title: "Climate Adaptation & Green Infra",
        navTitle: "Green Metro",
        description: "Implement the 2025-2040 Metro Manila Decarbonization Plan, promoting urban parks and sustainable infrastructure.",
        icon: "Leaf",
        end_point: "Providers/mmda/resilience/ClimateAdaptation.svelte",
        end_point_type: "tracker,document_hub,report",
      },
      {
        fs_path: "pollution-control",
        title: "Solid Waste & Pollution Control",
        navTitle: "Pollution",
        description: "Monitor city-wide air quality and manage solid waste logistics from collection to disposal.",
        icon: "Trash2",
        end_point: "Providers/mmda/resilience/PollutionControl.svelte",
        end_point_type: "analytics,map,table",
      },
    ]
  },

  // SECTION 4: Metropolitan Planning & Digital Twin Directorate
  {
    fs_path: "metro-planning",
    title: "Metropolitan Planning & Digital Twin",
    navTitle: "Planning",
    description: "Visualize and simulate the future of Metro Manila with a living, virtual model of the entire region.",
    icon: "Cylinder",
    end_point: "Providers/mmda/planning/Index.svelte",
    end_point_type: "dashboard,info",
    children: [
      {
        fs_path: "digital-twin",
        title: "The Digital Twin of Metro Manila",
        navTitle: "Digital Twin",
        description: "A hyper-realistic 3D simulation platform for testing policies and infrastructure before implementation.",
        icon: "Atom",
        end_point: "Providers/mmda/planning/digital-twin/Index.svelte",
        end_point_type: "map,analytics,dashboard",
        children: [
          {
            fs_path: "traffic-simulation",
            title: "Traffic Flow Modeling",
            navTitle: "Traffic Models",
            description: "Simulate the city-wide impact of a new traffic scheme, road closure, or public event.",
            icon: "Waypoints",
            end_point: "Providers/mmda/planning/digital-twin/TrafficSimulation.svelte",
            end_point_type: "form,map,analytics",
          },
          {
            fs_path: "disaster-simulation",
            title: "Disaster Scenario Analysis",
            navTitle: "Disaster Scenarios",
            description: "Model the effects of earthquakes or super-typhoons to optimize evacuation and response plans.",
            icon: "CloudHail",
            end_point: "Providers/mmda/planning/digital-twin/DisasterSimulation.svelte",
            end_point_type: "form,map,analytics",
          },
          {
            fs_path: "infra-simulation",
            title: "Infrastructure Impact Simulation",
            navTitle: "Infra Simulation",
            description: "Visualize the long-term effects of a new subway line or bridge on urban development and land value.",
            icon: "Network",
            end_point: "Providers/mmda/planning/digital-twin/InfraSimulation.svelte",
            end_point_type: "form,map,analytics",
          }
        ]
      },
      {
        fs_path: "zoning-authority",
        title: "Metro Zoning & Land Use Authority",
        navTitle: "Zoning",
        description: "The authoritative GIS portal for metropolitan zoning regulations and future development plans.",
        icon: "Building2",
        end_point: "Providers/mmda/planning/ZoningAuthority.svelte",
        end_point_type: "map,table,document_hub",
      }
    ]
  },

  // SECTION 5: Directory & Citizen's Charter (Standard Fixture)
  {
    fs_path: "directory",
    title: "Directory & Citizen's Charter",
    navTitle: "Directory",
    description: "Find office locations, contact personnel, and view our service commitments.",
    icon: "BookUser",
    end_point: "Providers/mmda/directory/Index.svelte",
    end_point_type: "dashboard,summary",
    children: [
      {
        fs_path: "office-locations",
        title: "Office Locations",
        navTitle: "Locations",
        description: "Interactive map and list of all MMDA offices and facilities.",
        icon: "MapPinned",
        end_point: "Providers/mmda/directory/OfficeLocations.svelte",
        end_point_type: "map,table",
      },
      {
        fs_path: "key-officials",
        title: "Key Officials Directory",
        navTitle: "Officials",
        description: "Directory of the MMDA Chairman, General Manager, and key officers.",
        icon: "Users2",
        end_point: "Providers/mmda/directory/KeyOfficials.svelte",
        end_point_type: "profile,table",
      },
      {
        fs_path: "citizens-charter",
        title: "Citizen's Charter",
        navTitle: "Charter",
        description: "Our service standards, processing times, and feedback mechanisms as per R.A. 11032.",
        icon: "ShieldCheck",
        end_point: "Providers/mmda/directory/CitizensCharter.svelte",
        end_point_type: "document_hub,report",
      }
    ]
  },
];