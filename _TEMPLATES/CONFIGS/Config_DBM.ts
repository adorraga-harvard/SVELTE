import type { Route } from './project_Config';

/**
 * Configuration for the Department of Budget and Management (DBM) Module
 * Aligned with the Philippine Public Financial Management (PFM) Cycle for LGUs.
 */
export const config: Route[] = [
  // SECTION 1: Budget Preparation
  {
    fs_path: "budget-preparation",
    title: "Budget Preparation",
    navTitle: "Preparation",
    description: "Manage the annual budget formulation, from proposal to enactment.",
    icon: "ClipboardEdit", // Icon representing planning and writing
    children: [
      {
        fs_path: "budget-call",
        title: "Budget Call & Calendar",
        navTitle: "Call",
        description: "Official circulars, timelines, and guidelines for budget submission.",
        icon: "CalendarDays",
        end_point: "Providers/dbm/preparation/BudgetCall.svelte",
        end_point_type: "document_hub,calendar"
      },
      {
        fs_path: "agency-proposals",
        title: "Department Budget Proposals",
        navTitle: "Proposals",
        description: "Submission and review of budget proposals from city departments.",
        icon: "Building",
        end_point: "Providers/dbm/preparation/AgencyProposals.svelte",
        end_point_type: "form,dashboard,tracker"
      },
      {
        fs_path: "pap-management",
        title: "Program/Activity/Project Mgt.",
        navTitle: "PAPs",
        description: "Define and link budget items to specific Programs, Activities, and Projects (PAPs).",
        icon: "Diagram",
        end_point: "Providers/dbm/preparation/PapManagement.svelte",
        end_point_type: "form,dashboard"
      },
      {
        fs_path: "budget-hearings",
        title: "Budget Hearings Consolidation",
        navTitle: "Hearings",
        description: "Consolidate inputs and adjustments from technical budget hearings.",
        icon: "Users",
        end_point: "Providers/dbm/preparation/BudgetHearings.svelte",
        end_point_type: "dashboard,report"
      },
      {
        fs_path: "local-budget-preparation",
        title: "Local Budget Preparation Forms",
        navTitle: "LBP Forms",
        description: "Generate mandatory LBP Forms (e.g., LBP Form No. 1, 2, 3).",
        icon: "FileText",
        end_point: "Providers/dbm/preparation/LbpForms.svelte",
        end_point_type: "report,form"
      },
      {
        fs_path: "appropriation-ordinance",
        title: "Appropriation Ordinance",
        navTitle: "Ordinance",
        description: "Track the enactment of the budget by the Sanggunian Panlungsod.",
        icon: "Landmark",
        end_point: "Providers/dbm/preparation/AppropriationOrdinance.svelte",
        end_point_type: "tracker,document_hub"
      }
    ]
  },
  // SECTION 2: Budget Execution
  {
    fs_path: "budget-execution",
    title: "Budget Execution",
    navTitle: "Execution",
    description: "Manage the release, obligation, and disbursement of funds.",
    icon: "Gavel", // Icon representing execution/action
    children: [
      {
        fs_path: "allotment-release",
        title: "Allotment Management",
        navTitle: "Allotments",
        description: "Issue and track Allotment Release Orders (AROs) to city departments.",
        icon: "Send",
        end_point: "Providers/dbm/execution/AllotmentRelease.svelte",
        end_point_type: "form,tracker,report"
      },
      {
        fs_path: "obligation-management",
        title: "Obligation Management",
        navTitle: "Obligations",
        description: "Process and monitor Obligation Request and Status (ORS).",
        icon: "Link",
        end_point: "Providers/dbm/execution/ObligationManagement.svelte",
        end_point_type: "form,dashboard,tracker"
      },
      {
        fs_path: "disbursement",
        title: "Disbursement",
        navTitle: "Disbursement",
        description: "Process Disbursement Vouchers (DVs) and manage payments.",
        icon: "CreditCard",
        end_point: "Providers/dbm/execution/Disbursement.svelte",
        end_point_type: "form,tracker"
      },
      {
        fs_path: "cash-position",
        title: "Cash Position Monitoring",
        navTitle: "Cash",
        description: "Dashboard for real-time City Treasury cash position and forecasts.",
        icon: "Banknote",
        end_point: "Providers/dbm/execution/CashPosition.svelte",
        end_point_type: "dashboard,analytics"
      }
    ]
  },
  // SECTION 3: Budget Accountability
  {
    fs_path: "budget-accountability",
    title: "Budget Accountability",
    navTitle: "Accountability",
    description: "Monitor, report, and audit budget performance and compliance.",
    icon: "ShieldCheck",
    children: [
      {
        fs_path: "bfars",
        title: "Budget & Financial Reports (BFARs)",
        navTitle: "BFARs",
        description: "Generate mandatory accountability reports for DBM and COA.",
        icon: "FilePieChart",
        end_point: "Providers/dbm/accountability/Bfars.svelte",
        end_point_type: "report,dashboard"
      },
      {
        fs_path: "saaodb",
        title: "Statement of Appropriations (SAAODB)",
        navTitle: "SAAODB",
        description: "Generate the Statement of Appropriations, Allotments, Obligations, Disbursements and Balances.",
        icon: "FileBarChart2",
        end_point: "Providers/dbm/accountability/Saaodb.svelte",
        end_point_type: "report"
      },
      {
        fs_path: "performance-monitoring",
        title: "Performance Monitoring",
        navTitle: "Performance",
        description: "Track physical accomplishments against financial disbursements for key PAPs.",
        icon: "TrendingUp",
        end_point: "Providers/dbm/accountability/PerformanceMonitoring.svelte",
        end_point_type: "dashboard,analytics"
      },
      {
        fs_path: "audit-trail",
        title: "Audit Trail",
        navTitle: "Audit",
        description: "Review logs of all financial transactions and approvals.",
        icon: "History",
        end_point: "Providers/dbm/accountability/AuditTrail.svelte",
        end_point_type: "tracker,report"
      }
    ]
  },
  // SECTION 4: Master Data and Settings
  {
    fs_path: "master-data",
    title: "Master Data & Settings",
    navTitle: "Settings",
    description: "Configure core data, workflows, and system parameters.",
    icon: "Settings",
    children: [
      {
        fs_path: "chart-of-accounts",
        title: "Chart of Accounts",
        navTitle: "Accounts",
        description: "Manage the Unified Accounts Code Structure (UACS) for the LGU.",
        icon: "BookKey",
        end_point: "Providers/dbm/masterdata/ChartOfAccounts.svelte",
        end_point_type: "form,dashboard"
      },
      {
        fs_path: "departments-offices",
        title: "Departments & Offices",
        navTitle: "Offices",
        description: "Manage the list of city departments, offices, and cost centers.",
        icon: "Building2",
        end_point: "Providers/dbm/masterdata/Departments.svelte",
        end_point_type: "form"
      },
      {
        fs_path: "approval-workflows",
        title: "Approval Workflows",
        navTitle: "Workflows",
        description: "Configure signatories and multi-level approval steps for documents.",
        icon: "Workflow",
        end_point: "Providers/dbm/masterdata/ApprovalWorkflows.svelte",
        end_point_type: "settings"
      },
      {
        fs_path: "user-roles",
        title: "User Role Management",
        navTitle: "Users",
        description: "Manage user access and permissions within the budgeting system.",
        icon: "UsersCog",
        end_point: "Providers/dbm/masterdata/UserRoles.svelte",
        end_point_type: "settings,form"
      }
    ]
  }
];