<script lang="ts">
	/** src/lib/components/Map.svelte
	 * Map Component
	 * @description Renders the leaflet map, base layer and features geojson on the client side (onMount)
	 * @todo dynamically set base layer
	 */
	import { onMount } from 'svelte';
	import { cleanupMap, initMapAndLayers } from '$lib/services';
	import { ControlPanel } from '$lib/components';
	import type { InteractiveLayer } from '$lib/types';

	export let interactiveLayer: InteractiveLayer;

	let mapContainer: HTMLDivElement;

	// onMount so this doesnt get SSR'd, only happens on the client side
	onMount(async () => {
		// initialize map and layers
		initMapAndLayers(mapContainer);

		// cleanup on unmount
		return cleanupMap();
	});
</script>

<ControlPanel interactiveLayer={interactiveLayer} />
<div bind:this={mapContainer} class="h-full w-full" id="map-container"></div>
