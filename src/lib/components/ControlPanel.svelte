<script lang="ts">
	// src/lib/components/ControlPanel.svelte
	import { Legend, Toolbar, ControlPanelFooter } from '$lib/components';
</script>

<div class="absolute right-4 bottom-4 z-1000 rounded-md border-1 border-gray-300 bg-white shadow-lg">
	<Toolbar />
	<Legend />
	<ControlPanelFooter />
</div>
