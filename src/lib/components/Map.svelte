<script lang="ts">
	// src/lib/components/Map.svelte
	import { onMount } from 'svelte';
	import { cleanupMap, initMapAndLayers } from '$lib/services';
	import { ControlPanel } from '$lib/components';
	/**
	 * Map Component
	 * @description Renders the leaflet map, base layer and features geojson on the client side (onMount)
	 * @todo dynamically set base layer
	 * @todo dynamically set features layer geojson
	 */

	let mapContainer: HTMLDivElement;

	// onMount so this doesnt get SSR'd, only happens on the client side
	onMount(async () => {
		// load geojson
		const res = await fetch(`/data/us_counties_2023.geojson`);
		const geojson = await res.json();

		// initialize map and layers
		initMapAndLayers(mapContainer, geojson);

		// cleanup on unmount
		return cleanupMap();
	});
</script>

<ControlPanel />
<div bind:this={mapContainer} class="h-screen w-full" id="map-container"></div>
