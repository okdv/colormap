<script>
	// src/lib/components/Toolbar.svelte

	import { legendStore } from '$lib/stores';
	import { LegendItem } from '$lib/types';
</script>

<div class="rounded-t-md border-b border-gray-300 bg-gray-100 p-2">
	<button
		class="cursor-pointer rounded-sm p-1 px-2 text-blue-600 transition-all duration-300 ease-in-out hover:bg-blue-400 hover:text-white"
		on:click={() => legendStore.addItem(new LegendItem())}
	>
		<i class="fa-solid fa-plus"></i>
		<span>New</span>
	</button>
	<button
		class="cursor-pointer rounded-sm p-1 px-2 text-red-400 transition-all duration-300 ease-in-out hover:bg-red-400 hover:text-white"
		on:click={() => {
			legendStore.clearItems();
		}}
	>
		<i class="fa-solid fa-arrow-rotate-right"></i>
		<span>Clear</span>
	</button>
</div>
