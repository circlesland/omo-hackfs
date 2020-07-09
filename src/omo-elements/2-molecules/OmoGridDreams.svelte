<script>
  import OmoCardDream from "../2-molecules/OmoCardDream.svelte";
  export let dreams = [];
</script>

<style>
  .wrap {
    @apply p-4 grid gap-3;
  }
</style>

<div class="wrap grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
  {#each dreams as data, i (data.id)}
    <OmoCardDream {data} />
  {/each}
</div>
