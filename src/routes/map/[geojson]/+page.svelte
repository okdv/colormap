<script lang="ts">
	import { Map } from '$lib/components';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<!-- height = screenheight minus heigh of navbar (4rem / h-16)-->
<section class="h-[calc(100vh-4rem)]">
	<Map interactiveLayer={data.geojson} />
</section>
