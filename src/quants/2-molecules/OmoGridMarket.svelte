<script>
  import {observe} from "svelte-observable";
  import OmoCardProduct from "./OmoCardProduct.svelte";
  import {Products} from "../../queries/omo/dreams/products";

  export let category;

  let omoproducts = observe(Products.all(category));
  $: {
    omoproducts = observe(Products.all(category));
  }
</script>

<div class="px-4 py-4 md:p-16 lg:py-20 lg:px-32 overflow-y-scroll">

  <section
    class="grid gap-10 mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

    {#await $omoproducts}
      loading..
    {:then omoproducts}
      {#each omoproducts as data}
          <OmoCardProduct {data} />
      {/each}
    {/await}
  </section>

</div>
