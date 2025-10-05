<script lang="ts">
  import { config } from './project_Config';
  const features: string[] = config.map(route => route.title);
</script>

<div class="flex flex-col items-center w-full container mx-auto p-4 md:p-6">
  <div class="max-w-5xl w-full">
    <div class="hero rounded-box shadow-2xl mb-8 overflow-hidden bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 anim-fade-in-up-scale">
      <div class="hero-content text-center p-8 md:p-16">
        <div class="max-w-lg">
          <h1 class="text-3xl md:text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary pb-2">
            Welcome to Metro Manila Development Authority
          </h1>
          <p class="py-6 text-base-content/80 leading-relaxed">
            Your one-stop shop for local government services, announcements, and information.
          </p>
        </div>
      </div>
    </div>
    <div class="card bg-base-100 shadow-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div class="card-body">
        <h2 class="card-title text-2xl">Core Digital Services</h2>
        <div class="divider my-2"></div>
        <ul class="list-none space-y-2">
          {#each features as feature}
            <li class="flex items-start p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="h-6 w-6 mr-3 mt-1 text-primary flex-shrink-0">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>{feature}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>
