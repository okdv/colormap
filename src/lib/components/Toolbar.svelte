<script>
	// src/lib/components/Toolbar.svelte

	import { legendStore } from '$lib/stores';
	import { LegendItem } from '$lib/types';
</script>

<div class="rounded-t-md bg-gray-200 p-2">
	<button
		class="cursor-pointer rounded-sm p-1 text-green-500 transition-all duration-300 ease-in-out hover:bg-green-500 hover:text-white"
		on:click={() => legendStore.addItem(new LegendItem())}
	>
		<i class="fa-solid fa-plus"></i>
		<span>Add</span>
	</button>
	<button
		class="cursor-pointer rounded-sm p-1 text-red-500 transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white"
		on:click={() => {
			legendStore.clearItems();
		}}
	>
		<i class="fa-solid fa-arrow-rotate-right"></i>
		<span>Clear</span>
	</button>
</div>
