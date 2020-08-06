<script>
  import OmoCardDream from "../2-molecules/OmoCardDream.svelte";
  import { onMount } from "svelte";
  import {Dreams} from "../../queries/omo/dreams/dreams";
  import {observe} from "svelte-observable";

  let omodreams = observe(Dreams.all());


/*

              (omodreams = data.results.map((item, i) => {
                item.first = item.name.first;
                item.last = item.name.last;
                item.city = item.location.city;
                item.profile = item.picture.large;
                item.image = `https://source.unsplash.com/featured/?${item.location.city},city`;
                item.follower = Math.floor(Math.random() * 11 + 1);
                item.dream = texts[i + 1].replace("</p>", "");
                return item;

 */

</script>

<style>
  section {
    @apply grid gap-10 mx-auto;
  }
</style>

<!-- <OmoTabs bind:activeTabValue={currentTab} items={tabItems} class="pb-4" /> -->

<div class="px-4 py-4 md:p-16 lg:py-20 lg:px-32 overflow-y-scroll">

  <section class=" grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

    {#await $omodreams}
      loading..
    {:then omodreams}
      {#each omodreams as data}
        <OmoCardDream {data} />
      {/each}
    {/await}
  </section>

</div>
