<script lang="ts">
	import { Footer, Navbar } from '$lib/components';
	import '../app.css';
</script>

<Navbar />
<main>
	<slot />
</main>
<Footer />
