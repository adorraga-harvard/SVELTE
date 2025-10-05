import type { Route } from './project_Config';

/**
 * @file Config_DEPDEV.ts
 * @description The definitive configuration for the Department of Development (DepDev).
 * This version incorporates all established design principles: deep hierarchy,
 * no single-child nodes, a standard directory fixture, and rich branch-node endpoints.
 */
export const config: Route[] = [
  // SECTION 1: National Planning & Policy Directorate
  {
    fs_path: "national-planning",
    title: "National Planning & Policy",
    navTitle: "Planning",
    description: "Formulate, coordinate, and simulate the impact of national socioeconomic policies.",
    icon: "Library",
    end_point: "Providers/depdev/national-planning/+page.svelte",
    end_point_type: "dashboard,summary",
    children: [
      {
        fs_path: "pdp-hub",
        title: "Philippine Development Plan Hub",
        navTitle: "PDP Hub",
        description: "The digital framework for the PDP, tracking all sectoral and regional goals.",
        icon: "BookMarked",
        end_point: "Providers/depdev/national-planning/pdp-hub/+page.svelte",
        end_point_type: "dashboard,analytics",
        children: [
          {
            fs_path: "sectoral-plans",
            title: "Sectoral Development Plans",
            navTitle: "Sectors",
            description: "Deep dive into plans for Agriculture, Industry, Services, and more.",
            icon: "LayoutGrid",
            end_point: "Providers/depdev/national-planning/pdp-hub/SectoralPlans.svelte",
            end_point_type: "table,document_hub,report",
          },
          {
            fs_path: "regional-plans",
            title: "Regional Development Plans",
            navTitle: "Regions",
            description: "Geospatial view of development plans and priorities across all regions.",
            icon: "Map",
            end_point: "Providers/depdev/national-planning/pdp-hub/RegionalPlans.svelte",
            end_point_type: "map,report,summary",
          },
        ]
      },
      {
        fs_path: "policy-simulation-lab",
        title: "Policy Simulation Lab",
        navTitle: "PolicySim",
        description: "Model the macroeconomic effects of proposed legislation and executive actions.",
        icon: "TestTube2",
        end_point: "Providers/depdev/national-planning/policy-simulation-lab/+page.svelte",
        end_point_type: "dashboard,info",
        children: [
            {
                fs_path: "run-simulation",
                title: "Run New Simulation",
                navTitle: "New Simulation",
                description: "Use econometric models to forecast the impact of a new policy.",
                icon: "Play",
                end_point: "Providers/depdev/national-planning/policy-simulation-lab/RunSimulation.svelte",
                end_point_type: "form,analytics,report",
            },
            {
                fs_path: "simulation-history",
                title: "Simulation History",
                navTitle: "History",
                description: "Browse and compare the results of previous policy simulations.",
                icon: "History",
                end_point: "Providers/depdev/national-planning/policy-simulation-lab/SimulationHistory.svelte",
                end_point_type: "table,report,summary",
            }
        ]
      },
      {
        fs_path: "interagency-coordination",
        title: "Inter-Agency Coordination",
        navTitle: "Coordination",
        description: "Collaboration suites for Technical Working Groups (TWGs) from various agencies.",
        icon: "Workflow",
        end_point: "Providers/depdev/national-planning/interagency-coordination/+page.svelte",
        end_point_type: "dashboard,table",
        children: [
           {
            fs_path: "twg-forums",
            title: "TWG Collaboration Rooms",
            navTitle: "TWG Rooms",
            description: "Secure discussion forums and document repositories for each working group.",
            icon: "MessageSquare",
            end_point: "Providers/depdev/national-planning/interagency-coordination/TwgForums.svelte",
            end_point_type: "forum-thread,document_hub,upload",
          },
          {
            fs_path: "meeting-scheduler",
            title: "Inter-Agency Meetings",
            navTitle: "Meetings",
            description: "Schedule and track high-level inter-agency meetings and action items.",
            icon: "Calendar",
            end_point: "Providers/depdev/national-planning/interagency-coordination/MeetingScheduler.svelte",
            end_point_type: "calendar,table",
          }
        ]
      },
    ]
  },
  // SECTION 2: Investment Programming & Project Appraisal
  {
    fs_path: "investment-programming",
    title: "Investment Programming & Appraisal",
    navTitle: "Investments",
    description: "Evaluate and prioritize major national projects for the Investment Coordination Committee (ICC).",
    icon: "GanttChartSquare",
    end_point: "Providers/depdev/investment-programming/+page.svelte",
    end_point_type: "summary,table",
    children: [
      {
        fs_path: "project-pipeline",
        title: "National Priority Project Pipeline",
        navTitle: "Project Pipeline",
        description: "The master database of all proposed, ongoing, and completed flagship projects.",
        icon: "Network",
        end_point: "Providers/depdev/investment-programming/project-pipeline/+page.svelte",
        end_point_type: "dashboard,map,summary",
        children: [
          {
            fs_path: "physical-infra",
            title: "Physical Infrastructure",
            navTitle: "Physical",
            description: "Monitor transport, energy, and water infrastructure projects.",
            icon: "Construction",
            end_point: "Providers/depdev/investment-programming/project-pipeline/PhysicalInfra.svelte",
            end_point_type: "table,tracker,report",
          },
          {
            fs_path: "digital-infra",
            title: "Digital Infrastructure",
            navTitle: "Digital",
            description: "Track the progress of the National Broadband Plan and other digital projects.",
            icon: "Wifi",
            end_point: "Providers/depdev/investment-programming/project-pipeline/DigitalInfra.svelte",
            end_point_type: "table,tracker,report",
          }
        ]
      },
      {
        fs_path: "ppp-center",
        title: "Public-Private Partnership (PPP) Center",
        navTitle: "PPP",
        description: "Manage the lifecycle of PPP projects and facilitate partner collaboration.",
        icon: "Handshake",
        end_point: "Providers/depdev/investment-programming/ppp-center/+page.svelte",
        end_point_type: "dashboard,tracker",
        children: [
          {
            fs_path: "bidding-portal",
            title: "Project Bidding Portal",
            navTitle: "Bids",
            description: "Official portal for PPP project solicitations, submissions, and awards.",
            icon: "Gavel",
            end_point: "Providers/depdev/investment-programming/ppp-center/BiddingPortal.svelte",
            end_point_type: "table,document_hub,form",
          },
          {
            fs_path: "partner-chatroom",
            title: "Partner Collaboration Room",
            navTitle: "Chat Room",
            description: "Secure chat and file sharing for ongoing PPP project stakeholders.",
            icon: "MessageCircle",
            end_point: "Providers/depdev/investment-programming/ppp-center/PartnerChatroom.svelte",
            end_point_type: "chat-container,upload,calendar",
          },
        ]
      },
      {
        fs_path: "project-appraisal-suite",
        title: "Project Appraisal Suite",
        navTitle: "Appraisal",
        description: "Conduct Cost-Benefit, Risk, and Economic Impact analyses for proposed projects.",
        icon: "Scale",
        end_point: "Providers/depdev/investment-programming/ProjectAppraisal.svelte",
        end_point_type: "form,analytics,report"
      },
      {
        fs_path: "oda-portfolio",
        title: "Official Development Assistance (ODA)",
        navTitle: "ODA",
        description: "Manage and monitor projects funded by international partners (World Bank, ADB, JICA).",
        icon: "Globe",
        end_point: "Providers/depdev/investment-programming/OdaPortfolio.svelte",
        end_point_type: "dashboard,table,document_hub"
      },
    ]
  },
  // SECTION 3: Economic Intelligence & Forecasting
  {
    fs_path: "economic-intelligence",
    title: "Economic Intelligence & Forecasting",
    navTitle: "Economics",
    description: "Serve as the government's primary economic think tank and forecasting center.",
    icon: "TrendingUp",
    end_point: "Providers/depdev/economic-intelligence/+page.svelte",
    end_point_type: "dashboard,analytics",
    children: [
      {
        fs_path: "macroeconomic-situation-room",
        title: "Macroeconomic Situation Room",
        navTitle: "Situation Room",
        description: "Deep dive dashboards for key sectors of the Philippine economy.",
        icon: "AreaChart",
        end_point: "Providers/depdev/economic-intelligence/macroeconomic-situation-room/+page.svelte",
        end_point_type: "dashboard,summary",
        children: [
            {
                fs_path: "national-accounts",
                title: "National Accounts (GDP/GNI)",
                navTitle: "GDP",
                description: "Analyze Gross Domestic Product and Gross National Income trends.",
                icon: "PieChart",
                end_point: "Providers/depdev/economic-intelligence/macroeconomic-situation-room/NationalAccounts.svelte",
                end_point_type: "dashboard,analytics",
            },
            {
                fs_path: "fiscal-monitor",
                title: "Fiscal Monitor",
                navTitle: "Fiscal",
                description: "Track government revenues, expenditures, and debt levels.",
                icon: "Banknote",
                end_point: "Providers/depdev/economic-intelligence/macroeconomic-situation-room/FiscalMonitor.svelte",
                end_point_type: "dashboard,report",
            }
        ]
      },
      {
        fs_path: "econometric-modeling",
        title: "Econometric Modeling Suite",
        navTitle: "EconoMetrics",
        description: "Advanced tools for economists to build and run predictive economic models.",
        icon: "Calculator",
        end_point: "Providers/depdev/economic-intelligence/EconometricModeling.svelte",
        end_point_type: "analytics,form,table"
      },
      {
        fs_path: "regional-economic-analysis",
        title: "Regional Economic Analysis (GIS)",
        navTitle: "Regional GIS",
        description: "Geospatial analysis of development corridors, poverty maps, and investment opportunities.",
        icon: "Map",
        end_point: "Providers/depdev/economic-intelligence/RegionalGis.svelte",
        end_point_type: "map,analytics,report"
      },
    ]
  },
  // SECTION 4: Monitoring & Evaluation
  {
    fs_path: "monitoring-evaluation",
    title: "Monitoring & Evaluation",
    navTitle: "M&E",
    description: "Track and assess the performance and real-world impact of national programs.",
    icon: "ClipboardCheck",
    end_point: "Providers/depdev/monitoring-evaluation/+page.svelte",
    end_point_type: "dashboard,summary",
    children: [
      {
        fs_path: "project-monitoring",
        title: "National Project Monitoring",
        navTitle: "Project Monitoring",
        description: "Real-time monitoring of flagship projects' physical and financial progress.",
        icon: "Construction",
        end_point: "Providers/depdev/monitoring-evaluation/ProjectMonitoring.svelte",
        end_point_type: "tracker,dashboard,report,upload"
      },
      {
        fs_path: "impact-assessment",
        title: "Socioeconomic Impact Assessment",
        navTitle: "Impact",
        description: "Evaluate the effectiveness of government programs against their stated PDP targets.",
        icon: "Target",
        end_point: "Providers/depdev/monitoring-evaluation/ImpactAssessment.svelte",
        end_point_type: "analytics,summary,report"
      },
      {
        fs_path: "citizen-monitoring",
        title: "Citizen Participatory Monitoring",
        navTitle: "Citizen M&E",
        description: "Platforms for gathering and analyzing public feedback on government projects.",
        icon: "MessageSquarePlus",
        end_point: "Providers/depdev/monitoring-evaluation/citizen-monitoring/+page.svelte",
        end_point_type: "dashboard,map",
        children: [
          {
            fs_path: "feedback-portal",
            title: "Public Feedback Portal",
            navTitle: "Feedback",
            description: "Submit and track feedback on specific national projects and programs.",
            icon: "Send",
            end_point: "Providers/depdev/monitoring-evaluation/citizen-monitoring/FeedbackPortal.svelte",
            end_point_type: "form,upload,tracker",
          },
          {
            fs_path: "stakeholder-forums",
            title: "Stakeholder Forums",
            navTitle: "Forums",
            description: "Engage in moderated public discussions on key development issues.",
            icon: "Users",
            end_point: "Providers/depdev/monitoring-evaluation/citizen-monitoring/StakeholderForums.svelte",
            end_point_type: "forum-thread,table",
          }
        ]
      },
    ]
  },
  // SECTION 5: Directory & Citizen's Charter (Standard Fixture)
  {
    fs_path: "directory",
    title: "Directory & Citizen's Charter",
    navTitle: "Directory",
    description: "Find office locations, contact personnel, and view our service commitments.",
    icon: "BookUser",
    end_point: "Providers/depdev/directory/+page.svelte",
    end_point_type: "dashboard,summary",
    children: [
      {
        fs_path: "office-locations",
        title: "Office Locations",
        navTitle: "Locations",
        description: "Interactive map and list of all national and regional offices.",
        icon: "MapPinned",
        end_point: "Providers/depdev/directory/OfficeLocations.svelte",
        end_point_type: "map,table",
      },
      {
        fs_path: "key-officials",
        title: "Key Officials Directory",
        navTitle: "Officials",
        description: "Directory of department secretaries, undersecretaries, and directors.",
        icon: "Users2",
        end_point: "Providers/depdev/directory/KeyOfficials.svelte",
        end_point_type: "profile,table",
      },
      {
        fs_path: "citizens-charter",
        title: "Citizen's Charter",
        navTitle: "Charter",
        description: "Our service standards, processing times, and feedback mechanisms as per R.A. 11032.",
        icon: "ShieldCheck",
        end_point: "Providers/depdev/directory/CitizensCharter.svelte",
        end_point_type: "document_hub,report",
      }
    ]
  }
];