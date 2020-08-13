<script>
  import {onMount} from "svelte";
  import mocker from "mocker-data-generator";
  import OmoNavTabs from "./../2-molecules/OmoNavTabs";
  import OmoGridVoting from "./../2-molecules/OmoGridVoting";
  import OmoGridDreams from "./../2-molecules/OmoGridDreams";
  import OmoGridOrgas from "./../2-molecules/OmoGridOrgas";
  import OmoGridPreOrders from "./../2-molecules/OmoGridPreOrders";
  import OmoGridProducts from "./../2-molecules/OmoGridProducts";
  import OmoCarousel from "./../2-molecules/OmoCarousel";
  import OmoHero from "./../2-molecules/OmoHero";
  import OmoGridMarket from "../2-molecules/OmoGridMarket.svelte";

  //Tabs
  let currentTab;

  let tabItems = [
    {
      label: "Dreams",
      value: 1,
      icon: "fa-lightbulb"
    },
    {
      label: "Reservate",
      value: 2,
      icon: "fa-ticket-alt"
    },
    {
      label: "Pre-Order",
      value: 3,
      icon: "fa-shopping-cart"
    },
    {
      label: "Buy Token",
      value: 4,
      icon: "fa-coins"
    }
    //{ label: "Organisations", value: 5, icon: "fa-users" },
    //{ label: "Cities", value: 6, icon: "fa-city" }
  ];

  onMount(async () => {
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
      <OmoGridMarket category={currentTab} />
  </main>
</section>
