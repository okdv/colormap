<script lang="ts">
	import type { LayoutData } from './$types';

	// src/routes/+page.svelte

	export let data: LayoutData;
</script>

<!-- height = screenheight minus heigh of navbar (4rem / h-16)-->
<div class="h-[calc(100vh-4rem)]">
	<header class="bg-zinc-100 p-2 shadow">
		<div class="space-y-2 text-center">
			<h1 class="text-3xl font-bold text-blue-700">Choose a Layer to Create Your Own Map</h1>
			<hr class="mx-auto w-64" />
			<p class="mx-auto max-w-6xl text-xl">
				Select features, like states and counties, on one of our interactive map layers to color them in per your own custom legend. Whether you're
				looking to graph political data or just visualize all those places you've roadtripped, you can get started in seconds. 100% free and
				open-source, no signups, no ads, no tracking, just a simple tool that runs right in your browser.
			</p>
		</div>
		<ul class="flex justify-center gap-20 p-2">
			{#each data.interactiveLayers as layer, i (i)}
				{#if layer.id !== 'custom'}
					<a href="/map/{layer.id}">
						<li>
							<button
								on:click={() => legendStore.clearMap(interactiveLayer.id)}
								class="cursor-pointer rounded-sm border-2 border-solid border-blue-700 p-2 font-semibold text-blue-700 shadow-xl transition-all duration-300 ease-in-out hover:bg-blue-700 hover:text-white hover:shadow"
							>
								<h3 class="text-2xl">{layer.name}</h3>
							</button>
						</li>
					</a>
				{/if}
			{/each}
		</ul>
	</header>
	<main class="space-y-6 p-2">
		<section class="container mx-auto rounded-xl bg-zinc-100 shadow-2xl" id="get-started">
			<div class="rounded-t-xl bg-zinc-800 p-2 text-zinc-50 shadow">
				<h2 class="text-center text-3xl">Getting Started</h2>
			</div>
			<div class="space-y-2 p-2 text-lg">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html data.sections.readme}
			</div>
		</section>
		<section class="container mx-auto rounded-xl bg-zinc-100 shadow-2xl" id="contributing">
			<div class="rounded-t-xl bg-zinc-800 p-2 text-zinc-50 shadow">
				<h2 class="text-center text-3xl">Want to help?</h2>
			</div>
			<div class="space-y-2 p-2 text-lg">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html data.sections.contributing}
			</div>
		</section>
	</main>
	<footer class="bg-zinc-800 p-2 text-zinc-50 shadow-2xl">
		<div class="text-center text-lg">
			<span
				>{new Date().getFullYear()} &copy;
				<a href="https://otho.dev" class="transition-all duration-300 ease-in-out hover:text-blue-800">otho.dev</a></span
			>
		</div>
	</footer>
</div>
