<script lang="ts">
import type { LayoutData } from "./$types";

	// src/routes/+page.svelte

	export let data: LayoutData;
</script>

<!-- height = screenheight minus heigh of navbar (4rem / h-16)-->
<div class="h-[calc(100vh-4rem)]">
	<header class="p-2 bg-zinc-100 shadow">
		<div class="text-center space-y-2">
			<h1 class="text-3xl font-bold text-blue-700">Choose a Layer to Create Your Own Map</h1>
			<hr class="w-64 mx-auto" />
			<p class="text-xl max-w-6xl mx-auto">Select features, like states and counties, on one of our interactive map layers to color them in per your own custom legend. Whether you're looking to graph political data or just visualize all those places you've roadtripped, you can get started in seconds. 100% free and open-source, no signups, no ads, no tracking, just a simple tool that runs right in your browser.</p>
		</div>
		<ul class="flex justify-center gap-20 p-2">
			{#each data.interactiveLayers as layer, i (i)}
				<a href="/map/{layer.id}">
					<li>
						<button on:click={() => legendStore.clearMap(interactiveLayer.id)} class="cursor-pointer shadow-xl font-semibold rounded-sm p-2 border-2 border-solid border-blue-700 text-blue-700 transition-all duration-300 ease-in-out hover:bg-blue-700 hover:text-white hover:shadow">
							<h3 class="text-2xl">{layer.name}</h3>
						</button>
					</li>
				</a>
			{/each}
		</ul>
	</header>
	<main class="p-2 space-y-6">
		<section class="container bg-zinc-100 rounded-xl shadow-2xl mx-auto">
			<div class="bg-zinc-800 text-zinc-50 p-2 rounded-t-xl shadow">
				<h2 class="text-3xl text-center">Getting Started</h2>
			</div>
			<div class="p-2 space-y-2 text-lg">
				{@html data.sections.readme}
			</div>
		</section>
		<section class="container bg-zinc-100 rounded-xl shadow-2xl mx-auto">
			<div class="bg-zinc-800 text-zinc-50 p-2 rounded-t-xl shadow">
				<h2 class="text-3xl text-center">Want to help?</h2>
			</div>
			<div class="p-2 space-y-2 text-lg">
				{@html data.sections.contributing}
			</div>
		</section>
	</main>
	<footer class="p-2 bg-zinc-800 text-zinc-50 shadow-2xl">
		<div class="text-center text-lg">
			<span>{new Date().getFullYear()} &copy; <a href="https://otho.dev" class="transition-all duration-300 ease-in-out hover:text-blue-800">otho.dev</a></span>
		</div>
	</footer>
</div>
