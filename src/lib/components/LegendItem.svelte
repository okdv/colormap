<script lang="ts">
	// src/lib/components/LegendItem.svelte
	import { legendStore, selectedItem } from '$lib/stores';
	import type { LegendItem } from '$lib/types';

	export let item: LegendItem;

	// handle legend item being edited/saved
	let isEdit: boolean = false;
	const toggleEdit = () => (isEdit = !isEdit);
	const saveItem = (item: LegendItem) => {
		legendStore.updateItem(item);
		toggleEdit();
	};

	const deleteItem = (item: LegendItem) => legendStore.removeItem(item.id);

	const updateItem = (item: LegendItem) => legendStore.updateItem(item);
</script>

<li
	class:selected={$selectedItem?.id === item.id}
	on:click={() => selectedItem.set(item)}
	class={`m-1 flex h-10 cursor-pointer  justify-between gap-2 rounded-sm p-1 transition-all duration-300 ease-in-out ${$selectedItem?.id === item.id ? 'bg-amber-200' : 'bg-none hover:bg-amber-100'}`}
>
	{#if isEdit}
		<div class="inline-flex items-center gap-2">
			<input
				id={`item-color-${item.id}`}
				type="color"
				bind:value={item.color}
				on:change={() => updateItem(item)}
			/>
			<input
				id={`item-name-${item.id}`}
				type="text"
				bind:value={item.name}
				on:change={() => updateItem(item)}
				placeholder="Name..."
				minlength="1"
			/>
		</div>
		<div class="inline-flex items-center gap-2">
			<button
				class="w-6 cursor-pointer rounded-sm p-1 text-green-500 transition-all duration-300 ease-in-out hover:bg-green-500 hover:text-white"
				on:click={() => saveItem(item)}
			>
				<i class="fa-solid fa-check"></i>
			</button>
			<button
				class="w-6 cursor-pointer rounded-sm p-1 text-red-700 transition-all duration-300 ease-in-out hover:bg-red-700 hover:text-white"
				on:click={() => deleteItem(item)}
			>
				<i class="fa-solid fa-x"></i>
			</button>
		</div>
	{:else}
		<div class="inline-flex items-center gap-2">
			<div class="h-full w-8 rounded-sm" style={`background-color: ${item.color}`}></div>
			<span class="">{item.name}</span>
		</div>
		<div class="inline-flex items-center gap-2">
			<button
				class="w-6 cursor-pointer rounded-sm p-1 text-blue-700 transition-all duration-300 ease-in-out hover:bg-blue-700 hover:text-white"
				on:click={() => toggleEdit()}
			>
				<i class="fa-solid fa-pencil"></i>
			</button>
			<button
				class="w-6 cursor-pointer rounded-sm p-1 text-red-700 transition-all duration-300 ease-in-out hover:bg-red-700 hover:text-white"
				on:click={() => deleteItem(item)}
			>
				<i class="fa-solid fa-x"></i>
			</button>
		</div>
	{/if}
</li>
