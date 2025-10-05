export interface Route {
  fs_path: string;
  navTitle: string;
  description: string;
  icon: string;
  templates: string;
  children?: Route[];
}

export const config: Route[] = [
  // SECTION 1: Citizen Services
  {
    fs_path: "citizen-services",
    navTitle: "Citizen",
    description: "Access essential services and manage personal records from one portal.",
    icon: "Users",
    templates: "dashboard,profile",
    children: [
      {
        fs_path: "profiles",
        navTitle: "My Profile",
        description: "Manage your personal information, linked IDs, and account settings.",
        icon: "User",
        templates: "profile,form",
        children: [
          {
            fs_path: "account-settings",
            navTitle: "Account",
            description: "Update your login credentials and security settings.",
            icon: "Lock",
            templates: "form",
          },
          {
            fs_path: "linked-ids",
            navTitle: "Linked IDs",
            description: "Link your PinoyID and other government IDs for seamless transactions.",
            icon: "IdCard",
            templates: "form,camera,qr-code,profile",
          },
          {
            fs_path: "contact-info",
            navTitle: "Contact Info",
            description: "Update your contact details for official notifications.",
            icon: "Phone",
            templates: "form",
          },
        ],
      },
      {
        fs_path: "civil-registry",
        navTitle: "Civil Registry",
        description: "Request official copies of birth, marriage, and death certificates.",
        icon: "BookUser",
        templates: "info,form",
        children: [
          {
            fs_path: "birth-certificate",
            navTitle: "Birth Certificate",
            description: "Apply for a certified true copy of a birth certificate.",
            icon: "FileBadge",
            templates: "form,tracker",
          },
          {
            fs_path: "marriage-certificate",
            navTitle: "Marriage Certificate",
            description: "Apply for a certified true copy of a marriage certificate.",
            icon: "Ring",
            templates: "form,tracker",
          },
          {
            fs_path: "death-certificate",
            navTitle: "Death Certificate",
            description: "Apply for a certified true copy of a death certificate.",
            icon: "Tombstone",
            templates: "form,tracker",
          },
        ],
      },
      {
        fs_path: "community-feedback",
        navTitle: "Feedback",
        description: "Submit suggestions, complaints, or reports to the LGU.",
        icon: "MessagesSquare",
        templates: "form,info",
        children: [
          {
            fs_path: "suggestion-box",
            navTitle: "Suggestions",
            description: "Anonymously submit ideas and suggestions for community improvement.",
            icon: "Lightbulb",
            templates: "form",
          },
          {
            fs_path: "citizen-concerns",
            navTitle: "Concerns",
            description: "Report issues and concerns on LGU services or staff.",
            icon: "AlertCircle",
            templates: "form",
          },
        ],
      },
    ],
  },

  // SECTION 2: Business & Economic Services
  {
    fs_path: "business-services",
    navTitle: "Business",
    description: "A one-stop shop for business permits, taxation, and economic development.",
    icon: "Store",
    templates: "dashboard,info",
    children: [
      {
        fs_path: "bpls-portal",
        navTitle: "BPLS",
        description: "Business Permit and Licensing System for application, renewal, and tracking.",
        icon: "FileText",
        templates: "dashboard,form,tracker",
        children: [
          {
            fs_path: "new-application",
            navTitle: "New",
            description: "Guided process to register a new business.",
            icon: "FilePlus2",
            templates: "form,checklist",
          },
          {
            fs_path: "renewal",
            navTitle: "Renewal",
            description: "Streamlined process for renewing existing business permits.",
            icon: "RefreshCw",
            templates: "form,upload",
          },
          {
            fs_path: "track-bpls",
            navTitle: "Status",
            description: "Monitor the real-time status of your BPLS application.",
            icon: "Activity",
            templates: "tracker,table",
          },
        ],
      },
      {
        fs_path: "market-management",
        navTitle: "Market",
        description: "Services for public market stallholders and vendors.",
        icon: "ShoppingBasket",
        templates: "dashboard,info",
        children: [
          {
            fs_path: "payments",
            navTitle: "Payments",
            description: "Pay your monthly stall rental fees online.",
            icon: "Wallet",
            templates: "form,table",
          },
          {
            fs_path: "requests",
            navTitle: "Requests",
            description: "Submit maintenance or service requests for your stall.",
            icon: "Wrench",
            templates: "form",
          },
        ],
      },
      {
        fs_path: "economic-planning",
        navTitle: "Planning",
        description: "Information on local economic development and zoning plans.",
        icon: "GitBranch",
        templates: "info,map",
        children: [
          {
            fs_path: "land-use",
            navTitle: "Land Use",
            description: "View the official land use and zoning plan of the community.",
            icon: "Landmark",
            templates: "map,info",
          },
          {
            fs_path: "investment-opportunities",
            navTitle: "Investments",
            description: "Explore opportunities for business and investment in the LGU.",
            icon: "Building",
            templates: "info,report",
          },
        ],
      },
    ],
  },

  // SECTION 3: Public Safety & Disaster Management
  {
    fs_path: "safety-alerts",
    navTitle: "Safety",
    description: "Emergency alerts, incident reporting, and public safety information.",
    icon: "Siren",
    templates: "dashboard,info,map",
    children: [
      {
        fs_path: "emergency-alerts",
        navTitle: "Alerts",
        description: "Receive timely and verified emergency information from the LDRRMO.",
        icon: "Megaphone",
        templates: "info,map",
        children: [
          {
            fs_path: "live-updates",
            navTitle: "Live Updates",
            description: "See the latest news on weather, class suspensions, and emergency advisories.",
            icon: "CloudSun",
            templates: "dashboard,info,sms",
          },
          {
            fs_path: "hazard-maps",
            navTitle: "Hazard Maps",
            description: "Interactive maps showing real-time hazards and affected areas.",
            icon: "Map",
            templates: "map,info",
          },
          {
            fs_path: "evacuation-centers",
            navTitle: "Evac Centers",
            description: "Locate and get directions to the nearest evacuation centers.",
            icon: "MapPinned",
            templates: "map,table,gps",
          },
        ],
      },
      {
        fs_path: "incident-report",
        navTitle: "Report",
        description: "Report incidents and concerns to LGU responders.",
        icon: "PhoneForwarded",
        templates: "form,map",
        children: [
          {
            fs_path: "submit-report",
            navTitle: "Submit",
            description: "Submit a report with your location, photos, and videos.",
            icon: "Send",
            templates: "form,camera,gps,upload",
          },
          {
            fs_path: "track-report",
            navTitle: "Track",
            description: "Monitor the status of your submitted reports.",
            icon: "ClipboardCheck",
            templates: "tracker,table",
          },
        ],
      },
      {
        fs_path: "police-matters",
        navTitle: "Police",
        description: "Information on police matters and public order.",
        icon: "ShieldAlert",
        templates: "info,form",
        children: [
          {
            fs_path: "blotter-request",
            navTitle: "Blotter",
            description: "Request a copy of a blotter report.",
            icon: "FileSearch",
            templates: "form,tracker",
          },
          {
            fs_path: "crime-prevention",
            navTitle: "Crime Prevention",
            description: "Tips and resources for ensuring public safety and order.",
            icon: "Handcuffs",
            templates: "info,document-hub",
          },
        ],
      },
    ],
  },


  // SECTION 4: Health and Social Welfare
  {
    fs_path: "health-welfare",
    navTitle: "Health",
    description: "Public health, social welfare, and community-based programs.",
    icon: "HeartPulse",
    templates: "dashboard,info",
    children: [
      {
        fs_path: "health-services",
        navTitle: "Health",
        description: "Access RHU services and manage your health records.",
        icon: "Stethoscope",
        templates: "dashboard,form",
        children: [
          {
            fs_path: "appointments",
            navTitle: "Appointments",
            description: "Book, reschedule, or cancel health center appointments.",
            icon: "CalendarPlus",
            templates: "form,calendar",
          },
          {
            fs_path: "vaxcert",
            navTitle: "VaxCert",
            description: "Generate and download your official vaccination certificate with your PinoyID.",
            icon: "QrCode",
            templates: "form,qr-code",
          },
        ],
      },
      {
        fs_path: "social-welfare",
        navTitle: "Welfare",
        description: "Programs and benefits for senior citizens, PWDs, and other community sectors.",
        icon: "HandHelping",
        templates: "dashboard,info",
        children: [
          {
            fs_path: "senior-citizen",
            navTitle: "Senior",
            description: "Notifications and services for senior citizens.",
            icon: "PersonStanding",
            templates: "info,form",
          },
          {
            fs_path: "pwd",
            navTitle: "PWD",
            description: "Programs and benefits for Persons with Disabilities.",
            icon: "Accessibility",
            templates: "info,form",
          },
          {
            fs_path: "4ps",
            navTitle: "4Ps",
            description: "Information on the Pantawid Pamilyang Pilipino Program (4Ps).",
            icon: "HandCoins",
            templates: "info,report",
          },
        ],
      },
    ],
  },


  // SECTION 5: Education and Youth
  {
    fs_path: "education",
    navTitle: "Education",
    description: "School-related news, programs, and updates for students and parents.",
    icon: "GraduationCap",
    templates: "dashboard,info",
    children: [
      {
        fs_path: "school-news",
        navTitle: "News",
        description: "Official announcements on classes, events, and school programs.",
        icon: "Newspaper",
        templates: "dashboard,table",
        children: [
          {
            fs_path: "class-cancellation",
            navTitle: "Cancellations",
            description: "Latest news on class suspensions due to weather or other events.",
            icon: "CloudRain",
            templates: "info",
          },
          {
            fs_path: "youth-activities",
            navTitle: "Youth Activities",
            description: "Scheduled events and programs for the youth.",
            icon: "Calendar",
            templates: "calendar,info",
          },
        ],
      },
      {
        fs_path: "sk-federation",
        navTitle: "SK Federation",
        description: "Official announcements and programs from the Sangguniang Kabataan Federation.",
        icon: "Trophy",
        templates: "dashboard,info,form",
        children: [
          {
            fs_path: "projects",
            navTitle: "Projects",
            description: "View ongoing and completed projects of the SK Federation.",
            icon: "ClipboardCheck",
            templates: "table,info",
          },
          {
            fs_path: "forms",
            navTitle: "Forms",
            description: "Downloadable forms for SK-related activities and programs.",
            icon: "Download",
            templates: "document-hub",
          },
        ],
      },
    ],
  },


  // SECTION 6: Local Government & Public Offices
  {
    fs_path: "local-gov",
    navTitle: "LGU Offices",
    description: "Directory and information about local government offices and officials.",
    icon: "Building",
    templates: "info,table",
    children: [
      {
        fs_path: "executive",
        navTitle: "Executive",
        description: "Information about the offices of the Mayor and Vice-Mayor.",
        icon: "UserCrown",
        templates: "profile,info",
        children: [
          {
            fs_path: "mayors-office",
            navTitle: "Mayor's Office",
            description: "Announcements and contact details for the Mayor's Office.",
            icon: "Mail",
            templates: "info",
          },
          {
            fs_path: "vice-mayors-office",
            navTitle: "Vice-Mayor's Office",
            description: "Information and updates from the Vice-Mayor's Office.",
            icon: "Mail",
            templates: "info",
          },
        ],
      },
      {
        fs_path: "legislative",
        navTitle: "Legislative",
        description: "Official documents and news from the Sangguniang Bayan.",
        icon: "Gavel",
        templates: "dashboard,info",
        children: [
          {
            fs_path: "ordinances",
            navTitle: "Ordinances",
            description: "View and search for local ordinances and resolutions.",
            icon: "FileText",
            templates: "document-hub,search",
          },
          {
            fs_path: "meetings",
            navTitle: "Meetings",
            description: "View the schedule of legislative meetings.",
            icon: "Calendar",
            templates: "calendar,info",
          },
        ],
      },
      {
        fs_path: "barangay-affairs",
        navTitle: "Barangay",
        description: "Centralized hub for all barangay-related information and services.",
        icon: "LandPlot",
        templates: "dashboard,info",
        children: [
          {
            fs_path: "directory",
            navTitle: "Directory",
            description: "Find contact information for all barangays in the community.",
            icon: "BookCopy",
            templates: "table,info",
          },
          {
            fs_path: "news",
            navTitle: "News",
            description: "Latest news and announcements from all barangays.",
            icon: "Newspaper",
            templates: "dashboard,table",
          },
        ],
      },
      {
        fs_path: "departments",
        navTitle: "Directory",
        description: "Find contact information and services for all LGU departments.",
        icon: "BookCopy",
        templates: "table,search",
        children: [
          {
            fs_path: "mayor",
            navTitle: "Mayor",
            description: "Details for Mayor's office.",
            icon: "UserCrown",
            templates: "info,profile",
          },
          {
            fs_path: "engineering",
            navTitle: "Engineering",
            description: "Details for Engineering Department.",
            icon: "Hammer",
            templates: "info,profile",
          },
          {
            fs_path: "tourism",
            navTitle: "Tourism",
            description: "Details for Department of Tourism.",
            icon: "MapPinned",
            templates: "info,profile",
          },
        ],
      },
    ],
  },


  // SECTION 7: Public Information & Communication
  {
    fs_path: "public-info",
    navTitle: "Info & News",
    description: "Official announcements, news, and updates for the public.",
    icon: "Megaphone",
    templates: "dashboard,info",
    children: [
      {
        fs_path: "news-media",
        navTitle: "News Hub",
        description: "A centralized hub for all official LGU news.",
        icon: "Newspaper",
        templates: "dashboard,table",
        children: [
          {
            fs_path: "latest-news",
            navTitle: "Latest News",
            description: "The latest news and announcements from the LGU.",
            icon: "MessageSquare",
            templates: "dashboard,info",
          },
          {
            fs_path: "miscellaneous",
            navTitle: "Miscellaneous",
            description: "General news and information that is not category-specific.",
            icon: "Folder",
            templates: "dashboard,info",
          },
        ],
      },
      {
        fs_path: "lgu-events",
        navTitle: "Events",
        description: "Official schedule of LGU activities, ceremonies, and events.",
        icon: "Calendar",
        templates: "calendar,table",
        children: [
          {
            fs_path: "upcoming-events",
            navTitle: "Upcoming",
            description: "Calendar view of all scheduled LGU activities.",
            icon: "CalendarClock",
            templates: "calendar,info",
          },
          {
            fs_path: "event-photos",
            navTitle: "Photos",
            description: "Photo and video galleries of past LGU events.",
            icon: "Camera",
            templates: "gallery,upload,camera",
          },
        ],
      },
      {
        fs_path: "contact",
        navTitle: "Contact Us",
        description: "Find contact information for LGU offices and send a message.",
        icon: "Phone",
        templates: "info,form",
        children: [
          {
            fs_path: "contact-form",
            navTitle: "Form",
            description: "Send a direct message to the LGU for inquiries or feedback.",
            icon: "Mail",
            templates: "form",
          },
          {
            fs_path: "social-media",
            navTitle: "Socials",
            description: "Links to the official LGU social media pages.",
            icon: "Share",
            templates: "info",
          },
        ],
      },
    ],
  },
];