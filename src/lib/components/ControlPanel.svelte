<script lang="ts">
    // src/lib/components/ControlPanel.svelte
    import Toolbar from '$lib/components/Toolbar.svelte';
	import Legend from '$lib/components/Legend.svelte';
</script>

<div class="absolute bottom-4 right-4 bg-white rounded-md z-1000">
    <Toolbar />
    <Legend />
</div>