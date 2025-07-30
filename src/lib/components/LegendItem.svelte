<script lang="ts">
	// src/lib/components/LegendItem.svelte
	import { legendStore, selectedItem } from '$lib/stores';
	import type { LegendItem } from '$lib/types';

	export let item: LegendItem;

	const deleteItem = (item: LegendItem) => legendStore.removeItem(item.id);
	const updateItem = (item: LegendItem) => legendStore.updateItem(item);
</script>

<li>
	<div
		on:keyup={() => selectedItem.set(item)}
		role="button"
		tabindex="0"
		on:click={() => selectedItem.set(item)}
		class={`flex  h-11 ${$selectedItem?.id === item.id ? 'border border-gray-300 bg-gray-50' : 'bg-none hover:bg-gray-100'} cursor-pointer justify-between gap-2 rounded-sm p-1`}
	>
		<input
			class="aspect-square h-full w-8 appearance-none rounded-lg border-none outline-none"
			id={`item-color-${item.id}`}
			type="color"
			bind:value={item.color}
			on:change={() => updateItem(item)}
		/>
		<input
			class="w-full cursor-pointer rounded-sm p-1 outline-gray-300 focus:outline-none"
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
	</div>
</li>
