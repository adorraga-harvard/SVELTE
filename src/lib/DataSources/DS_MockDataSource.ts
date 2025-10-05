/*
 * =================================================================
 * DS_MockDataSource.ts (v3.1)
 * =================================================================
 * "Pantry" for the application's mock data.
 *
 * Update:
 * - Added TASKS array with 50+ items.
 * - Added randomTask() generator.
 * - Added Task to the dataCatalog.
 * =================================================================
 */


// =================================================================
// --- PRIVATE HELPERS ---
// =================================================================

export const R = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const R_NUM = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const R_DATE = () => {
  const end = new Date();
  const start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const R_TIME = () =>
  new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });


// Fisher–Yates shuffle
export const shuffle = <T>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};


// =================================================================
// --- NAME + DEPARTMENT POOLS ---
// =================================================================

export const FIRST_NAMES = [
  "Juan", "Maria", "Andres", "Gabriela", "Jose", "Rizal", "Emilio", "Antonio", "Melchora", "Felipe",
  "Pedro", "Vicente", "Teresa", "Paz", "Concepcion", "Carlos", "Esteban", "Francisco", "Leandro", "Tomas",
  "Ana", "Luisa", "Ramon", "Jesus", "Roberto", "Santiago", "Rafael", "Isabella", "Sofia", "Clarissa",
  "Miguel", "Paolo", "Marco", "Jorge", "Julio", "Alberto", "Diego", "Ricardo", "Fernando", "Victor",
  "Cesar", "Marcelo", "Domingo", "Gregorio", "Nicolas", "Jaime", "Edgardo", "Teodoro", "Salvador", "Enrique",
  "Araceli", "Carmen", "Dolores", "Estrella", "Flor", "Gloria", "Helena", "Imelda", "Josefina", "Leticia",
  "Marina", "Norma", "Olivia", "Patricia", "Querida", "Rosario", "Susana", "Trinidad", "Ursula", "Virginia",
  "Wilhelmina", "Xenia", "Yolanda", "Zenaida", "Amelia", "Beatriz", "Catalina", "Diana", "Elena", "Felicidad",
  "Graciela", "Herminia", "Isabel", "Juana", "Karina", "Lourdes", "Milagros", "Noemi", "Ofelia", "Priscila",
  "Regina", "Soledad", "Teresa", "Veronica", "Consuelo", "Esperanza", "Mercedes", "Aurora", "Reynaldo", "Adolfo"
];

export const LAST_NAMES = [
  "dela Cruz", "Santos", "Bonifacio", "Silang", "Aquino", "Marcos", "Ramos", "Estrada", "Arroyo", "Roxas",
  "Osmeña", "Laurel", "Quezon", "Magsaysay", "Macapagal", "Garcia", "Lopez", "Villanueva", "Reyes", "Bautista",
  "Castillo", "Domingo", "Flores", "Gonzales", "Hernandez", "Ilagan", "Jimenez", "Katigbak", "Lazaro", "Mendoza",
  "Navarro", "Ocampo", "Padilla", "Quintos", "Rivera", "Salazar", "Torres", "Uy", "Valdez", "Yap",
  "Zabala", "Abad", "Beltran", "Cortez", "Dizon", "Enriquez", "Ferrer", "Gutierrez", "Herrera", "Ignacio",
  "Javier", "Katigbak", "Lagman", "Manalo", "Natividad", "Olivares", "Perez", "Quirino", "Ramos", "Santiago",
  "Tan", "Uson", "Vergara", "Wilson", "Yulo", "Zulueta", "Arriola", "Buenaventura", "Cabrera", "Del Rosario",
  "Escueta", "Fajardo", "Gatchalian", "Hizon", "Isidro", "Jacinto", "Kalaw", "Legaspi", "Morales", "Noriega",
  "Ordoñez", "Pascual", "Quinto", "Roldan", "Sarmiento", "Tolentino", "Urbano", "Villareal", "Wenceslao", "Ybiernas",
  "Zubiri", "Alcantara", "Bataclan", "Catapang", "De Vera", "Espiritu", "Francisco", "Guerrero", "Illustre", "Jalandoni"
];

