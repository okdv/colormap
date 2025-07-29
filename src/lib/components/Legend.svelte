<script>
	// src/lib/components/Legend.svelte
	import { legendStore } from '$lib/stores';
	import { LegendItem } from '$lib/components';
</script>

<ul class="flex w-96 list-none flex-col gap-2 p-2">
	<!-- convert Mapped Records to array of values, each being a legend item -->
	{#each Object.values($legendStore) as item (item.id)}
		<LegendItem {item} />
	{/each}
</ul>
