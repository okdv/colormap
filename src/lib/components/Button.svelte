<script lang="ts">

    export let handleClick: () => void; 
</script>
<button
    class="cursor-pointer rounded-sm p-1 px-2 text-red-400 transition-all duration-300 ease-in-out hover:bg-red-400 hover:text-white"
    on:click={handleClick}
>
    <slot></slot>
</button>