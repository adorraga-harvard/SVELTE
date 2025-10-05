<script lang="ts">
  export let data;

  interface NavNode {
    slug: string;
    navTitle: string;
    icon?: string | null;
    children?: NavNode[];
  }

  const navigation: NavNode[] = Array.isArray(data?.navigation) ? data.navigation : [];
  const features: string[] = navigation.map(route => route.navTitle);
</script>

<div class="flex flex-col items-center w-full container mx-auto py-4 md:py-6 space-y-6">

  <!-- Hero Section -->
  <div class="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl animate-fade-in-up">
    <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 opacity-70 blur-xl scale-105"></div>
    <div class="relative bg-base-100/90 backdrop-blur-md rounded-2xl p-6 md:p-8 text-center">
      <h1 class="text-3xl md:text-4xl font-extrabold text-amber-400 tracking-tight"
          style="text-shadow: 2px 2px 8px rgba(0,0,0,0.6)">
        {data.friendlyName}
      </h1>
      <p class="mt-2 text-sm md:text-base text-base-content/90 leading-snug">
        {data.abstract}
      </p>
    </div>
  </div>

  <!-- Core Digital Services Grid -->
  <div class="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 justify-items-center animate-fade-in-up">
    {#each features as feature, idx}
      <div class="relative flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg
                  bg-gradient-to-tr from-white/95 to-base-200/95 dark:from-gray-800/90 dark:to-gray-700/90
                  border border-base-300 dark:border-base-600
                  hover:scale-105 hover:shadow-2xl transition-all duration-300 w-full max-w-[160px] h-32 text-center">
        <div class="absolute -top-4 w-12 h-12 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center shadow-md">
          <span class="text-lg font-bold text-primary/80">{idx + 1}</span>
        </div>
        <span class="mt-6 text-base md:text-lg font-semibold text-base-content dark:text-base-content/90 break-words">
          {feature}
        </span>
      </div>
    {/each}
  </div>

</div>
