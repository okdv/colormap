<script lang="ts">
	import { Navbar } from '$lib/components';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Navbar interativeLayers={data.interactiveLayers} />
<!-- move main down by height of navbar-->
<main class="mt-16">
	<slot />
</main>
