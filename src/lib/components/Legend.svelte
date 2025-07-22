<script>
    // src/lib/components/Legend.svelte
	import { legendStore } from "$lib/stores/legend";
	import LegendItem from "$lib/components/LegendItem.svelte";
</script>
<ul class="list-none w-96 p-2">
    <!-- convert Mapped Records to array of values, each being a legend item -->
  {#each Object.values($legendStore) as item}
    <LegendItem item={item} />
  {/each}
</ul>