/*
 * project_Config.ts (ICI)
 * =================================================================
 * Independent Commission for Infrastructure (ICI) - route configuration
 * Centralized definition of navigation, endpoints, and content scaffolding.
 * =================================================================
 */

export interface Route {
  fs_path: string;             // path for filesystem / navigation
  navTitle: string;            // short nav label (literal title for menus)
  icon?: string;               // optional icon (lucide-react)
  provider?: string;           // optional explicit provider path
  templates?: string;          // comma-separated templates
  description?: string;        // optional page intro or section description
  children?: Route[];          // sub-routes
}

export const config: Route[] = [
  // --- SECTION 0: Dashboard ---
  {
    fs_path: "dashboard",
    navTitle: "Dashboard",
    icon: "LayoutDashboard",
    provider: "+page.svelte",
    templates: "dashboard,kpi-deck,activity-feed,map",
    description: "The central hub of the ICI system, providing a live overview of infrastructure monitoring, corruption alerts, and citizen engagement.",
    children: [
      {
        fs_path: "overview",
        navTitle: "Overview",
        icon: "Eye",
        templates: "info,kpi-deck,chart",
        description: "A snapshot of key metrics and summary insights from across the ICI system."
      },
      {
        fs_path: "live-alerts",
        navTitle: "Alerts",
        icon: "Bell",
        templates: "feed,filter,reminder",
        description: "Real-time notifications and alerts regarding infrastructure issues or anomalies."
      }
    ]
  },

  // --- SECTION 1: About ICI ---
  {
    fs_path: "about",
    navTitle: "About",
    icon: "Info",
    templates: "info,accordion",
    description: "Learn about the history, mandate, and leadership structure of the Independent Commission for Infrastructure (ICI).",
    children: [
      {
        fs_path: "history",
        navTitle: "History",
        icon: "BookOpen",
        templates: "article,timeline,info",
        description: "The historical background of ICI, its formation, and objectives.",
        children: [
          {
            fs_path: "formation",
            navTitle: "Formation",
            icon: "Calendar",
            templates: "info,timeline",
            description: "Details on the establishment and legal foundations of ICI."
          },
          {
            fs_path: "background",
            navTitle: "Background",
            icon: "Scroll",
            templates: "article,info",
            description: "Additional context on the purpose and early development of ICI."
          }
        ]
      },
      {
        fs_path: "mandate",
        navTitle: "Mandate",
        icon: "Gavel",
        templates: "info,accordion,checklist",
        description: "An overview of ICI’s legal authority, powers, and scope of investigations.",
        children: [
          {
            fs_path: "investigation-scope",
            navTitle: "Scope",
            icon: "Search",
            templates: "info,accordion",
            description: "Defines the areas and types of projects ICI investigates."
          },
          {
            fs_path: "legal-authority",
            navTitle: "Authority",
            icon: "Scale",
            templates: "info,faq",
            description: "Legal frameworks and mandates enabling ICI’s operations."
          }
        ]
      },
      {
        fs_path: "leadership",
        navTitle: "Leadership",
        icon: "Users",
        templates: "profile,table",
        description: "Profiles of the commissioners, secretariat, and organizational structure.",
        children: [
          {
            fs_path: "commissioners",
            navTitle: "Commissioners",
            icon: "UserCheck",
            templates: "profile,table",
            description: "Information on current commissioners and advisers."
          },
          {
            fs_path: "secretariat",
            navTitle: "Secretariat",
            icon: "ClipboardList",
            templates: "profile,info",
            description: "Supporting staff and the secretariat team."
          }
        ]
      }
    ]
  },

  // --- SECTION 2: Corruption Findings ---
  {
    fs_path: "corruption-findings",
    navTitle: "Findings",
    icon: "AlertTriangle",
    templates: "dashboard,kpi-deck,bar-chart,line-chart,pie-chart",
    description: "Access dashboards and detailed reports on corruption findings and anomalies in infrastructure projects.",
    children: [
      {
        fs_path: "fund-misuse",
        navTitle: "Fund Misuse",
        icon: "Landmark",
        templates: "table,filter,download",
        description: "Alerts and records concerning misuse of public funds."
      },
      {
        fs_path: "procurement-issues",
        navTitle: "Procurement",
        icon: "FileText",
        templates: "table,chart,filter",
        description: "Reports on irregularities in procurement processes."
      },
      {
        fs_path: "project-delays",
        navTitle: "Delays",
        icon: "Clock",
        templates: "table,line-chart,timeline",
        description: "Tracking project delays, cost overruns, and impact analysis."
      }
    ]
  },

  // --- SECTION 3: Citizens Soundboard ---
  {
    fs_path: "soundboard",
    navTitle: "Soundboard",
    icon: "MessageSquare",
    templates: "form,table,chat,faq",
    description: "A platform for citizen engagement, feedback, and whistleblowing.",
    children: [
      {
        fs_path: "public-feedback",
        navTitle: "Feedback",
        icon: "MessageCircle",
        templates: "form,table,search",
        description: "Submit and review public feedback on ongoing projects."
      },
      {
        fs_path: "whistleblower-reports",
        navTitle: "Whistleblowers",
        icon: "ShieldAlert",
        templates: "form,upload,faq",
        description: "Secure reporting for whistleblowers to flag irregularities."
      }
    ]
  },

  // --- SECTION 4: Agencies Investigated ---
  {
    fs_path: "agencies",
    navTitle: "Agencies",
    icon: "Building2",
    templates: "list,table,accordion",
    description: "Browse the agencies investigated and their related projects.",
    children: [
      { fs_path: "dpwh", navTitle: "DPWH", icon: "Hammer", templates: "profile,table,map,download", description: "Department of Public Works & Highways" },
      { fs_path: "dotr", navTitle: "DOTr", icon: "BusFront", templates: "profile,table,map,download", description: "Department of Transportation" },
      { fs_path: "dict", navTitle: "DICT", icon: "Server", templates: "profile,table,report,download", description: "Department of ICT" },
      { fs_path: "psa", navTitle: "PSA", icon: "Database", templates: "profile,table,open-data,download", description: "Philippine Statistics Authority" },
      { fs_path: "doh", navTitle: "DOH", icon: "Hospital", templates: "profile,table,download", description: "Department of Health" }
    ]
  },

  // --- SECTION 5: Investigation Reports & Open Data ---
  {
    fs_path: "investigation-reports",
    navTitle: "Reports",
    icon: "FileText",
    templates: "download,table,search",
    description: "Access all investigation reports, case studies, and open datasets for transparency.",
    children: [
      { fs_path: "annual-reports", navTitle: "Annual", icon: "Calendar", templates: "table,download", description: "Annual & thematic reports." },
      { fs_path: "case-studies", navTitle: "Case Studies", icon: "FileSearch", templates: "info,download,table", description: "In-depth case studies and investigations." },
      { fs_path: "open-data", navTitle: "Open Data", icon: "Database", templates: "download,table,search", description: "Datasets and open access files." }
    ]
  }
];
