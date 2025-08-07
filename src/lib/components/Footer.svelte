<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer class="flex justify-between rounded-b-md border-t border-gray-300 bg-gray-100 px-3 py-2 text-lg">
	<div>
		<div class="rounded-full bg-red-600 text-zinc-50 px-2 inline-block mr-2">
			<span>beta</span>
		</div>
		<a href="https://github.com/okdv/colormap" class="transition-all duration-300 ease-in-out hover:text-blue-800 inline-block">
			<i class="fa-brands fa-github fa-xl"></i>
		</a>
	</div>
	<span>{year} &copy; built by <a href="https://otho.dev" class="transition-all duration-300 ease-in-out hover:text-blue-800">otho</a></span>
</footer>
