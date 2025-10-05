import type { Route } from './project_Config';

/**
 * @file Config_DDB.ts
 * @description The definitive "Magnificence" version for the Dangerous Drugs Board (DDB).
 * This configuration portrays a world-class, evidence-based, and strategic governing body
 * for national drug policy.
 */
export const config: Route[] = [
  // SECTION 1: Policy & Strategy Secretariat
  {
    fs_path: "policy-secretariat",
    title: "Policy & Strategy Secretariat",
    navTitle: "Policy",
    description: "The central authority for drafting, simulating, and promulgating national drug control policies.",
    icon: "Scale",
    end_point: "Providers/ddb/policy-secretariat/+page.svelte",
    end_point_type: "dashboard,summary",
    children: [
      {
        fs_path: "nadpa-hub",
        title: "National Anti-Drug Program (NADPA)",
        navTitle: "NADPA Hub",
        description: "The digital master plan tracking all national anti-drug initiatives and agency commitments.",
        icon: "BookMarked",
        end_point: "Providers/ddb/policy-secretariat/NadpaHub.svelte",
        end_point_type: "document_hub,tracker,dashboard",
      },
      {
        fs_path: "policy-development-studio",
        title: "Policy Development Studio",
        navTitle: "Policy Studio",
        description: "An end-to-end suite for evidence-based drug policy formulation.",
        icon: "Beaker",
        end_point: "Providers/ddb/policy-secretariat/policy-development-studio/+page.svelte",
        end_point_type: "dashboard,info",
        children: [
            {
                fs_path: "impact-simulation",
                title: "Impact Simulation & Analysis",
                navTitle: "Simulate",
                description: "Model the socioeconomic and public health effects of proposed regulations.",
                icon: "TestTube2",
                end_point: "Providers/ddb/policy-secretariat/policy-development-studio/ImpactSimulation.svelte",
                end_point_type: "analytics,form,report",
            },
            {
                fs_path: "public-consultation",
                title: "Public Consultation Portal",
                navTitle: "Consultation",
                description: "Engage stakeholders and the public on draft policies and issuances.",
                icon: "Users",
                end_point: "Providers/ddb/policy-secretariat/policy-development-studio/PublicConsultation.svelte",
                end_point_type: "forum-thread,calendar,document_hub",
            }
        ]
      },
      {
        fs_path: "board-resolutions",
        title: "Board Resolutions & Issuances",
        navTitle: "Resolutions",
        description: "A searchable, version-controlled archive of all official DDB regulations.",
        icon: "Archive",
        end_point: "Providers/ddb/policy-secretariat/BoardResolutions.svelte",
        end_point_type: "table,document_hub",
      }
    ]
  },

  // SECTION 2: Regulatory & Compliance Directorate
  {
    fs_path: "regulatory-compliance",
    title: "Regulatory & Compliance Directorate",
    navTitle: "Regulatory",
    description: "Oversee the legal and compliant use of controlled substances and precursors by industries.",
    icon: "Building",
    end_point: "Providers/ddb/regulatory-compliance/+page.svelte",
    end_point_type: "dashboard,summary",
    children: [
      {
        fs_path: "licensing-portal",
        title: "Industry Licensing Portal",
        navTitle: "Licensing",
        description: "Online portal for pharmaceutical/chemical companies to manage licenses and permits.",
        icon: "FileBadge",
        end_point: "Providers/ddb/regulatory-compliance/LicensingPortal.svelte",
        end_point_type: "profile,form,table,tracker",
      },
      {
        fs_path: "diversion-control-analytics",
        title: "Diversion Control Analytics",
        navTitle: "Diversion Control",
        description: "AI-powered system to detect anomalies in reported transactions that may indicate diversion to illicit markets.",
        icon: "ShieldAlert",
        end_point: "Providers/ddb/regulatory-compliance/DiversionControlAnalytics.svelte",
        end_point_type: "analytics,dashboard,report",
      }
    ]
  },

  // SECTION 3: Research & Information Directorate
  {
    fs_path: "research-information",
    title: "Research & Information Directorate",
    navTitle: "Research",
    description: "The national nexus for evidence-based research, data analytics, and public information campaigns.",
    icon: "FlaskConical",
    end_point: "Providers/ddb/research-information/+page.svelte",
    end_point_type: "dashboard,info",
    children: [
      {
        fs_path: "ndis",
        title: "National Drug Information System (NDIS)",
        navTitle: "NDIS",
        description: "The nation's authoritative data warehouse, fusing data from PDEA, PNP, DOH, BOC, and more.",
        icon: "DatabaseZap",
        end_point: "Providers/ddb/research-information/ndis/+page.svelte",
        end_point_type: "dashboard,analytics,map,report",
        children: [
            {
                fs_path: "enforcement-data-mart",
                title: "Law Enforcement Data Mart",
                navTitle: "Enforcement Data",
                description: "Fused data from PDEA, PNP, NBI on arrests, seizures, and drug prices.",
                icon: "Gavel",
                end_point: "Providers/ddb/research-information/ndis/EnforcementDataMart.svelte",
                end_point_type: "dashboard,map,analytics",
            },
            {
                fs_path: "health-data-mart",
                title: "Public Health Data Mart",
                navTitle: "Health Data",
                description: "Fused data from DOH, DSWD on treatment, rehabilitation, and drug-related cases.",
                icon: "HeartPulse",
                end_point: "Providers/ddb/research-information/ndis/HealthDataMart.svelte",
                end_point_type: "dashboard,map,analytics",
            },
        ]
      },
      {
        fs_path: "public-awareness-campaigns",
        title: "Public Awareness Campaign Mgt.",
        navTitle: "Campaigns",
        description: "Plan, manage, and measure the reach and impact of national drug prevention campaigns.",
        icon: "Megaphone",
        end_point: "Providers/ddb/research-information/Campaigns.svelte",
        end_point_type: "dashboard,calendar,analytics",
      }
    ]
  },

  // SECTION 4: Treatment & Rehabilitation Oversight
  {
    fs_path: "treatment-rehab",
    title: "Treatment & Rehabilitation Oversight",
    navTitle: "Rehab",
    description: "Set standards, accredit facilities, and monitor the effectiveness of national drug treatment programs.",
    icon: "Stethoscope",
    end_point: "Providers/ddb/treatment-rehab/+page.svelte",
    end_point_type: "dashboard,map",
    children: [
      {
        fs_path: "accreditation-system",
        title: "Facility Accreditation System",
        navTitle: "Accreditation",
        description: "Manage the accreditation lifecycle of all public and private Treatment and Rehab Centers (TRCs).",
        icon: "BadgeCheck",
        end_point: "Providers/ddb/treatment-rehab/Accreditation.svelte",
        end_point_type: "table,form,checklist,tracker",
      },
      {
        fs_path: "cbrp-monitor",
        title: "Community-Based Rehab Programs",
        navTitle: "CBRP",
        description: "Monitor and support LGU-led community rehabilitation programs nationwide.",
        icon: "MapPin",
        end_point: "Providers/ddb/treatment-rehab/cbrp-monitor/+page.svelte",
        end_point_type: "map,dashboard,report",
        children: [
            {
                fs_path: "lgu-performance",
                title: "LGU Performance Dashboard",
                navTitle: "LGU Performance",
                description: "Track the outcomes and effectiveness of each LGU's program.",
                icon: "BarChartBig",
                end_point: "Providers/ddb/treatment-rehab/cbrp-monitor/LguPerformance.svelte",
                end_point_type: "dashboard,table,report",
            },
            {
                fs_path: "best-practices",
                title: "Best Practices & Resources",
                navTitle: "Resources",
                description: "A hub of training materials and guidelines for LGU operators.",
                icon: "BookOpen",
                end_point: "Providers/ddb/treatment-rehab/cbrp-monitor/BestPractices.svelte",
                end_point_type: "document_hub,info",
            }
        ]
      }
    ]
  },

  // SECTION 5: International Relations & Diplomacy
  {
      fs_path: "international-relations",
      title: "International Relations & Diplomacy",
      navTitle: "Int'l Relations",
      description: "Manage diplomatic relations and ensure compliance with international drug control conventions.",
      icon: "Globe",
      end_point: "Providers/ddb/international-relations/+page.svelte",
      end_point_type: "dashboard,map",
      children: [
        {
          fs_path: "treaty-compliance",
          title: "International Treaty Compliance",
          navTitle: "Treaties",
          description: "Monitor and report on the Philippines' commitments to UN and ASEAN drug control conventions.",
          icon: "Landmark",
          end_point: "Providers/ddb/international-relations/TreatyCompliance.svelte",
          end_point_type: "checklist,document_hub,report",
        },
        {
          fs_path: "foreign-partnerships",
          title: "Foreign Partnerships & Engagements",
          navTitle: "Partnerships",
          description: "Dashboard tracking collaborations with UNODC, ASEAN-NARCO, INCB, and other foreign partners.",
          icon: "Handshake",
          end_point: "Providers/ddb/international-relations/ForeignPartnerships.svelte",
          end_point_type: "dashboard,calendar,profile",
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
    end_point: "Providers/ddb/directory/+page.svelte",
    end_point_type: "dashboard,summary",
    children: [
      {
        fs_path: "office-locations",
        title: "Office Locations",
        navTitle: "Locations",
        description: "Interactive map and list of all DDB offices.",
        icon: "MapPinned",
        end_point: "Providers/ddb/directory/OfficeLocations.svelte",
        end_point_type: "map,table",
      },
      {
        fs_path: "board-members",
        title: "The Board Members Directory",
        navTitle: "The Board",
        description: "Directory of the DDB Chairman, permanent and regular board members.",
        icon: "Users2",
        end_point: "Providers/ddb/directory/BoardMembers.svelte",
        end_point_type: "profile,table",
      },
      {
        fs_path: "citizens-charter",
        title: "Citizen's Charter",
        navTitle: "Charter",
        description: "Service standards for industry licensing, research requests, and other public services.",
        icon: "ShieldCheck",
        end_point: "Providers/ddb/directory/CitizensCharter.svelte",
        end_point_type: "document_hub,report",
      }
    ]
  }
];