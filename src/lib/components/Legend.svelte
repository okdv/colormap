<script>
	// src/lib/components/Legend.svelte
	import { legendStore } from '$lib/stores';
	import { LegendItem } from '$lib/components';
</script>

<ul class="w-96 list-none p-2 gap-2 flex flex-col">
	<!-- convert Mapped Records to array of values, each being a legend item -->
	{#each Object.values($legendStore) as item}
		<LegendItem {item} />
	{/each}
</ul>
