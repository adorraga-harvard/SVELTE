/*
 * project_Config.ts
 * =================================================================
 * The definitive and comprehensive route configuration for the LGU Portal.
 * Strictly follows the rule that every node with children
 * must have at least two children (siblings).
 *
 * Enhanced: Friday, September 19, 2025, 3:45 PM, Quezon City
 * =================================================================
 */

import type { Route } from './project_Config.js';

export const config: Route[] = [
  // --- SECTION 1: Dashboard & Profile ---
  {
    fs_path: "dashboard",
    title: "LGU Portal Dashboard",
    navTitle: "Dashboard",
    icon: "LayoutDashboard",
    provider: "+page.svelte",
    templates: "dashboard,kpi-deck,activity-feed",
    children: [
      {
        fs_path: "my-profile",
        title: "My Profile",
        navTitle: "My Profile",
        icon: "UserCircle2",
        provider: "MyProfile.svelte",
        templates: "profile,form,table",
        children: [
          {
            fs_path: "account-settings",
            title: "Account Settings",
            navTitle: "Account Settings",
            icon: "Settings2",
            provider: "AccountSettings.svelte",
            templates: "form,accordion",
            children: [
              { fs_path: "edit-profile", title: "Edit Personal Information", navTitle: "Edit Profile", icon: "PenSquare", provider: "EditProfile.svelte", templates: "form" },
              { fs_path: "change-password", title: "Change Password", navTitle: "Change Password", icon: "KeyRound", provider: "ChangePassword.svelte", templates: "form" },
            ]
          },
          {
            fs_path: "activity-log",
            title: "My Activity Log",
            navTitle: "Activity Log",
            icon: "History",
            provider: "ActivityLog.svelte",
            templates: "activity-feed,search,table",
          }
        ]
      },
      {
        fs_path: "notifications",
        title: "Notifications",
        navTitle: "Notifications",
        icon: "Bell",
        provider: "Notifications.svelte",
        templates: "table,toggle-view",
      }
    ]
  },

  // --- SECTION 2: Business & Treasury ---
  {
    fs_path: "business-treasury",
    title: "Business & Treasury",
    navTitle: "Business",
    icon: "Store",
    provider: '+page.svelte',
    templates: 'kpi-deck,table,info',
    children: [
      {
        fs_path: "bpls",
        title: "Business Permit & Licensing",
        navTitle: "Business Permits (BPLS)",
        icon: "FileText",
        provider: "BplsIndex.svelte",
        templates: "info,table,checklist",
        children: [
          {
            fs_path: "new-application",
            title: "New Business Application",
            navTitle: "New Application",
            icon: "FilePlus2",
            provider: "NewApplicationIndex.svelte",
            templates: "checklist,info,form",
            children: [
              { fs_path: "step-1-details", title: "Step 1: Business Details", navTitle: "Step 1: Details", icon: "ClipboardPen", provider: "Step1Details.svelte", templates: "form" },
              { fs_path: "step-2-documents", title: "Step 2: Upload Documents", navTitle: "Step 2: Documents", icon: "UploadCloud", provider: "Step2Documents.svelte", templates: "upload,form" },
              { fs_path: "step-3-payment", title: "Step 3: Assessment & Payment", navTitle: "Step 3: Payment", icon: "Landmark", provider: "Step3Payment.svelte", templates: "form,receipt" },
            ]
          },
          {
            fs_path: "renew-permit",
            title: "Renew Business Permit",
            navTitle: "Renew Permit",
            icon: "RefreshCw",
            provider: "RenewPermit.svelte",
            templates: "table,form,receipt",
          }
        ]
      },
      {
        fs_path: "rpt",
        title: "Real Property Tax",
        navTitle: "Real Property Tax (RPT)",
        icon: "Home",
        provider: "RptIndex.svelte",
        templates: "info,form,receipt,calendar",
      }
    ]
  },

  // --- SECTION 3: Public Safety & Crisis Response ---
  {
    fs_path: "public-safety",
    title: "Public Safety & Crisis Response",
    navTitle: "Safety",
    icon: "Siren",
    provider: "+page.svelte",
    templates: "dashboard,map,activity-feed",
    children: [
      {
        fs_path: "emergency-alerts",
        title: "Emergency Alerts",
        navTitle: "Emergency Alerts",
        icon: "BellRing",
        provider: "Alerts.svelte",
        templates: "table,feed,search",
      },
      {
        fs_path: "incident-reporting",
        title: "Incident Reporting",
        navTitle: "Report an Incident",
        icon: "Megaphone",
        provider: "IncidentReportingIndex.svelte",
        templates: "info,table,form",
        children: [
          {
            fs_path: "submit-new",
            title: "Submit a New Report",
            navTitle: "Submit New Report",
            icon: "Send",
            provider: "SubmitNewIndex.svelte",
            templates: "form,map,upload",
            children: [
              { fs_path: "fire-incident", title: "Report Fire Incident", navTitle: "Fire Incident", icon: "Flame", provider: "FireIncident.svelte", templates: "form,map" },
              { fs_path: "medical-emergency", title: "Report Medical Emergency", navTitle: "Medical Emergency", icon: "Ambulance", provider: "MedicalEmergency.svelte", templates: "form,map" },
            ]
          },
          {
            fs_path: "track-reports",
            title: "Track My Reports",
            navTitle: "Track My Reports",
            icon: "History",
            provider: "TrackReports.svelte",
            templates: "table,timeline",
          }
        ]
      }
    ]
  },

  // --- SECTION 4: Health & Social Welfare ---
  {
    fs_path: "health-welfare",
    title: "Health & Social Welfare",
    navTitle: "Health",
    icon: "HeartPulse",
    provider: "+page.svelte",
    templates: "kpi-deck,activity-feed,calendar",
    children: [
      {
        fs_path: "health-services",
        title: "City Health Services",
        navTitle: "Health Services",
        icon: "Stethoscope",
        provider: "HealthServicesIndex.svelte",
        templates: "info,table,form",
        children: [
          {
            fs_path: "my-health-records",
            title: "My Health Records",
            navTitle: "My Health Records",
            icon: "FolderHeart",
            provider: "HealthRecords.svelte",
            templates: "profile,table,form",
            children: [
              { fs_path: "view-history", title: "Consultation History", navTitle: "History", icon: "History", provider: "ViewHistory.svelte", templates: "table,timeline" },
              { fs_path: "download-vaxcert", title: "Download VaxCert", navTitle: "VaxCert", icon: "QrCode", provider: "DownloadVaxCert.svelte", templates: "form,download" },
            ]
          },
          {
            fs_path: "book-appointment",
            title: "Book an Appointment",
            navTitle: "Book Appointment",
            icon: "CalendarPlus",
            provider: "BookAppointment.svelte",
            templates: "calendar,form,reminder",
          }
        ]
      },
      {
        fs_path: "social-welfare",
        title: "Social Welfare Programs",
        navTitle: "Social Welfare",
        icon: "Users",
        provider: "SocialWelfareIndex.svelte",
        templates: "info,accordion,table",
      }
    ]
  },

  // --- SECTION 5: City Planning & Engineering ---
  {
    fs_path: "planning-engineering",
    title: "City Planning & Engineering",
    navTitle: "Planning",
    icon: "Construction",
    provider: "+page.svelte",
    templates: "kpi-deck,map,table",
    children: [
      {
        fs_path: "building-permits",
        title: "Building & Construction Permits",
        navTitle: "Building Permits",
        icon: "Building",
        provider: "BuildingPermitsIndex.svelte",
        templates: "info,table,checklist",
        children: [
          {
            fs_path: "apply",
            title: "Apply for Permit",
            navTitle: "Apply",
            icon: "ClipboardCheck",
            provider: "ApplyPermit.svelte",
            templates: "checklist,info,form",
            children: [
              { fs_path: "residential", title: "Residential Permit", navTitle: "Residential", icon: "Home", provider: "Residential.svelte", templates: "form,upload" },
              { fs_path: "commercial", title: "Commercial Permit", navTitle: "Commercial", icon: "Building2", provider: "Commercial.svelte", templates: "form,upload" },
            ]
          },
          {
            fs_path: "check-status",
            title: "Check Application Status",
            navTitle: "Check Status",
            icon: "Activity",
            provider: "CheckStatus.svelte",
            templates: "form,search,timeline",
          }
        ]
      },
      {
        fs_path: "zoning",
        title: "Zoning Information",
        navTitle: "Zoning",
        icon: "Map",
        provider: "Zoning.svelte",
        templates: "map,info,search",
      }
    ]
  },

  // --- SECTION 6: Citizen Services & Ugnayan ---
  {
    fs_path: "citizen-services",
    title: "Citizen Services & Ugnayan",
    navTitle: "Services",
    icon: "Users",
    provider: "+page.svelte",
    templates: "info,search,accordion,form",
    children: [
      {
        fs_path: "civil-registry",
        title: "Civil Registry",
        navTitle: "Civil Registry",
        icon: "BookUser",
        provider: "CivilRegistryIndex.svelte",
        templates: "info,form,calendar",
        children: [
          {
            fs_path: "request-document",
            title: "Request a Document",
            navTitle: "Request Document",
            icon: "FileBadge",
            provider: "RequestDocument.svelte",
            templates: "info,form,download",
            children: [
              { fs_path: "birth-certificate", title: "Birth Certificate", navTitle: "Birth Certificate", icon: "Baby", provider: "BirthCertificate.svelte", templates: "form,receipt" },
              { fs_path: "marriage-certificate", title: "Marriage Certificate", navTitle: "Marriage Certificate", icon: "HeartHandshake", provider: "MarriageCertificate.svelte", templates: "form,receipt" },
            ]
          },
          {
            fs_path: "schedule-appointment",
            title: "Schedule an Appointment",
            navTitle: "Schedule Appointment",
            icon: "CalendarPlus",
            provider: "ScheduleAppointment.svelte",
            templates: "calendar,form,reminder",
          }
        ]
      },
      {
        fs_path: "barangay-services",
        title: "Barangay Services",
        navTitle: "Barangay",
        icon: "Building",
        provider: "BarangayServicesIndex.svelte",
        templates: "accordion,form,table",
        children: [
          { fs_path: "barangay-clearance", title: "Barangay Clearance", navTitle: "Clearance", icon: "ClipboardCheck", provider: "BarangayClearance.svelte", templates: "form,receipt" },
          { fs_path: "barangay-id", title: "Barangay ID", navTitle: "Barangay ID", icon: "IdCard", provider: "BarangayID.svelte", templates: "form,upload" },
        ]
      },
      {
        fs_path: "ugnayan-feedback",
        title: "Ugnayan Feedback Portal",
        navTitle: "Ugnayan Feedback",
        icon: "MessageSquareQuote",
        provider: "Ugnayan.svelte",
        templates: "form,activity-feed,table",
      }
    ]
  },

  // --- SECTION 7: Transparency & Governance ---
  {
    fs_path: "transparency-governance",
    title: "Transparency & Governance",
    navTitle: "Transparency",
    icon: "Scale",
    provider: "+page.svelte",
    templates: "kpi-deck,toggle-view,table",
    children: [
      {
        fs_path: "public-bids",
        title: "Public Bids & Awards",
        navTitle: "Bids & Awards",
        icon: "Gavel",
        provider: "PublicBidsIndex.svelte",
        templates: "info,table,search",
        children: [
          {
            fs_path: "active-bids",
            title: "View Active Bids",
            navTitle: "Active Bids",
            icon: "BellRing",
            provider: "ActiveBidsIndex.svelte",
            templates: "table,filter",
            children: [
              { fs_path: "infrastructure", title: "Infrastructure Projects", navTitle: "Infrastructure", icon: "Building2", provider: "InfrastructureProjects.svelte", templates: "table,map" },
              { fs_path: "goods-services", title: "Goods & Services", navTitle: "Goods & Services", icon: "ShoppingCart", provider: "GoodsServices.svelte", templates: "table" },
            ]
          },
          {
            fs_path: "awarded-contracts",
            title: "Awarded Contracts",
            navTitle: "Awarded Contracts",
            icon: "Award",
            provider: "AwardedContracts.svelte",
            templates: "table,download",
          }
        ]
      },
      {
        fs_path: "city-ordinances",
        title: "City Ordinances",
        navTitle: "Ordinances",
        icon: "BookOpen",
        provider: "Ordinances.svelte",
        templates: "search,table,download",
      },
      {
        fs_path: "open-data",
        title: "Open Data Portal",
        navTitle: "Open Data",
        icon: "Database",
        provider: "OpenDataIndex.svelte",
        templates: "search,table,download",
      }
    ]
  },

  // --- SECTION 8: Education & Youth ---
  {
    fs_path: "education-youth",
    title: "Education & Youth Development",
    navTitle: "Education",
    icon: "GraduationCap",
    provider: "+page.svelte",
    templates: "info,table,calendar",
    children: [
      {
        fs_path: "scholarships",
        title: "Scholarship Programs",
        navTitle: "Scholarships",
        icon: "School",
        provider: "Scholarships.svelte",
        templates: "form,table,download",
      },
      {
        fs_path: "youth-council",
        title: "Youth Council (SK)",
        navTitle: "Youth Council",
        icon: "UsersRound",
        provider: "YouthCouncil.svelte",
        templates: "info,calendar,activity-feed",
      }
    ]
  },

  // --- SECTION 9: Environment & Sustainability ---
  {
    fs_path: "environment",
    title: "Environment & Sustainability",
    navTitle: "Environment",
    icon: "Leaf",
    provider: "+page.svelte",
    templates: "kpi-deck,map,table",
    children: [
      {
        fs_path: "waste-management",
        title: "Waste Management",
        navTitle: "Waste Mgmt",
        icon: "Trash2",
        provider: "WasteManagement.svelte",
        templates: "table,info,checklist",
      },
      {
        fs_path: "green-projects",
        title: "Green Projects",
        navTitle: "Green Projects",
        icon: "Trees",
        provider: "GreenProjects.svelte",
        templates: "info,table,map",
      }
    ]
  },

  // --- SECTION 10: Knowledge Base & Help ---
  {
    fs_path: "knowledge-base",
    title: "Help & Knowledge Base",
    navTitle: "Help",
    icon: "HelpCircle",
    provider: "+page.svelte",
    templates: "faq,accordion,search",
    children: [
      {
        fs_path: "faqs",
        title: "Frequently Asked Questions",
        navTitle: "FAQs",
        icon: "CircleHelp",
        provider: "Faqs.svelte",
        templates: "accordion,search",
      },
      {
        fs_path: "downloads",
        title: "Downloadable Forms & Guides",
        navTitle: "Downloads",
        icon: "FileDown",
        provider: "Downloads.svelte",
        templates: "download,table,search",
      }
    ]
  }
];
