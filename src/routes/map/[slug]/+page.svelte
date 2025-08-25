<script lang="ts">
	// src/routes/+page.svelte
	import { Map } from '$lib/components';
	import { currentInteractiveLayerStore } from '$lib/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ geojson, layerMetadata } = data);

	$: if (layerMetadata) {
		currentInteractiveLayerStore.set(layerMetadata);
	}
</script>

<svelte:head>
	<title>{layerMetadata.name}</title>
</svelte:head>

<!-- height = screenheight minus heigh of navbar (4rem / h-16)-->
<section class="h-[calc(100vh-4rem)]">
	<Map interactiveLayer={layerMetadata} {geojson} />
</section>
