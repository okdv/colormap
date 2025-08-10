<script lang="ts"></script>
<div class="group relative">
    <a href="#">
        <slot name="link" />
    </a>
    <div class="hidden group-hover:block absolute top-full">
        <slot name="body" />
    </div>
</div>