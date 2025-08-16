<script lang="ts">
	// src/routes/+page.svelte
	import { Map } from '$lib/components';
	import { currentInteractiveLayerStore } from '$lib/stores';
	import { get } from 'svelte/store';

	const currentInteractiveLayer = get(currentInteractiveLayerStore)
</script>

<!-- height = screenheight minus heigh of navbar (4rem / h-16)-->
<section class="h-[calc(100vh-4rem)]">
	{#if currentInteractiveLayer}
		<Map interactiveLayer={currentInteractiveLayer} />
	{/if}
</section>
