<script>
  import { onMount } from "svelte";
  import mocker from "mocker-data-generator";
  import OmoNavTabs from "./../2-molecules/OmoNavTabs";
  import OmoGridVoting from "./../2-molecules/OmoGridVoting";
  import OmoGridDreams from "./../2-molecules/OmoGridDreams";
  import OmoGridOrgas from "./../2-molecules/OmoGridOrgas";
  import OmoGridPreOrders from "./../2-molecules/OmoGridPreOrders";
  import OmoGridProducts from "./../2-molecules/OmoGridProducts";
  import OmoCarousel from "./../2-molecules/OmoCarousel";
  import OmoHero from "./../2-molecules/OmoHero";

  //Tabs
  let currentTab;

  let tabItems = [
    { label: "Unlock Dreams", value: 1, icon: "fa-lightbulb" },
    {
      label: "Pre-Order",
      value: 2,
      icon: "fa-shopping-cart"
    },
    { label: "Marketplace", value: 3, icon: "fa-store" },
    {
      label: "Vote 2 Fund",
      value: 4,
      icon: "fa-vote-yea"
    },
    { label: "Organisations", value: 5, icon: "fa-users" },
    { label: "Cities", value: 6, icon: "fa-city" }
  ];

  $: countries = [];
  $: cities = [];
  $: industries = [];

  var schemaCountry = {
    name: {
      faker: "address.country"
    }
  };

  var schemaCity = {
    name: {
      faker: "address.city"
    }
  };

  var schemaIndustry = {
    name: {
      values: [
        "---"
      ]
    }
  };

  onMount(async () => {
    mocker()
      .schema("countries", schemaCountry, 5)
      .schema("cities", schemaCity, 7)
      .schema("industries", schemaIndustry, 8)
      .build()
      .then(data => {
        countries = data.countries;
        cities = data.cities;
        industries = data.industries;
      });
  });

  // const herodreams = {
  //   title: "quick introduction to dreams",
  //   subline: "more detail description"
  // };
</script>

<style>
  section {
    display: grid;
    grid-template-areas: "'aside main'";
    grid-template-rows: 1fr;
    grid-template-columns: 14rem 1fr;
    @apply h-full;
    overflow: hidden;
  }
  aside {
    grid-area: "aside";
  }
  main {
    grid-area: "main";
  }

  .wrap {
    @apply p-10 grid gap-3;
  }
</style>

<section>
  <aside class="h-full overflow-y-scroll">
    <OmoNavTabs bind:activeTabValue={currentTab} items={tabItems} />
  </aside>
  <main class="h-full overflow-y-scroll">
    {#if 1 === currentTab}
      <OmoCarousel />
      <!-- <OmoHero data={herodreams} /> -->
      <OmoGridDreams />
    {/if}
    {#if 2 === currentTab}
      <OmoCarousel />
      <OmoGridPreOrders />
    {/if}
    {#if 3 === currentTab}
      <OmoCarousel />
      <OmoGridProducts />
    {/if}
    {#if 4 === currentTab}
      <OmoCarousel />
      <OmoGridVoting />
    {/if}
    {#if 5 === currentTab}
      <OmoCarousel />
      <OmoGridOrgas />
    {/if}
    {#if 6 === currentTab}
      <OmoCarousel />
      <OmoGridOrgas />
    {/if}
  </main>
</section>
