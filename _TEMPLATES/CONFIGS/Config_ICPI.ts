import type { Route } from './project_Config'; // Assuming Route is defined in a shared types file

/**
 * @file Config_ICPI.ts
 * @description The definitive configuration for the ICPI Sentinel Platform.
 * This platform serves as the primary tool for the Independent Consultant for
 * Philippine Infrastructure to monitor projects, investigate personnel, and
 * collaborate with state agencies to ensure integrity in public works.
 * This config uses a multi-level structure to showcase scalability.
 */
export const config: Route[] = [
  {
    path: '/',
    endpoint: 'Providers/ICPI/Dashboard.svelte',
    endpoint_type: 'dashboard,summary,table',
    title: 'ICPI Sentinel Platform',
    description: `As of ${new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila', dateStyle: 'full' })}, the Sentinel platform is actively monitoring all priority infrastructure projects.`,
    children: [
      // =================================================================
      // SECTION 1: CORE INVESTIGATIVE MODULES
      // =================================================================
      {
        path: '/investigations',
        title: 'Case Investigations',
        description: 'Central hub for all active and archived investigative modules targeting specific government agencies and project types.',
        children: [
          {
            path: '/investigations/dpwh-flood-control',
            endpoint: 'Providers/ICPI/investigations/dpwh/Dashboard.svelte',
            endpoint_type: 'dashboard,table,map',
            title: 'Module: DPWH Flood Control Projects',
            description: 'A dedicated portal for monitoring, auditing, and investigating anomalies in DPWH Flood Control Projects nationwide.',
            children: [
              {
                path: '/investigations/dpwh-flood-control/projects',
                endpoint: 'Providers/ICPI/investigations/dpwh/Projects.svelte',
                endpoint_type: 'table',
                title: 'Monitored Projects',
                description: 'A comprehensive list of all flood control projects under review, including budget, status, contractors, and associated personnel.',
              },
              {
                path: '/investigations/dpwh-flood-control/personnel',
                endpoint: 'Providers/ICPI/investigations/dpwh/Personnel.svelte',
                endpoint_type: 'table',
                title: 'Personnel of Interest',
                description: 'Profiles of civil servants and private contractors linked to projects with significant audit flags or public complaints.',
              },
              {
                path: '/investigations/dpwh-flood-control/submit-intel',
                endpoint: 'Providers/ICPI/investigations/dpwh/SubmitIntel.svelte',
                endpoint_type: 'form,upload',
                title: 'Submit Confidential Intelligence',
                description: 'A secure channel for whistleblowers to submit confidential information and evidence related to DPWH flood control projects.',
              },
            ],
          },
          // This structure can be duplicated for other agencies in the future
          // {
          //   path: '/investigations/denr-mining-permits',
          //   title: 'Module: DENR Mining Permits',
          //   description: 'Future module for monitoring mining permits issued by the DENR.',
          //   ...
          // }
        ],
      },
      // =================================================================
      // SECTION 2: DATA ANALYSIS & PUBLIC REPORTING
      // =================================================================
      {
        path: '/analytics',
        title: 'Analytics & Intelligence',
        description: 'Data-driven insights into systemic issues, risk hotspots, and performance metrics across government infrastructure projects.',
        children: [
          {
            path: '/analytics/risk-hotspots',
            endpoint: 'Providers/ICPI/analytics/RiskHotspots.svelte',
            endpoint_type: 'map,analytics,table',
            title: 'Geospatial Risk Hotspots',
            description: 'An interactive map highlighting regions and districts with the highest concentration of flagged projects and negative findings.',
          },
          {
            path: '/analytics/personnel-risk-matrix',
            endpoint: 'Providers/ICPI/analytics/PersonnelMatrix.svelte',
            endpoint_type: 'table,analytics',
            title: 'Personnel Risk Matrix',
            description: 'A list of civil servants flagged for review based on connections to multiple anomalous projects, unexplained wealth, or public complaints.',
          },
          {
            path: '/analytics/agency-performance-review',
            endpoint: 'Providers/ICPI/analytics/AgencyPerformance.svelte',
            endpoint_type: 'summary,table,analytics',
            title: 'Agency Performance Review',
            description: 'Comparative performance metrics for government agencies based on project completion rates, budget integrity, and public feedback.',
          },
        ],
      },
      // =================================================================
      // SECTION 3: SECURE INTER-AGENCY COLLABORATION
      // =================================================================
      {
        path: '/portals',
        title: 'Inter-Agency Portals',
        description: 'Secure data-sharing and case endorsement portals for partner government bodies.',
        children: [
          {
            path: '/portals/ombudsman',
            endpoint: 'Providers/ICPI/portals/Ombudsman.svelte',
            endpoint_type: 'form,report',
            title: 'Ombudsman Case Endorsement Portal',
            description: 'Secure portal for endorsing fully-vetted case files to the Office of the Ombudsman for official action.',
          },
          {
            path: '/portals/nbi-pnp',
            endpoint: 'Providers/ICPI/portals/NbiPnp.svelte',
            endpoint_type: 'form,report',
            title: 'NBI & PNP Verification Access',
            description: 'Authorized access for the NBI and PNP to verify information and request supporting documents for ongoing investigations.',
          },
        ],
      },
      // =================================================================
      // SECTION 4: PUBLIC INFORMATION & RESOURCES
      // =================================================================
      {
        path: '/resources',
        title: 'Resource Center',
        description: 'Information about the ICPI, its mandate, operational procedures, and legal framework.',
        children: [
          {
            path: '/resources/about-icpi',
            endpoint: 'Providers/ICPI/resources/About.svelte',
            endpoint_type: 'info',
            title: 'About the ICPI',
            description: 'Learn about our mandate, leadership, and legal authority as the Independent Consultant for Philippine Infrastructure.',
          },
          {
            path: '/resources/investigative-process',
            endpoint: 'Providers/ICPI/resources/Process.svelte',
            endpoint_type: 'info,checklist,tracker',
            title: 'Our Investigative Process',
            description: 'A transparent overview of how intelligence is received, verified, investigated, and escalated to the proper authorities.',
          },
          {
            path: '/resources/legal-framework',
            endpoint: 'Providers/ICPI/resources/Legal.svelte',
            endpoint_type: 'info',
            title: 'Legal Framework & Reporter Protection',
            description: 'Information on the laws governing our operations, including whistleblower protection under Republic Act No. 6981.',
          },
        ],
      },
    ],
  },
];