<script lang="ts">
	import { Dropdown } from "$lib/components";


</script>

<header class="w-full h-16 fixed top-0 z-1000 flex justify-between border-b border-zinc-750 bg-zinc-950 p-2 text-zinc-50 shadow-2xl">
    <div class="flex items-center justify-center">
        <a href="https://colormap.app" >
            <img src="/logo.svg" alt="colormap.app logo" class="h-12 w-12" />
        </a>
        <a href="https://colormap.app">
            <h2 class="mt-1 text-yellow-400 text-2xl font-bold">colormap<span class="text-red-600">.</span><span class="text-green-400">app</span></h2>
        </a>
        <p class="mx-2 mt-2"> - built by <a href="https://otho.dev" class="transition-all duration-300 ease-in-out hover:text-green-400">otho</a> & <a href="https://github.com/okdv/colormap/graphs/contributors" class="transition-all duration-300 ease-in-out hover:text-yellow-400">contributors</a></p>
        <div class="mt-2 rounded-full bg-red-600 text-zinc-50 px-2 text-sm font-bold"><span>beta</span></div>
    </div>
    <nav class="flex justify-between gap-4 items-center text-xl">
        <Dropdown>
            <span slot="link">Maps</span>
            <div slot="body">test</div>
        </Dropdown>
        <a href="https://github.com/okdv/colormap" class="transition-all duration-300 ease-in-out hover:text-blue-800">
            <i class="fa-brands fa-github fa-xl"></i>
        </a>
    </nav>
</header>