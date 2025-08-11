<script lang="ts">
	import { Map } from '$lib/components';
    export let data; 
</script>

<!-- height = screenheight minus heigh of navbar (4rem / h-16)-->
<section class="h-[calc(100vh-4rem)]">
	<Map />
</section>