import type { Route } from './project_Config';

/**
 * @description The definitive configuration for the LGU Digital Services Portal.
 * This version incorporates all established design principles including a deep hierarchy,
 * a decoupled provider definition, and a consistent filesystem pathing scheme.
 * Refactored: Thursday, September 18, 2025, 12:30 AM, Quezon City
 */
export const config: Route[] = [
  // SECTION 1: Business Permit & Licensing (BPLS)
  {
    fs_path: "business-services",
    title: "Business Services (BPLS)",
    navTitle: "Business",
    description: "Streamlined digital-lookups business registration, renewal, and retirement.",
    icon: "Store",
    provider: '+page.svelte',
    templates: 'dashboard,summary,profile',
    children: [
      {
        fs_path: "apply",
        title: "New Business Application",
        navTitle: "Apply",
        description: "Register a new business through guided digital steps.",
        icon: "FilePlus2",
        provider: 'apply/+page.svelte',
        templates: 'info,checklist',
        children: [
          {
            fs_path: "pre-registration",
            title: "Online Pre-registration",
            navTitle: "Pre-register",
            description: "Fill initial business details and owner info.",
            icon: "ClipboardPen",
            provider: 'apply/PreRegistration.svelte',
            templates: 'form,summary',
          },
          {
            fs_path: "document-checklist",
            title: "Document Checklist",
            navTitle: "Checklist",
            description: "View required documents for your business type.",
            icon: "ListChecks",
            provider: 'apply/DocumentChecklist.svelte',
            templates: 'info,checklist',
          },
          {
            fs_path: "upload-requirements",
            title: "Upload Requirements",
            navTitle: "Upload",
            description: "Securely submit scanned copies of your documents.",
            icon: "UploadCloud",
            provider: 'apply/UploadRequirements.svelte',
            templates: 'upload,form',
          },
          {
            fs_path: "track-status",
            title: "Track Application Status",
            navTitle: "Track Status",
            description: "Monitor real-time progress through city departments.",
            icon: "Activity",
            provider: 'apply/TrackStatus.svelte',
            templates: 'tracker,summary,info',
          },
        ]
      },
      {
        fs_path: "renew",
        title: "Permit Renewal",
        navTitle: "Renew",
        description: "Renew existing business permits online.",
        icon: "RefreshCw",
        provider: 'renew/+page.svelte',
        templates: 'table,profile',
        children: [
          {
            fs_path: "online-form",
            title: "Online Renewal Form",
            navTitle: "Renewal Form",
            description: "Access a pre-filled renewal form using your business profile.",
            icon: "FileSignature",
            provider: 'renew/OnlineForm.svelte',
            templates: 'form,profile',
          },
          {
            fs_path: "upload-financials",
            title: "Upload Financial Statements",
            navTitle: "Upload Financials",
            description: "Submit annual ITR, AFS, and other financial docs.",
            icon: "BookUp",
            provider: 'renew/UploadFinancials.svelte',
            templates: 'upload,form',
          },
          {
            fs_path: "pay-taxes",
            title: "Pay Business Taxes",
            navTitle: "Pay Taxes",
            description: "Settle taxes and fees through a secure gateway.",
            icon: "Landmark",
            provider: 'renew/PayTaxes.svelte',
            templates: 'form,summary,table',
          },
        ]
      },
      {
        fs_path: "retire",
        title: "Business Retirement",
        navTitle: "Retire",
        description: "Process business closure formally.",
        icon: "Archive",
        provider: 'retire/+page.svelte',
        templates: 'info',
        children: [
          {
            fs_path: "file-cessation",
            title: "File for Cessation",
            navTitle: "File",
            description: "Submit the official business retirement application with a guided checklist.",
            icon: "FileX2",
            provider: 'retire/FileCessation.svelte',
            templates: 'form,checklist',
          },
          {
            fs_path: "final-assessment",
            title: "Final Tax Assessment",
            navTitle: "Assessment",
            description: "View and settle final tax obligations via a printable report.",
            icon: "CircleDollarSign",
            provider: 'retire/FinalAssessment.svelte',
            templates: 'report,summary,table',
          },
        ]
      }
    ]
  },

  // SECTION 2: Real Property Tax (RPT)
  {
    fs_path: "real-property-tax",
    title: "Real Property Tax (RPT)",
    navTitle: "Real Property",
    description: "Manage your real property tax payments anytime.",
    icon: "Home",
    provider: '+page.svelte',
    templates: 'dashboard,summary,table',
    children: [
      {
        fs_path: "my-properties",
        title: "My Properties",
        navTitle: "Properties",
        description: "View detailed info about your registered properties.",
        icon: "Building",
        provider: 'my-properties/+page.svelte',
        templates: 'summary,table',
        children: [
          {
            fs_path: "search-property",
            title: "Search & Link Properties",
            navTitle: "Search",
            description: "Find and link properties using your Tax Declaration Number (TDN).",
            icon: "Search",
            provider: 'my-properties/SearchProperty.svelte',
            templates: 'form,table',
          },
          {
            fs_path: "view-assessment",
            title: "View Assessment Details",
            navTitle: "Assessment",
            description: "Check assessed value, classification, and tax history.",
            icon: "FileScan",
            provider: 'my-properties/ViewAssessment.svelte',
            templates: 'report,table,info',
          },
        ]
      },
      {
        fs_path: "online-payment",
        title: "Online Tax Payment",
        navTitle: "Pay Tax",
        description: "Securely pay RPT dues online.",
        icon: "CreditCard",
        provider: 'online-payment/+page.svelte',
        templates: 'info,summary',
        children: [
          {
            fs_path: "generate-soa",
            title: "Generate Statement of Account",
            navTitle: "Get SOA",
            description: "Generate an up-to-date e-SOA for any property.",
            icon: "FileText",
            provider: 'online-payment/GenerateSoa.svelte',
            templates: 'form,report',
          },
          {
            fs_path: "pay-online",
            title: "Pay via Online Channels",
            navTitle: "Pay Online",
            description: "Settle dues using credit/debit cards or e-wallets.",
            icon: "Landmark",
            provider: 'online-payment/PayOnline.svelte',
            templates: 'form,summary,table',
          },
          {
            fs_path: "payment-history",
            title: "View Payment History",
            navTitle: "History",
            description: "Download official e-receipts and transaction history.",
            icon: "History",
            provider: 'online-payment/PaymentHistory.svelte',
            templates: 'table,report',
          },
        ]
      }
    ]
  },

  // SECTION 3: Public Safety & Alerts
  {
    fs_path: "public-safety",
    title: "Public Safety & Alerts",
    navTitle: "Safety",
    description: "Official source for emergency alerts and incident reporting.",
    icon: "Siren",
    provider: '+page.svelte',
    templates: 'dashboard,map,info',
    children: [
      {
        fs_path: "emergency-alerts",
        title: "Emergency Alerts",
        navTitle: "Alerts",
        description: "Get timely updates from the City Command Center (LDRRMO).",
        icon: "Megaphone",
        provider: 'emergency-alerts/+page.svelte',
        templates: 'table,info',
        children: [
            {
                fs_path: "subscribe",
                title: "Subscribe to Alerts",
                navTitle: "Subscribe",
                description: "Manage your free SMS/email notification settings.",
                icon: "MailPlus",
                provider: 'emergency-alerts/Subscribe.svelte',
                templates: 'form,profile',
            },
            {
                fs_path: "hazard-maps",
                title: "View Live Hazard Maps",
                navTitle: "Hazard Maps",
                description: "See real-time maps of affected areas (floods, traffic).",
                icon: "Map",
                provider: 'emergency-alerts/HazardMaps.svelte',
                templates: 'map,info',
            },
            {
                fs_path: "evacuation-centers",
                title: "Evacuation Center Directory",
                navTitle: "Evac Centers",
                description: "Locate designated evacuation centers near you.",
                icon: "MapPinned",
                provider: 'emergency-alerts/EvacuationCenters.svelte',
                templates: 'map,table',
            },
        ]
      },
      {
        fs_path: "incident-report",
        title: "Report an Incident",
        navTitle: "Report",
        description: "Help lookups responders by providing timely, actionable information.",
        icon: "PhoneForwarded",
        provider: 'incident-report/+page.svelte',
        templates: 'info,checklist',
        children: [
            {
                fs_path: "submit-report",
                title: "Submit an Incident Report",
                navTitle: "Submit Report",
                description: "Report floods, fires, or accidents with location and photo uploads.",
                icon: "Send",
                provider: 'incident-report/SubmitReport.svelte',
                templates: 'form,map,upload',
            },
            {
                fs_path: "track-report",
                title: "Track Report Status",
                navTitle: "Track Status",
                description: "Monitor the status of your submitted reports from 'Received' to 'Resolved'.",
                icon: "ClipboardCheck",
                provider: 'incident-report/TrackReport.svelte',
                templates: 'tracker,info',
            },
        ]
      }
    ]
  },

  // SECTION 4: Public Health Services
  {
    fs_path: "health-services",
    title: "Public Health Services",
    navTitle: "Health",
    description: "Connect with local health centers and access your records.",
    icon: "HeartPulse",
    provider: '+page.svelte',
    templates: 'dashboard,profile,summary',
    children: [
      {
        fs_path: "appointments",
        title: "Health Center Appointments",
        navTitle: "Appointments",
        description: "Book, reschedule, or cancel appointments online.",
        icon: "CalendarPlus",
        provider: 'appointments/+page.svelte',
        templates: 'dashboard,calendar',
        children: [
            {
                fs_path: "book-consultation",
                title: "Book a Consultation",
                navTitle: "Book",
                description: "Schedule check-ups, dental, or maternal care with an interactive calendar.",
                icon: "Calendar",
                provider: 'appointments/BookConsultation.svelte',
                templates: 'form,calendar',
            },
            {
                fs_path: "vaccination-schedule",
                title: "Vaccination Schedules",
                navTitle: "Vaccination",
                description: "View immunization schedules and available vaccines.",
                icon: "ShieldCheck",
                provider: 'appointments/VaccinationSchedule.svelte',
                templates: 'table,calendar,info',
            },
        ]
      },
      {
        fs_path: "health-records",
        title: "Personal Health Records",
        navTitle: "Records",
        description: "Securely access your medical and vaccination history.",
        icon: "FolderHeart",
        provider: 'health-records/+page.svelte',
        templates: 'summary,profile',
        children: [
            {
                fs_path: "view-history",
                title: "View Consultation History",
                navTitle: "History",
                description: "See past consultations, diagnoses, and download medical records.",
                icon: "History",
                provider: 'health-records/ViewHistory.svelte',
                templates: 'table,profile,report',
            },
            {
                fs_path: "vaxcert",
                title: "Download VaxCert (PinoyID)",
                navTitle: "VaxCert",
                description: "Generate your official vaccination certificate.",
                icon: "QrCode",
                provider: 'health-records/VaxCert.svelte',
                templates: 'form,report,profile',
            }
        ]
      }
    ]
  },

  // SECTION 5: Social Welfare Services (Corrected)
  {
    fs_path: "social-welfare",
    title: "Social Welfare Services",
    navTitle: "Welfare",
    description: "Apply for social assistance programs and benefits.",
    icon: "Users",
    provider: '+page.svelte',
    templates: 'dashboard,info',
    children: [
        {
            fs_path: "senior-citizen",
            title: "Senior Citizen Affairs",
            navTitle: "Senior",
            description: "Services for registered senior citizens of the city.",
            icon: "PersonStanding",
            provider: 'social-welfare/SeniorCitizen.svelte',
            templates: 'form,profile,info',
        },
        {
            fs_path: "pwd-assistance",
            title: "PWD Assistance",
            navTitle: "PWD",
            description: "Programs and benefits for Persons with Disabilities.",
            icon: "Accessibility",
            provider: 'social-welfare/PwdAssistance.svelte',
            templates: 'form,profile,info',
        },
        {
            fs_path: "solo-parent",
            title: "Solo Parent Program",
            navTitle: "Solo Parent",
            description: "Register and apply for benefits under the Solo Parent Act.",
            icon: "Baby",
            provider: 'social-welfare/SoloParent.svelte',
            templates: 'form,profile,info',
        },
    ]
  },

  // SECTION 6: Directory & Citizen's Charter (Corrected)
  {
    fs_path: "directory",
    title: "Directory & Citizen's Charter",
    navTitle: "Directory",
    description: "Find office locations, contact personnel, and view our service commitments.",
    icon: "BookUser",
    provider: "+page.svelte",
    templates: "dashboard,summary",
    children: [
      {
        fs_path: "office-locations",
        title: "Office Locations",
        navTitle: "Locations",
        description: "Interactive map and list of all city hall departments and satellite offices.",
        icon: "MapPinned",
        provider: "directory/OfficeLocations.svelte",
        templates: "map,table",
      },
      {
        fs_path: "key-officials",
        title: "Key Officials Directory",
        navTitle: "Officials",
        description: "Directory of the Mayor, Vice-Mayor, Councilors, and Department Heads.",
        icon: "Users2",
        provider: "directory/KeyOfficials.svelte",
        templates: "profile,table",
      },
      {
        fs_path: "citizens-charter",
        title: "Citizen's Charter",
        navTitle: "Charter",
        description: "Our service standards, processing times, and feedback mechanisms as per R.A. 11032.",
        icon: "ShieldCheck",
        provider: "directory/CitizensCharter.svelte",
        templates: "document_hub,report",
      }
    ]
  },
];