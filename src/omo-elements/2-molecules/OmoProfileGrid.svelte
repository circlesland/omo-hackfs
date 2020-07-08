<script>
  import OmoCard from "../2-molecules/OmoCard.svelte";
  export let logos = [];
</script>

<style>
  .wrap {
    @apply py-4 grid gap-3;
  }
</style>

<div class="wrap grid-cols-4 md:grid-cols-8">
  {#each logos as data, i (data.id)}
    <OmoCard {data} />
  {/each}
</div>
