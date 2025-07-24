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

<li
	class:selected={$selectedItem?.id === item.id}
	on:click={() => selectedItem.set(item)}
	class={`m-1 flex h-10 cursor-pointer justify-between gap-2 rounded-sm p-1 transition-all duration-300 ease-in-out ${$selectedItem?.id === item.id ? 'bg-amber-200' : 'bg-none hover:bg-amber-100'}`}
>
	<div class="inline-flex w-full items-center gap-2">
		<input
			class="h-10 w-9 appearance-none rounded-lg border-none outline-none"
			id={`item-color-${item.id}`}
			type="color"
			bind:value={item.color}
			on:change={() => updateItem(item)}
		/>
		<input id={`item-name-${item.id}`} type="text" bind:value={item.name} on:change={() => updateItem(item)} placeholder="Name..." minlength="1" />
	</div>
	<div class="inline-flex items-center gap-1">
		<button
			class="aspect-square cursor-pointer rounded-sm text-red-700 transition-all duration-300 ease-in-out hover:bg-red-700 hover:text-white"
			on:click={() => deleteItem(item)}
		>
			<i class="fa-solid fa-x w-7"></i>
		</button>
	</div>
</li>
