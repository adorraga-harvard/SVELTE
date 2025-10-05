<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    // Dispatcher to send events to the parent component
    const dispatch = createEventDispatcher();
    
    let username = '';
    
    // Handles form submission, dispatches the username to the parent
    const handleSubmit = () => {
        dispatch('submit', { username });
    };
    
    // Handles the cancel button click, dispatches a cancel event
    const handleCancel = () => {
        dispatch('cancel');
    };
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Name</label>
        <input id="username" type="text" bind:value={username} required 
               class="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
    </div>
    <div class="flex justify-end space-x-4 mt-6">
        <button type="button" on:click={handleCancel}
                class="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-200">
            Cancel
        </button>
        <button type="submit"
                class="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Log In
        </button>
    </div>
</form>
