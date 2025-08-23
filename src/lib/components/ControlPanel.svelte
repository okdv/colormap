<script lang="ts">
	// src/lib/components/ControlPanel.svelte
	import { Legend, Toolbar } from '$lib/components';
	import type { InteractiveLayer } from '$lib/types';

	export let interactiveLayer: InteractiveLayer;
</script>

<div class="absolute bottom-6 w-full sm:w-10/12 sm:right-1/12 md:w-auto md:right-6 z-1000 sm:rounded-md border-1 border-gray-300 bg-white shadow-lg">
	<Toolbar {interactiveLayer} />
	<Legend {interactiveLayer} />
</div>
