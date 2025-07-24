<script lang="ts">
	// src/lib/components/LegendItem.svelte
	import { legendStore, selectedItem } from '$lib/stores';
	import type { LegendItem } from '$lib/types';

	export let item: LegendItem;

	// handle legend item being edited/saved
	let isEdit: boolean = false;
	const saveItem = (item: LegendItem) => {
		legendStore.updateItem(item);
	};

	const deleteItem = (item: LegendItem) => legendStore.removeItem(item.id);
	const updateItem = (item: LegendItem) => legendStore.updateItem(item);
</script>

<li class={`flex box-border h-11 cursor-pointer justify-between gap-2 rounded-sm p-1`}>
	<input
		class="h-full w-8 aspect-square appearance-none rounded-lg border-none outline-none"
		id={`item-color-${item.id}`}
		type="color"
		bind:value={item.color}
		on:change={() => updateItem(item)}
	/>
	<input
		class="w-full rounded-sm p-1 outline-gray-300 focus:outline-1"
		id={`item-name-${item.id}`}
		type="text"
		bind:value={item.name}
		on:change={() => updateItem(item)}
		placeholder="Name..."
		minlength="1"
	/>
	<button
		aria-label="delete legend item"
		class="aspect-square cursor-pointer rounded-sm text-red-400 transition-all duration-300 ease-in-out hover:bg-red-400 hover:text-white"
		on:click={() => deleteItem(item)}
	><i class="fa-solid fa-trash w-7"></i>
	</button>
</li>