export const DEPARTMENTS = [
  "Department of Health", "Department of Education", "Department of Public Works and Highways",
  "Department of Social Welfare and Development", "Department of Agriculture", "Department of Labor and Employment",
  "Department of Finance", "Department of Trade and Industry", "Department of Tourism", "Department of Transportation",
  "Department of Justice", "Department of Science and Technology", "Department of Foreign Affairs",
  "Department of Environment and Natural Resources", "Department of the Interior and Local Government",
  "Department of Energy", "Department of Budget and Management", "Department of Human Settlements",
  "Department of Information and Communications Technology", "Department of Migrant Workers",
  "City Health Office", "Bureau of Customs", "Bureau of Internal Revenue", "Philippine Statistics Authority",
  "National Economic and Development Authority", "Bangko Sentral ng Pilipinas", "National Bureau of Investigation",
  "Philippine National Police", "Armed Forces of the Philippines", "Commission on Elections",
  "Commission on Audit", "Civil Service Commission", "Government Service Insurance System", "Social Security System",
  "PhilHealth", "Pag-IBIG Fund", "Land Transportation Office", "Maritime Industry Authority", "Energy Regulatory Commission",
  "Food and Drug Administration", "Housing and Land Use Regulatory Board", "Local Water Utilities Administration",
  "Metropolitan Manila Development Authority", "National Housing Authority", "National Electrification Administration",
  "Overseas Workers Welfare Administration", "Professional Regulation Commission", "Securities and Exchange Commission",
  "Subic Bay Metropolitan Authority", "Clark Development Corporation", "Department of Sports",
  "Department of Arts and Culture", "Department of Fisheries", "Department of Disaster Resilience",
  "Department of Peace and Order", "Department of Cooperatives", "Department of Railways",
  "Department of Renewable Energy", "Department of Cybersecurity", "Department of Maritime Affairs",
  "Office of the President", "Office of the Vice President", "Supreme Court of the Philippines",
  "Sandiganbayan", "Court of Appeals", "House of Representatives", "Senate of the Philippines",
  "Philippine Overseas Employment Administration", "National Telecommunications Commission", "Philippine Ports Authority",
  "Civil Aviation Authority of the Philippines", "Department of Veterans Affairs", "Department of Youth Development",
  "Department of Indigenous Peoples", "Department of Women’s Affairs", "Department of Elderly Care",
  "Department of Family Services", "Department of Innovations", "Department of Entrepreneurship",
  "Department of Mining", "Department of Forestry", "Department of Water Resources", "Department of Waste Management",
  "Department of Roads and Highways", "Department of Housing Finance", "Department of Oceanic Affairs",
  "Department of Climate Change", "Department of Artificial Intelligence", "Department of Blockchain",
  "Department of Smart Cities", "Department of Nanotechnology", "Department of Space Exploration", "Department of Robotics",
  "Department of Logistics", "Department of Shipping", "Department of Postal Services", "Department of Public Safety"
];


// =================================================================
// --- RANDOM NAME + DEPARTMENT (SHUFFLED POOLS) ---
// =================================================================

let namePool: string[] = [];
let deptPool: string[] = [];

const refillNames = () => {
  namePool = shuffle(
    FIRST_NAMES.flatMap(fn => LAST_NAMES.map(ln => `${fn} ${ln}`))
  );
};

const refillDepts = () => {
  deptPool = shuffle(DEPARTMENTS);
};

export const randomName = () => {
  if (namePool.length === 0) refillNames();
  return namePool.pop()!;
};

export const randomDept = () => {
  if (deptPool.length === 0) refillDepts();
  return deptPool.pop()!;
};

