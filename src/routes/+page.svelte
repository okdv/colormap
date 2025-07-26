<script lang="ts">
	// src/routes/+page.svelte
	import { Map, Modal } from '$lib/components';
	import { showModal } from '$lib/stores';

</script>

<button on:click={() => showModal.set(true)}>Open</button>
<Modal bind:open={$showModal}>
	<div>
		body
	</div>
</Modal>
<Map />
