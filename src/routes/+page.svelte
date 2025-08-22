<script lang="ts">
	import type { LayoutData } from "./$types";

	// src/routes/+page.svelte

	export let data: LayoutData;
</script>

<!-- height = screenheight minus heigh of navbar (4rem / h-16)-->
<div class="h-[calc(100vh-4rem)]">
	<header>
		<div class="text-center">
			<h1 class="text-3xl">Choose a Layer to Create Your Own Map</h1>
			<p class="text-xl">Select features, like states and counties, on one of our interactive map layers to color them in per your own custom legend. Whether you're looking to graph political data or just visualize all those places you've roadtripped, you can get started in seconds. 100% free and open-source, no signups, no ads, no tracking, just a simple tool that runs right in your browser.</p>
		</div>
		<ul class="flex justify-around">
			{#each data.interactiveLayers as layer, i (i)}
				<a href="/map/{layer.id}">
					<li>
						<h3 class="text-2xl">{layer.name}</h3>
					</li>
				</a>
			{/each}
		</ul>
	</header>
	<main>
		<section>
			<h2 class="text-3xl">Getting Started</h2>
			{@html data.sections.readme}
		</section>
		<section>
			<h2 class="text-3xl">Want to help?</h2>
			{@html data.sections.contributing}
		</section>
	</main>
	<footer>
		<div class="text-center text-lg">
			<span>{new Date().getFullYear()} &copy; <a href="https://otho.dev" class="transition-all duration-300 ease-in-out hover:text-blue-800">otho.dev</a></span>
		</div>
	</footer>
</div>
