<script lang="ts">
    // src/lib/components/LegendItem.svelte
	import { legendStore, selectedItem } from '$lib/stores/legend';
	import type { LegendItem } from '$lib/types/legend';

	export let item: LegendItem;

    // handle legend item being edited/saved 
	let isEdit: boolean = false;
	const toggleEdit = () => isEdit = !isEdit;
	const saveItem = (item: LegendItem) => {
		legendStore.updateItem(item);
		toggleEdit();
	};
	
	const deleteItem = (item: LegendItem) => legendStore.removeItem(item.id);

	const updateItem = (item: LegendItem) => legendStore.updateItem(item)
</script>

<li
	class:selected={$selectedItem?.id === item.id}
	on:click={() => selectedItem.set(item)}
	class={`flex justify-between gap-2 cursor-pointer  transition-all duration-300 ease-in-out h-10 m-1 rounded-sm p-1 ${$selectedItem?.id === item.id ? 'bg-amber-200' : 'bg-none hover:bg-amber-100'}`}
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
			<button class="p-1 w-6 rounded-sm cursor-pointer transition-all duration-300 ease-in-out text-green-500 hover:bg-green-500 hover:text-white" on:click={() => saveItem(item)}>
				<i class="fa-solid fa-check"></i>
			</button>
			<button class="p-1 w-6 rounded-sm cursor-pointer transition-all duration-300 ease-in-out text-red-700 hover:bg-red-700 hover:text-white" on:click={() => deleteItem(item)}>
				<i class="fa-solid fa-x"></i>
			</button>
		</div>
	{:else}
	<div class="inline-flex items-center gap-2">
		<div class="rounded-sm h-full w-8" style={`background-color: ${item.color}`}></div>
			<span class="">{item.name}</span>
		</div>
		<div class="inline-flex items-center gap-2">
			<button class="p-1 w-6 rounded-sm cursor-pointer transition-all duration-300 ease-in-out text-blue-700 hover:bg-blue-700 hover:text-white" on:click={() => toggleEdit()}>
				<i class="fa-solid fa-pencil"></i>
			</button>
			<button class="p-1 w-6 rounded-sm cursor-pointer transition-all duration-300 ease-in-out text-red-700 hover:bg-red-700 hover:text-white" on:click={() => deleteItem(item)}>
				<i class="fa-solid fa-x"></i>
			</button>
		</div>
	{/if}
</li>
