<script lang="ts">
	import { UserCircle, User, LogOut, Settings } from 'lucide-svelte';
</script>

<div class="dropdown dropdown-end">
	<button type="button" aria-label="User Profile" class="btn btn-ghost btn-circle avatar">
		<div class="w-10 rounded-full text-primary">
			<UserCircle class="w-10 h-10" />
		</div>
	</button>
	<ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
		<li><button type="button" class="w-full justify-start"><User class="w-4 h-4 mr-2" /> Profile</button></li>
		<li><button type="button" class="w-full justify-start"><Settings class="w-4 h-4 mr-2" /> Settings</button></li>

		<div class="divider my-1"></div>

		<li><button type="button" class="w-full justify-start"><LogOut class="w-4 h-4 mr-2" /> Logout</button></li>
	</ul>
</div>