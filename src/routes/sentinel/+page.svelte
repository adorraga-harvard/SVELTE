<script lang="ts">
    import { fly } from 'svelte/transition';
</script>

<div class="space-y-12">

    <section>
        <div class="prose max-w-none space-y-4">
            <h1 class="text-4xl lg:text-5xl font-extrabold text-base-content leading-tight mt-0">
                AFP SENTINEL: The Digital Shield the Philippines Needs Now
            </h1>
            <p class="lead text-lg text-base-content/90">
                The security challenges facing the Philippines are more complex than ever: evolving geopolitical tensions, persistent domestic threats, and the shadow of cyber warfare. Addressing this requires moving beyond fragmented reports and paper files into a single, unified digital battlespace. The AFP SENTINEL, an Ultra-Smart Executive Information System, is not merely an IT upgrade; it is the digital shield required to safeguard the nation.
            </p>
        </div>
    </section>

    <div class="card shadow-xl bg-base-100 p-6">
        <div class="flex flex-col md:flex-row items-center gap-6">
            <div class="flex-shrink-0">
                <img
                    src="/img/Barandon.jpg"
                    class="w-full md:w-48 h-auto object-cover rounded-xl shadow-xl"
                    alt="Strategic Command Center"
                >
            </div>

            <div class="flex-grow">
                <div class="alert shadow-lg bg-gradient-to-br from-transparent to-primary/20 border-l-4 border-primary">
                    <div class="flex flex-col">
                        <p class="text-xl font-semibold italic text-base-content">
                            Synthesis, Exposure, and Targeting: The National Intelligence Nexus—captures the system’s mission.
                        </p>
                        <p class="text-lg mt-2 text-base-content/80">
                            It transforms raw, isolated intelligence data into actionable strategic knowledge for the Armed Forces of the Philippines.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section>
        <h2 class="text-3xl font-bold text-base-content mb-4 border-b border-primary/50 pb-2">
            The SENTINEL Anagram: A Blueprint for Intelligence Superiority
        </h2>

        <p class="text-base-content/90 mb-6">
            The intelligence gap is not about lacking data; it's about lacking the mechanism to connect it. The AFP SENTINEL system is meticulously designed to close that gap, as articulated by its core structure:
        </p>

        <div class="overflow-x-auto card shadow-lg bg-base-100">
            <table class="table table-zebra table-hover w-full">
                <thead class="bg-primary text-primary-content">
                    <tr>
                        <th class="w-1/12">Letter</th>
                        <th class="w-5/12">Function</th>
                        <th class="w-6/12">Strategic Impact</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="font-bold text-xl text-primary">S</td>
                        <td class="font-semibold">Synthesis of Strategic Data</td>
                        <td>Merges all sources (HUMINT, SIGINT, OSINT) into a single, comprehensive view.</td>
                    </tr>
                    <tr>
                        <td class="font-bold text-xl text-primary">E</td>
                        <td class="font-semibold">Emergent Threat Exposure</td>
                        <td>Uses dynamic modeling to identify and alert commanders to new, developing threats before they materialize.</td>
                    </tr>
                    <tr>
                        <td class="font-bold text-xl text-primary">N</td>
                        <td class="font-semibold">Network & Navigation Intelligence</td>
                        <td>Maps complex actor and asset relationships, revealing hidden logistical and command structures.</td>
                    </tr>
                    <tr>
                        <td class="font-bold text-xl text-primary">T</td>
                        <td class="font-semibold">Target Tracking Visualization</td>
                        <td>Provides commanders with real-time, GIS-mapped visualizations of enemy and asset locations.</td>
                    </tr>
                    <tr>
                        <td class="font-bold text-xl text-primary">I</td>
                        <td class="font-semibold">Information Integration Engine</td>
                        <td>Ensures every piece of raw data is validated, classified, and available instantly to authorized personnel.</td>
                    </tr>
                    <tr>
                        <td class="font-bold text-xl text-primary">N</td>
                        <td class="font-semibold">National Security Nexus</td>
                        <td>Serves as the single, authoritative source of truth, linking intelligence from various units.</td>
                    </tr>
                    <tr>
                        <td class="font-bold text-xl text-primary">E</td>
                        <td class="font-semibold">Executive Decision Enabled</td>
                        <td>Presents complex data through intuitive, Predicate-Subject driven dashboards, ensuring swift action.</td>
                    </tr>
                    <tr>
                        <td class="font-bold text-xl text-primary">L</td>
                        <td class="font-semibold">Location Linkage & Logistics</td>
                        <td>Correlates geospatial data with operational planning, optimizing resource deployment and logistics.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <section class="prose max-w-none">
        <h2 class="text-3xl font-bold text-base-content mb-4 border-b border-primary/50 pb-2">
            The Compelling Case for Immediate Funding
        </h2>

        <p class="lead text-lg">
            The argument for funding the AFP SENTINEL is fundamentally a matter of efficiency, operational risk mitigation, and national security efficacy.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div class="card bg-base-100 shadow-xl p-6 border-l-8 border-error">
                <h3 class="text-xl font-bold text-error">1. Decisive Action, Not Delayed Reaction</h3>
                <p>
                    Current intelligence operations often rely on paper reports and manual processing, leading to delays that can be fatal. The SENTINEL system cuts the "time-to-decision" from days to minutes. By enabling commanders to filter for specific Threat Levels (PREDICATE) and instantly view related Target Assets (SUBJECT), the system allows for proactive intervention rather than costly, delayed reaction.
                </p>
            </div>

            <div class="card bg-base-100 shadow-xl p-6 border-l-8 border-warning">
                <h3 class="text-xl font-bold text-warning">2. Maximizing Scarce Resources</h3>
                <p>
                    The AFP operates with finite manpower and intelligence assets. SENTINEL ensures that every collection plan, every surveillance task, and every intelligence officer's time is optimized. By mapping Asset Coverage against Threat Requirements, the system automatically highlights intelligence gaps and redundancies, ensuring that valuable resources are deployed precisely where the risk is highest. This is the definition of achieving a force multiplier through technology.
                </p>
            </div>

            <div class="card bg-base-100 shadow-xl p-6 border-l-8 border-success">
                <h3 class="text-xl font-bold text-success">3. Building an Integrated Digital Defense</h3>
                <p>
                    The system is built on a resilient and scalable RDBMS structure, designed to integrate with future platforms (including local government emergency systems, similar to the solutions you are developing for LGUs). This investment is not a short-term fix; it is the foundational digital infrastructure that positions the AFP to dominate the modern security landscape for the next generation.
                </p>
            </div>
        </div>

        <p class="mt-8 text-xl font-bold text-base-content">
            Funding the AFP SENTINEL is an investment in sovereign capability, ensuring that those tasked with national defense have the most powerful, intelligent, and immediate information available to protect the Filipino people.
        </p>
    </section>
</div>