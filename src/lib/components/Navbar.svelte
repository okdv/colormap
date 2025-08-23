<script lang="ts">
	import { Dropdown } from '$lib/components';
	import type { InteractiveLayer } from '$lib/types';

	export let interativeLayers: InteractiveLayer[] = [];
</script>

<header id="navbar" class="border-zinc-750 fixed top-0 z-1000 flex h-16 w-full justify-between border-b bg-zinc-950 p-2 text-zinc-50 shadow-2xl">
	<div class="flex items-center justify-center">
		<a href="/">
			<img src="/logo.svg" alt="colormap.app logo" class="h-12 w-12" />
		</a>
		<a href="/">
			<h2 class="mt-1 text-2xl font-bold text-yellow-400">colormap<span class="text-red-600">.</span><span class="text-green-400">app</span></h2>
		</a>
		<p class="mx-2 mt-2">
			- built by <a href="https://otho.dev" class="transition-all duration-300 ease-in-out hover:text-green-400">otho</a> &
			<a href="https://github.com/okdv/colormap/graphs/contributors" class="transition-all duration-300 ease-in-out hover:text-yellow-400"
				>contributors</a
			>
		</p>
		<div class="mt-2 rounded-full bg-red-600 px-2 text-sm font-bold text-zinc-50"><span>beta</span></div>
	</div>
	<nav class="flex items-center justify-between gap-4 text-xl">
		<Dropdown>
			<span slot="link">Maps</span>
			<div slot="body" id="navbar-dropdown-body">
				<ul>
					{#each interativeLayers as layer, i (i)}
						{#if layer.id !== "custom"}
							<li class="cursor-pointer transition-all duration-300 ease-in-out hover:text-blue-600" id="navbar-dropdown-entry-{i}">
								<a href="/map/{layer.id}" data-sveltekit-reload>{layer.name}</a>
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		</Dropdown>
		<a href="https://github.com/okdv/colormap" class="transition-all duration-300 ease-in-out hover:text-blue-800">
			<i class="fa-brands fa-github fa-xl"></i>
		</a>
	</nav>
</header>
