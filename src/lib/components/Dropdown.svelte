<script lang="ts"></script>
<div class="group relative">
    <a href="#" class="transition duration-200 ease-in-out group-hover:text-yellow-400">
        <slot name="link" />
        <span>
            <i class="fa-solid fa-angle-down fa-sm transform group-hover:rotate-180 transition-transform duration-200 ease-in-out"></i>
        </span>
    </a>
    <div class="hidden group-hover:block absolute top-full bg-zinc-50 -translate-x-48 w-64 overflow-hidden p-2 z-1000 ease-in-out text-zinc-950 rounded-md shadow-2xl">
        <slot name="body" />
    </div>
</div>