export function randomNumber(length: number): string {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const randomStatus = () =>
  R([
    { label: "Approved", badge: "badge-success" },
    { label: "Pending", badge: "badge-warning" },
    { label: "Rejected", badge: "badge-error" }
  ]);

export const randomLocation = () =>
  R(["Quezon City", "Makati City", "Pasig City", "Cebu City", "Davao City"]);


// =================================================================
// --- TASK POOL ---
// =================================================================

export const TASKS = [
    "Review new business permit application for 'Manila Bakeshop'",
    "Process Real Property Tax payment for TCT No. 123-456-A",
    "Verify sanitary permit compliance for 'QC Eatery'",
    "Generate Q3 report on delinquent property taxes",
    "Approve business permit renewal for 'Santos General Merchandise'",
    "Dispatch DRRMO team to minor flooding incident in Brgy. Pinyahan",
    "Schedule health inspection for a new restaurant",
    "Issue e-receipt for online tax payment transaction #892345",
    "Validate application for a Senior Citizen ID",
    "Assess building permit application #BP-2025-5892",
    "Update the city's public health dashboard with new data",
    "Process application for business retirement/closure",
    "Coordinate with DSWD for upcoming financial aid distribution",
    "Inspect reported pothole on Commonwealth Avenue",
    "Reply to citizen query #CQ-9288 from the e-governance portal",
    "Test the city-wide emergency alert system",
    "Issue occupancy permit for a newly constructed commercial building",
    "Process financial assistance request for medical emergency",
    "Reconcile payment records from the online BPLS gateway",
    "Organize a PWD registration event for District 3",
    "Compute penalties for a late RPT payment account",
    "Review health certificate applications for food handlers",
    "Monitor PAGASA weather updates for potential typhoon signal",
    "Archive completed incident reports from August 2025",
    "Draft a public service announcement about waste segregation",
    "Update inventory of the city's central pharmacy",
    "Generate a user activity log for system audit purposes",
    "Issue a notice of violation for an unregistered business",
    "Prepare project proposal for a new bike lane along EDSA",
    "Validate proof of payment for Community Tax Certificate",
    "Schedule a drainage declogging operation in Brgy. Socorro",
    "Reset password for a city hall employee account",
    "Interview family for Solo Parent ID program eligibility",
    "Update the public-facing FAQ on the city website",
    "Generate report on vaccination rates for the last 30 days",
    "Assess tax declaration for a new condominium unit",
    "Update the inventory of emergency rescue equipment",
    "Prepare agenda for the weekly City Council meeting",
    "Process application for late birth registration",
    "Coordinate with Meralco for a scheduled power interruption",
    "Conduct an earthquake drill simulation for city hall employees",
    "Review and approve a request for public event permit",
    "Generate a list of all active construction permits",
    "Verify submitted documents for a marriage license application",
    "Follow up on an unresolved citizen complaint #CC-8123",
    "Procure new computer hardware for the IT department",
    "Check for CCTV footage related to a traffic incident report",
    "Assign a case worker for a new social welfare case",
    "Finalize the budget proposal for the City Health Office",
    "Publish the latest city ordinance on the official website",
    "Respond to a data request from the Commission on Audit"
];

export const randomTask = () => R(TASKS);


// =================================================================
// --- PUBLIC DATA GENERATORS (The "Pantry" Shelves) ---
// =================================================================

export const getKpiCards = () => [
  { title: "New Business Permits", value: "1,284", change: "+12%", changeType: "increase" },
  { title: "RPT Collections (PHP)", value: "15.2M", change: "+8.5%", changeType: "increase" },
  { title: "Active Incidents", value: "22", change: "-5", changeType: "decrease" },
  { title: "Citizen Registrations", value: "3,450", change: "+201", changeType: "increase" }
];

export const getTableRecords = () =>
  Array.from({ length: 8 }, () => ({
    controlNo: `BPLS-${R_NUM(2025, 2025)}-${R_NUM(1000, 9999)}`,
    applicant: {
      name: randomName(),
      avatar: `/avatars/stock-${R_NUM(1, 8)}.jpg`,
      location: randomLocation()
    },
    dateFiled: R_DATE(),
    status: randomStatus()
  }));

export const getActivityItems = () => [
  { id: 1, user: "J. Dela Cruz", action: "paid Real Property Tax", timestamp: "2h ago", icon: "Receipt" },
  { id: 2, user: "Admin", action: 'approved a business permit for "Manila Bakeshop"', timestamp: "3h ago", icon: "CheckCircle" },
  { id: 3, user: "Dispatcher", action: "assigned a new incident report #IR-092125", timestamp: "4h ago", icon: "Siren" },
  { id: 4, user: "M. Santos", action: "registered a new citizen account via PinoyID", timestamp: "5h ago", icon: "UserPlus" }
];

export const getFaqItems = () => [
  {
    question: "How do I apply for a new business permit?",
    answer: 'You can start the process by clicking the "Add New" button on the Data Records table. Ensure you have all the required digital documents ready for upload.'
  },
  {
    question: "What is the status of my application?",
    answer: 'You can monitor the real-time status of your application in the main table. The status will be updated from "Pending" to "Approved" or "Rejected" once an officer has reviewed it.'
  },
  {
    question: "How long does the approval process take?",
    answer: "Processing times can vary, but most applications are reviewed within 3-5 business days, provided all documentation is complete and correct."
  }
];

export const getConnectedAgentName = () => randomName();

export const getMapData = () => ({
  center: { lat: 14.676, lng: 121.0437 },
  markers: [
    { lat: 14.68, lng: 121.04, label: "Incident #IR-092125" },
    { lat: 14.67, lng: 121.05, label: "New Business: Manila Bakeshop" }
  ]
});


// =================================================================
// --- THE DATA CATALOG (The "Recipe Book") ---
// =================================================================

export const dataCatalog = {
  KpiDeck: { prop: "kpis", generator: getKpiCards },
  Table: { prop: "records", generator: getTableRecords },
  ActivityFeed: { prop: "activity", generator: getActivityItems },
  Faq: { prop: "faqs", generator: getFaqItems },
  Chat: { prop: "agentName", generator: getConnectedAgentName },
  Map: { prop: "map", generator: getMapData },
  Task: { prop: "task", generator: randomTask } // <-- ADDED THIS ENTRY
};