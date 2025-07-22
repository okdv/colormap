<script>
    // src/lib/components/Toolbar.svelte

	import { legendStore } from "$lib/stores/legend";
	import { LegendItem } from "$lib/types/legend";

</script>
<div class="bg-gray-200 p-2 rounded-t-md">
    <button class="p-1 rounded-sm cursor-pointer transition-all duration-300 ease-in-out text-green-500 hover:bg-green-500 hover:text-white" on:click={() => legendStore.addItem(new LegendItem())}>
        <i class="fa-solid fa-plus"></i>
        <span>Add</span>
    </button>
    <button class="p-1 rounded-sm cursor-pointer transition-all duration-300 ease-in-out text-red-500 hover:bg-red-500 hover:text-white" on:click={() => {
        legendStore.clearItems();
        }}>
        <i class="fa-solid fa-arrow-rotate-right"></i>
        <span>Clear</span>
    </button>
</div>