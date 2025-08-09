<script lang="ts">
	// src/routes/+page.svelte
	import { Map } from '$lib/components';
</script>

<!-- height = screenheight minus heigh of navbar (4rem / h-16)-->
<section class="h-[calc(100vh-4rem)]">
	<Map />
</section>