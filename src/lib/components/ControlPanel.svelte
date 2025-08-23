<script lang="ts">
	// src/lib/components/ControlPanel.svelte
	import { Legend, Toolbar } from '$lib/components';
	import type { InteractiveLayer } from '$lib/types';

	export let interactiveLayer: InteractiveLayer;
</script>

<div class="absolute right-6 bottom-6 z-1000 rounded-md border-1 border-gray-300 bg-white shadow-lg">
	<Toolbar {interactiveLayer} />
	<Legend {interactiveLayer} />
</div>
