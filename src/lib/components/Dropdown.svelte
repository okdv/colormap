<script lang="ts"></script>

<div class="group relative">
	<a href="#" class="transition duration-200 ease-in-out group-hover:text-yellow-400">
		<slot name="link" />
		<span>
			<i class="fa-solid fa-angle-down fa-sm transform transition-transform duration-200 ease-in-out group-hover:rotate-180"></i>
		</span>
	</a>
	<div
		class="absolute top-full z-1000 hidden w-64 -translate-x-48 overflow-hidden rounded-md bg-zinc-50 p-2 text-zinc-950 shadow-2xl ease-in-out group-hover:block"
	>
		<slot name="body" />
	</div>
</div>
