<script lang="ts">
    /**
     * This component is auto-generated.
     * Props are defined in the 'props' object below.
     */

    // A single export 'props' for easy management.
    export let props = {
    customClass: "",
    title: "Default Title",
    description: "Default Description"
    };
</script>


<div class="project-card">
  <div class="project-card-body">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div>
        <h2 class="project-card-title">{props.title || 'Event Calendar'}</h2>
        <p class="project-card-description">{props.description || 'View and manage scheduled events.'}</p>
      </div>
      <button class="btn btn-primary btn-sm normal-case w-full sm:w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        Schedule New Event
      </button>
    </div>
    <div class="project-card-divider"></div>
    <div class="flex items-center justify-between">
        <div class="join">
            <button class="join-item btn btn-sm">«</button>
            <button class="join-item btn btn-sm">»</button>
        </div>
        <h3 class="text-xl font-bold">September 2025</h3>
        <div class="join">
            <button class="join-item btn btn-sm btn-active">Month</button>
            <button class="join-item btn btn-sm">Week</button>
            <button class="join-item btn btn-sm">Day</button>
        </div>
    </div>
    <div class="grid grid-cols-7 gap-2 text-center text-sm mt-4">
      <div class="font-bold text-base-content/50">Sun</div><div class="font-bold text-base-content/50">Mon</div><div class="font-bold text-base-content/50">Tue</div><div class="font-bold text-base-content/50">Wed</div><div class="font-bold text-base-content/50">Thu</div><div class="font-bold text-base-content/50">Fri</div><div class="font-bold text-base-content/50">Sat</div>
      
      <div class="p-2 border rounded-lg text-base-content/30">31</div>
      <div class="p-2 border rounded-lg">1</div><div class="p-2 border rounded-lg">2</div><div class="p-2 border rounded-lg">3</div>
      <div class="p-2 border rounded-lg bg-accent/20">4</div>
      <div class="p-2 border rounded-lg">5</div><div class="p-2 border rounded-lg">6</div>
      <div class="p-2 border rounded-lg">7</div><div class="p-2 border rounded-lg">8</div><div class="p-2 border rounded-lg">9</div><div class="p-2 border rounded-lg">10</div><div class="p-2 border rounded-lg">11</div><div class="p-2 border rounded-lg">12</div><div class="p-2 border rounded-lg">13</div>
      <div class="p-2 border rounded-lg">14</div><div class="p-2 border rounded-lg">15</div><div class="p-2 border rounded-lg">16</div>
      <div class="p-2 border rounded-lg">17</div><div class="p-2 border rounded-lg ring ring-primary">18</div>
      <div class="p-2 border rounded-lg bg-secondary/20 tooltip" data-tip="Barangay Fiesta">19</div>
      <div class="p-2 border rounded-lg">20</div>
      <div class="p-2 border rounded-lg">21</div><div class="p-2 border rounded-lg">22</div><div class="p-2 border rounded-lg">23</div><div class="p-2 border rounded-lg">24</div><div class="p-2 border rounded-lg">25</div><div class="p-2 border rounded-lg">26</div><div class="p-2 border rounded-lg">27</div>
    </div>
  </div>
</div>
