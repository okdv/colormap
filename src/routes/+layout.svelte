<script lang="ts">
	import { Footer, Navbar } from '$lib/components';
	import '../app.css';
</script>

<Navbar />
<main class="mt-16">
	<slot />
</main>
<Footer />
