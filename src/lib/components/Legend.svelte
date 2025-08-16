<script lang="ts">
	// src/lib/components/Legend.svelte
	import { legendStore } from '$lib/stores';
	import { LegendItem } from '$lib/components';
	import { get } from 'svelte/store';
	import type { InteractiveLayer, Legend } from '$lib/types';

	export let interactiveLayer: InteractiveLayer;

	const currentLegendStore = get(legendStore)
	if (!currentLegendStore[interactiveLayer.id]) {
		legendStore.addMap(interactiveLayer.id)
	}
</script>

<ul class="flex w-96 list-none flex-col gap-2 p-2">
	<!-- convert Mapped Records to array of values, each being a legend item -->
	{#each Object.values($legendStore[interactiveLayer.id]) as item (item.id)}
		<LegendItem {item} {interactiveLayer} />
	{/each}
</ul>
