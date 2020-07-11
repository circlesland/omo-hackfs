<script>
  import OmoCardDream from "../2-molecules/OmoCardDream.svelte";
  export let dreams = [];
</script>

<style>
  .wrap {
    @apply grid gap-10;
  }
</style>

<div
  class="wrap px-4 py-4 md:p-12 lg:p-20 grid-cols-1 md:grid-cols-2
  lg:grid-cols-3 mx-auto">
  {#each dreams as data, i (data.id)}
    <OmoCardDream {data} />
  {/each}
</div>
