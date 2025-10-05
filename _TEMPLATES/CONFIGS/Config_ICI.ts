/*
 * project_Config.ts (ICI)
 * =================================================================
 * Independent Commission for Infrastructure (ICI) - route configuration
 * Centralized definition of navigation, endpoints, and content scaffolding.
 * =================================================================
 */

export interface Route {
	fs_path: string; // path for filesystem / navigation
	navTitle: string; // short nav label (literal title for menus)
	icon?: string; // optional icon (lucide-react)
	provider?: string; // optional explicit provider path
	templates?: string; // comma-separated templates
	description?: string; // optional page intro or section description
	children?: Route[]; // sub-routes
}

export const config: Route[] = [
	// --- SECTION 0: Dashboard ---
	{
		fs_path: 'dashboard',
		navTitle: 'Dashboard',
		icon: 'LayoutDashboard',
		templates: 'dashboard,kpi-deck,activity-feed,map',
		description:
			'The central hub of the ICI system, providing a live overview of infrastructure monitoring, corruption alerts, and citizen engagement.'
	},

	// --- SECTION 1: About ICI ---
	{
		fs_path: 'about',
		navTitle: 'About',
		icon: 'Info',
		templates: 'info,accordion',
		description:
			'Learn about the history, mandate, and leadership structure of the Independent Commission for Infrastructure (ICI).',
		children: [
			{
				fs_path: 'history',
				navTitle: 'History',
				icon: 'BookOpen',
				templates: 'article,timeline,info',
				description: 'The historical background of ICI, its formation, and objectives.'
			},
			{
				fs_path: 'mandate',
				navTitle: 'Mandate',
				icon: 'Gavel',
				templates: 'info,accordion,checklist',
				description: 'An overview of ICI’s legal authority, powers, and scope of investigations.'
			},
			{
				fs_path: 'leadership',
				navTitle: 'Leadership',
				icon: 'Users',
				templates: 'profile,table',
				description: 'Profiles of the commissioners, secretariat, and organizational structure.'
			}
		]
	},

	// --- SECTION 2: Corruption Findings ---
	{
		fs_path: 'corruption-findings',
		navTitle: 'Findings',
		icon: 'AlertTriangle',
		templates: 'dashboard,kpi-deck,bar-chart,line-chart,pie-chart',
		description:
			'Access dashboards and detailed reports on corruption findings and anomalies in infrastructure projects.',
		children: [
			{
				fs_path: 'fund-misuse',
				navTitle: 'Fund Misuse',
				icon: 'Landmark',
				templates: 'table,filter,download',
				description: 'Alerts and records concerning misuse of public funds.'
			},
			{
				fs_path: 'procurement-issues',
				navTitle: 'Procurement',
				icon: 'FileText',
				templates: 'table,chart,filter',
				description: 'Reports on irregularities in procurement processes.'
			},
			{
				fs_path: 'project-delays',
				navTitle: 'Delays',
				icon: 'Clock',
				templates: 'table,line-chart,timeline',
				description: 'Tracking project delays, cost overruns, and impact analysis.'
			}
		]
	},

	// --- SECTION 3: Projects (NEW) ---
	{
		fs_path: 'projects',
		navTitle: 'Projects',
		icon: 'Construction',
		templates: 'map,kpi-deck,table,filter',
		description:
			'Monitor the status, budget, and progress of all registered public infrastructure projects across the Philippines.',
		children: [
			{
				fs_path: 'by-status',
				navTitle: 'By Status',
				icon: 'ClipboardCheck',
				templates: 'table,filter',
				description:
					'Filter and view projects based on their current status: ongoing, completed, delayed, or flagged.',
				children: [
					{
						fs_path: 'ongoing',
						navTitle: 'Ongoing',
						icon: 'PlayCircle',
						templates: 'table,filter,map',
						description: 'A list of all projects currently in progress.'
					},
					{
						fs_path: 'completed',
						navTitle: 'Completed',
						icon: 'CheckCircle2',
						templates: 'table,filter,gallery',
						description: 'A repository of successfully completed infrastructure projects.'
					},
					{
						fs_path: 'delayed',
						navTitle: 'Delayed',
						icon: 'Clock',
						templates: 'table,filter,timeline',
						description: 'Projects that have exceeded their projected timelines.'
					},
					{
						fs_path: 'flagged',
						navTitle: 'Flagged',
						icon: 'Flag',
						templates: 'table,filter,alert',
						description:
							'Projects flagged for potential issues, anomalies, or corruption indicators.'
					}
				]
			},
			{
				fs_path: 'by-region',
				navTitle: 'By Region',
				icon: 'MapPin',
				templates: 'map,table,filter',
				description: 'Explore projects geographically, from national to local levels.'
			},
			{
				fs_path: 'search',
				navTitle: 'Project Search',
				icon: 'Search',
				templates: 'search,table,results',
				description:
					'Perform a detailed search for specific projects using keywords, project IDs, or contractors.'
			}
		]
	},

	// --- SECTION 4: SALN Declarations (NEW) ---
	{
		fs_path: 'saln-declarations',
		navTitle: 'SALN',
		icon: 'ShieldCheck',
		templates: 'kpi-deck,table,search,download',
		description:
			'Access and review the Statement of Assets, Liabilities, and Net Worth (SALN) of public officials involved in infrastructure projects.',
		children: [
			{
				fs_path: 'search-officials',
				navTitle: 'Search Officials',
				icon: 'Search',
				templates: 'search,table,profile',
				description: 'Search for officials by name or agency to view their SALN submissions.'
			},
			{
				fs_path: 'by-agency',
				navTitle: 'By Agency',
				icon: 'Building2',
				templates: 'accordion,table,filter',
				description:
					'Browse SALN submissions from officials grouped by their respective government agencies.'
			},
			{
				fs_path: 'analytics',
				navTitle: 'Analytics',
				icon: 'PieChart',
				templates: 'chart,kpi-deck,filter',
				description:
					'View trends and analytics on net worth changes and business interests declared in SALN documents.'
			},
			{
				fs_path: 'request-guide',
				navTitle: 'Request Guide',
				icon: 'HelpCircle',
				templates: 'faq,form,info',
				description: 'Information and guidelines on the official process for requesting a copy of a SALN.'
			}
		]
	},

	// --- SECTION 5: Citizens Soundboard ---
	{
		fs_path: 'soundboard',
		navTitle: 'Soundboard',
		icon: 'MessageSquare',
		templates: 'form,table,chat,faq',
		description: 'A platform for citizen engagement, feedback, and whistleblowing.',
		children: [
			{
				fs_path: 'public-feedback',
				navTitle: 'Feedback',
				icon: 'MessageCircle',
				templates: 'form,table,search',
				description: 'Submit and review public feedback on ongoing projects.'
			},
			{
				fs_path: 'whistleblower-reports',
				navTitle: 'Whistleblowers',
				icon: 'ShieldAlert',
				templates: 'form,upload,faq',
				description: 'Secure reporting for whistleblowers to flag irregularities.'
			}
		]
	},

	// --- SECTION 6: Agencies Investigated ---
	{
		fs_path: 'agencies',
		navTitle: 'Agencies',
		icon: 'Building2',
		templates: 'list,table,accordion',
		description: 'Browse the agencies investigated and their related projects.',
		children: [
			{
				fs_path: 'dpwh',
				navTitle: 'DPWH',
				icon: 'Hammer',
				templates: 'profile,table,map,download',
				description: 'Department of Public Works & Highways'
			},
			{
				fs_path: 'dotr',
				navTitle: 'DOTr',
				icon: 'BusFront',
				templates: 'profile,table,map,download',
				description: 'Department of Transportation'
			},
			{
				fs_path: 'dict',
				navTitle: 'DICT',
				icon: 'Server',
				templates: 'profile,table,report,download',
				description: 'Department of ICT'
			},
			{
				fs_path: 'psa',
				navTitle: 'PSA',
				icon: 'Database',
				templates: 'profile,table,open-data,download',
				description: 'Philippine Statistics Authority'
			},
			{
				fs_path: 'doh',
				navTitle: 'DOH',
				icon: 'Hospital',
				templates: 'profile,table,download',
				description: 'Department of Health'
			}
		]
	},

	// --- SECTION 7: Investigation Reports & Open Data ---
	{
		fs_path: 'investigation-reports',
		navTitle: 'Reports',
		icon: 'FileText',
		templates: 'download,table,search',
		description: 'Access all investigation reports, case studies, and open datasets for transparency.',
		children: [
			{
				fs_path: 'annual-reports',
				navTitle: 'Annual',
				icon: 'Calendar',
				templates: 'table,download',
				description: 'Annual & thematic reports.'
			},
			{
				fs_path: 'case-studies',
				navTitle: 'Case Studies',
				icon: 'FileSearch',
				templates: 'info,download,table',
				description: 'In-depth case studies and investigations.'
			},
			{
				fs_path: 'open-data',
				navTitle: 'Open Data',
				icon: 'Database',
				templates: 'download,table,search',
				description: 'Datasets and open access files.'
			}
		]
	}
];