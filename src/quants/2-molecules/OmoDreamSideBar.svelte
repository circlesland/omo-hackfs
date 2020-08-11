<script>
  import OmoNavTabs from "./OmoNavTabs.svelte";
  //Tabs
  export let subTab;
  let tabItems = [
    {
      label: "My transactions",
      value: 1,
      icon: "fa-exchange-alt",
      category: "general",
    },
    { label: "Token", value: 3, icon: "fa-coins" },
    {
      label: "Trust I receive",
      value: 4,
      icon: "fa-user-astronaut",
      category: "general",
    },
    {
      label: "Trust I give",
      value: 5,
      icon: "fa-user-ninja",
      category: "general",
    },
  ];
</script>

<style>
  section {
    display: grid;
    grid-template-areas: "'aside main'";
    grid-template-rows: 1fr;
    grid-template-columns: 20rem 1fr;
    @apply h-full;
    overflow: hidden;
  }

  aside {
    grid-area: "aside";
  }

  main {
    grid-area: "main";
  }
</style>

<section>
  <aside class="h-full overflow-y-scroll">
    <OmoNavTabs bind:activeTabValue={subTab} items={tabItems} />
  </aside>
</section>
