import type { Route } from './project_Config';

/**
 * @file Config_LGU.ts
 * @description The definitive configuration for the LGU Digital Services Portal.
 * This version incorporates all established design principles including a deep hierarchy,
 * branch node endpoints, a standard directory fixture, and no single-child nodes.
 */
export const config: Route[] = [
  // SECTION 1: Business Permit & Licensing (BPLS)
  {
    fs_path: "business-services",
    title: "Business Services (BPLS)",
    navTitle: "Business",
    description: "Streamlined digital-lookups business registration, renewal, and retirement.",
    icon: "Store",
    end_point: 'Providers/lgu/business-services/+page.svelte',
    end_point_type: 'dashboard,summary,profile',
    children: [
      {
        fs_path: "apply",
        title: "New Business Application",
        navTitle: "Apply",
        description: "Register a new business through guided digital steps.",
        icon: "FilePlus2",
        end_point: 'Providers/lgu/business-services/apply/+page.svelte',
        end_point_type: 'info,checklist',
        children: [
          {
            fs_path: "pre-registration",
            title: "Online Pre-registration",
            navTitle: "Pre-register",
            description: "Fill initial business details and owner info.",
            icon: "ClipboardPen",
            end_point: 'Providers/lgu/business-services/apply/PreRegistration.svelte',
            end_point_type: 'form,summary',
          },
          {
            fs_path: "document-checklist",
            title: "Document Checklist",
            navTitle: "Checklist",
            description: "View required documents for your business type.",
            icon: "ListChecks",
            end_point: 'Providers/lgu/business-services/apply/DocumentChecklist.svelte',
            end_point_type: 'info,checklist',
          },
          {
            fs_path: "upload-requirements",
            title: "Upload Requirements",
            navTitle: "Upload",
            description: "Securely submit scanned copies of your documents.",
            icon: "UploadCloud",
            end_point: 'Providers/lgu/business-services/apply/UploadRequirements.svelte',
            end_point_type: 'upload,form',
          },
          {
            fs_path: "track-status",
            title: "Track Application Status",
            navTitle: "Track Status",
            description: "Monitor real-time progress through city departments.",
            icon: "Activity",
            end_point: 'Providers/lgu/business-services/apply/TrackStatus.svelte',
            end_point_type: 'tracker,summary,info',
          },
        ]
      },
      {
        fs_path: "renew",
        title: "Permit Renewal",
        navTitle: "Renew",
        description: "Renew existing business permits online.",
        icon: "RefreshCw",
        end_point: 'Providers/lgu/business-services/renew/+page.svelte',
        end_point_type: 'table,profile',
        children: [
          {
            fs_path: "online-form",
            title: "Online Renewal Form",
            navTitle: "Renewal Form",
            description: "Access a pre-filled renewal form using your business profile.",
            icon: "FileSignature",
            end_point: 'Providers/lgu/business-services/renew/OnlineForm.svelte',
            end_point_type: 'form,profile',
          },
          {
            fs_path: "upload-financials",
            title: "Upload Financial Statements",
            navTitle: "Upload Financials",
            description: "Submit annual ITR, AFS, and other financial docs.",
            icon: "BookUp",
            end_point: 'Providers/lgu/business-services/renew/UploadFinancials.svelte',
            end_point_type: 'upload,form',
          },
          {
            fs_path: "pay-taxes",
            title: "Pay Business Taxes",
            navTitle: "Pay Taxes",
            description: "Settle taxes and fees through a secure gateway.",
            icon: "Landmark",
            end_point: 'Providers/lgu/business-services/renew/PayTaxes.svelte',
            end_point_type: 'form,summary,table',
          },
        ]
      },
      {
        fs_path: "retire",
        title: "Business Retirement",
        navTitle: "Retire",
        description: "Process business closure formally.",
        icon: "Archive",
        end_point: 'Providers/lgu/business-services/retire/+page.svelte',
        end_point_type: 'info',
        children: [
          {
            fs_path: "file-cessation",
            title: "File for Cessation",
            navTitle: "File",
            description: "Submit the official business retirement application with a guided checklist.",
            icon: "FileX2",
            end_point: 'Providers/lgu/business-services/retire/FileCessation.svelte',
            end_point_type: 'form,checklist',
          },
          {
            fs_path: "final-assessment",
            title: "Final Tax Assessment",
            navTitle: "Assessment",
            description: "View and settle final tax obligations via a printable report.",
            icon: "CircleDollarSign",
            end_point: 'Providers/lgu/business-services/retire/FinalAssessment.svelte',
            end_point_type: 'report,summary,table',
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
    end_point: 'Providers/lgu/real-property-tax/+page.svelte',
    end_point_type: 'dashboard,summary,table',
    children: [
      {
        fs_path: "my-properties",
        title: "My Properties",
        navTitle: "Properties",
        description: "View detailed info about your registered properties.",
        icon: "Building",
        end_point: 'Providers/lgu/real-property-tax/my-properties/+page.svelte',
        end_point_type: 'summary,table',
        children: [
          {
            fs_path: "search-property",
            title: "Search & Link Properties",
            navTitle: "Search",
            description: "Find and link properties using your Tax Declaration Number (TDN).",
            icon: "Search",
            end_point: 'Providers/lgu/real-property-tax/my-properties/SearchProperty.svelte',
            end_point_type: 'form,table',
          },
          {
            fs_path: "view-assessment",
            title: "View Assessment Details",
            navTitle: "Assessment",
            description: "Check assessed value, classification, and tax history.",
            icon: "FileScan",
            end_point: 'Providers/lgu/real-property-tax/my-properties/ViewAssessment.svelte',
            end_point_type: 'report,table,info',
          },
        ]
      },
      {
        fs_path: "online-payment",
        title: "Online Tax Payment",
        navTitle: "Pay Tax",
        description: "Securely pay RPT dues online.",
        icon: "CreditCard",
        end_point: 'Providers/lgu/real-property-tax/online-payment/+page.svelte',
        end_point_type: 'info,summary',
        children: [
          {
            fs_path: "generate-soa",
            title: "Generate Statement of Account",
            navTitle: "Get SOA",
            description: "Generate an up-to-date e-SOA for any property.",
            icon: "FileText",
            end_point: 'Providers/lgu/real-property-tax/online-payment/GenerateSoa.svelte',
            end_point_type: 'form,report',
          },
          {
            fs_path: "pay-online",
            title: "Pay via Online Channels",
            navTitle: "Pay Online",
            description: "Settle dues using credit/debit cards or e-wallets.",
            icon: "Landmark",
            end_point: 'Providers/lgu/real-property-tax/online-payment/PayOnline.svelte',
            end_point_type: 'form,summary,table',
          },
          {
            fs_path: "payment-history",
            title: "View Payment History",
            navTitle: "History",
            description: "Download official e-receipts and transaction history.",
            icon: "History",
            end_point: 'Providers/lgu/real-property-tax/online-payment/PaymentHistory.svelte',
            end_point_type: 'table,report',
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
    end_point: 'Providers/lgu/public-safety/+page.svelte',
    end_point_type: 'dashboard,map,info',
    children: [
      {
        fs_path: "emergency-alerts",
        title: "Emergency Alerts",
        navTitle: "Alerts",
        description: "Get timely updates from the City Command Center (LDRRMO).",
        icon: "Megaphone",
        end_point: 'Providers/lgu/public-safety/emergency-alerts/+page.svelte',
        end_point_type: 'table,info',
        children: [
            {
                fs_path: "subscribe",
                title: "Subscribe to Alerts",
                navTitle: "Subscribe",
                description: "Manage your free SMS/email notification settings.",
                icon: "MailPlus",
                end_point: 'Providers/lgu/public-safety/emergency-alerts/Subscribe.svelte',
                end_point_type: 'form,profile',
            },
            {
                fs_path: "hazard-maps",
                title: "View Live Hazard Maps",
                navTitle: "Hazard Maps",
                description: "See real-time maps of affected areas (floods, traffic).",
                icon: "Map",
                end_point: 'Providers/lgu/public-safety/emergency-alerts/HazardMaps.svelte',
                end_point_type: 'map,info',
            },
            {
                fs_path: "evacuation-centers",
                title: "Evacuation Center Directory",
                navTitle: "Evac Centers",
                description: "Locate designated evacuation centers near you.",
                icon: "MapPinned",
                end_point: 'Providers/lgu/public-safety/emergency-alerts/EvacuationCenters.svelte',
                end_point_type: 'map,table',
            },
        ]
      },
      {
        fs_path: "incident-report",
        title: "Report an Incident",
        navTitle: "Report",
        description: "Help lookups responders by providing timely, actionable information.",
        icon: "PhoneForwarded",
        end_point: 'Providers/lgu/public-safety/incident-report/+page.svelte',
        end_point_type: 'info,checklist',
        children: [
            {
                fs_path: "submit-report",
                title: "Submit an Incident Report",
                navTitle: "Submit Report",
                description: "Report floods, fires, or accidents with location and photo uploads.",
                icon: "Send",
                end_point: 'Providers/lgu/public-safety/incident-report/SubmitReport.svelte',
                end_point_type: 'form,map,upload',
            },
            {
                fs_path: "track-report",
                title: "Track Report Status",
                navTitle: "Track Status",
                description: "Monitor the status of your submitted reports from 'Received' to 'Resolved'.",
                icon: "ClipboardCheck",
                end_point: 'Providers/lgu/public-safety/incident-report/TrackReport.svelte',
                end_point_type: 'tracker,info',
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
    end_point: 'Providers/lgu/health-services/+page.svelte',
    end_point_type: 'dashboard,profile,summary',
    children: [
      {
        fs_path: "appointments",
        title: "Health Center Appointments",
        navTitle: "Appointments",
        description: "Book, reschedule, or cancel appointments online.",
        icon: "CalendarPlus",
        end_point: 'Providers/lgu/health-services/appointments/+page.svelte',
        end_point_type: 'dashboard,calendar',
        children: [
            {
                fs_path: "book-consultation",
                title: "Book a Consultation",
                navTitle: "Book",
                description: "Schedule check-ups, dental, or maternal care with an interactive calendar.",
                icon: "Calendar",
                end_point: 'Providers/lgu/health-services/appointments/BookConsultation.svelte',
                end_point_type: 'form,calendar',
            },
            {
                fs_path: "vaccination-schedule",
                title: "Vaccination Schedules",
                navTitle: "Vaccination",
                description: "View immunization schedules and available vaccines.",
                icon: "ShieldCheck",
                end_point: 'Providers/lgu/health-services/appointments/VaccinationSchedule.svelte',
                end_point_type: 'table,calendar,info',
            },
        ]
      },
      {
        fs_path: "health-records",
        title: "Personal Health Records",
        navTitle: "Records",
        description: "Securely access your medical and vaccination history.",
        icon: "FolderHeart",
        end_point: 'Providers/lgu/health-services/health-records/+page.svelte',
        end_point_type: 'summary,profile',
        children: [
            {
                fs_path: "view-history",
                title: "View Consultation History",
                navTitle: "History",
                description: "See past consultations, diagnoses, and download medical records.",
                icon: "History",
                end_point: 'Providers/lgu/health-services/health-records/ViewHistory.svelte',
                end_point_type: 'table,profile,report',
            },
            {
                fs_path: "vaxcert",
                title: "Download VaxCert (PinoyID)",
                navTitle: "VaxCert",
                description: "Generate your official vaccination certificate.",
                icon: "QrCode",
                end_point: 'Providers/lgu/health-services/health-records/VaxCert.svelte',
                end_point_type: 'form,report,profile',
            }
        ]
      }
    ]
  },

  // SECTION 5: Social Welfare Services
  {
    fs_path: "social-welfare",
    title: "Social Welfare Services",
    navTitle: "Welfare",
    description: "Apply for social assistance programs and benefits.",
    icon: "Users",
    end_point: 'Providers/lgu/social-welfare/+page.svelte',
    end_point_type: 'dashboard,info',
    children: [
        {
            fs_path: "senior-citizen",
            title: "Senior Citizen Affairs",
            navTitle: "Senior",
            description: "Services for registered senior citizens of the city.",
            icon: "PersonStanding",
            end_point: 'Providers/lgu/social-welfare/SeniorCitizen.svelte',
            end_point_type: 'form,profile,info',
        },
        {
            fs_path: "pwd-assistance",
            title: "PWD Assistance",
            navTitle: "PWD",
            description: "Programs and benefits for Persons with Disabilities.",
            icon: "Accessibility",
            end_point: 'Providers/lgu/social-welfare/PwdAssistance.svelte',
            end_point_type: 'form,profile,info',
        },
        {
            fs_path: "solo-parent",
            title: "Solo Parent Program",
            navTitle: "Solo Parent",
            description: "Register and apply for benefits under the Solo Parent Act.",
            icon: "Baby",
            end_point: 'Providers/lgu/social-welfare/SoloParent.svelte',
            end_point_type: 'form,profile,info',
        },
    ]
  },

  // SECTION 6: Directory & Citizen's Charter (Standard Fixture)
  {
    fs_path: "directory",
    title: "Directory & Citizen's Charter",
    navTitle: "Directory",
    description: "Find office locations, contact personnel, and view our service commitments.",
    icon: "BookUser",
    end_point: "Providers/lgu/directory/+page.svelte",
    end_point_type: "dashboard,summary",
    children: [
      {
        fs_path: "office-locations",
        title: "Office Locations",
        navTitle: "Locations",
        description: "Interactive map and list of all city hall departments and satellite offices.",
        icon: "MapPinned",
        end_point: "Providers/lgu/directory/OfficeLocations.svelte",
        end_point_type: "map,table",
      },
      {
        fs_path: "key-officials",
        title: "Key Officials Directory",
        navTitle: "Officials",
        description: "Directory of the Mayor, Vice-Mayor, Councilors, and Department Heads.",
        icon: "Users2",
        end_point: "Providers/lgu/directory/KeyOfficials.svelte",
        end_point_type: "profile,table",
      },
      {
        fs_path: "citizens-charter",
        title: "Citizen's Charter",
        navTitle: "Charter",
        description: "Our service standards, processing times, and feedback mechanisms as per R.A. 11032.",
        icon: "ShieldCheck",
        end_point: "Providers/lgu/directory/CitizensCharter.svelte",
        end_point_type: "document_hub,report",
      }
    ]
  },
];