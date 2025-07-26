<script lang="ts">
	// src/routes/+page.svelte
	import { Map, Modal } from '$lib/components';
	import { showModal } from '$lib/stores';
</script>

<Modal bind:open={$showModal}>
	<div>Modal</div>
</Modal>
<Map />
