<script lang="ts">
	// src/lib/components/ControlPanel.svelte
	import { Legend, Toolbar } from '$lib/components';
	import type { InteractiveLayer } from '$lib/types';

	export let interactiveLayer: InteractiveLayer;
</script>

<div class="absolute bottom-6 z-1000 w-full border-1 border-gray-300 bg-white shadow-lg sm:right-1/12 sm:w-10/12 sm:rounded-md md:right-6 md:w-auto">
	<Toolbar {interactiveLayer} />
	<Legend {interactiveLayer} />
</div>
