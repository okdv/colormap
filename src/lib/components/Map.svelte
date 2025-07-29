<script lang="ts">
	/** src/lib/components/Map.svelte
	 * Map Component
	 * @description Renders the leaflet map, base layer and features geojson on the client side (onMount)
	 * @todo dynamically set base layer
	 */
	import { onMount } from 'svelte';
	import { cleanupMap, initMapAndLayers } from '$lib/services';
	import { ControlPanel } from '$lib/components';

	let mapContainer: HTMLDivElement;

	// onMount so this doesnt get SSR'd, only happens on the client side
	onMount(async () => {
		// initialize map and layers
		initMapAndLayers(mapContainer);

		// cleanup on unmount
		return cleanupMap();
	});
</script>

<ControlPanel />
<div bind:this={mapContainer} class="h-screen w-full" id="map-container"></div>
