<script lang="ts">
    import { Spinner } from 'flowbite-svelte';
    export let isLoading:boolean = true;
</script>

{#if isLoading}
<div class="flex justify-center items-center w-full">
    <Spinner />

</div>
{:else}
    <slot />
{/if}
