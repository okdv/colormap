<script lang="ts">
	import { Navbar } from '$lib/components';
	import '../app.css';
</script>

<Navbar />
<!-- move main down by height of navbar-->
<main class="mt-16">
	<slot />
</main>
