<script>
  import OmoCardDream from "../2-molecules/OmoCardDream.svelte";
  import { onMount } from "svelte";
  import OmoTabs from "./../2-molecules/OmoTabs.svelte";

  // List of tab items with labels and values.
  let tabItems = [
    { label: "Leap 1: Dreamers", value: 1 },
    { label: "Leap 2: Validators", value: 2 },
    { label: "Leap 3: Makers", value: 3 },
    { label: "Leap 4: OmoPreneurs", value: 4 },
    { label: "Leap 5: OmoVestors", value: 5 }
  ];

  // Current active tab
  let currentTab;

  let dreams = [];
  let votes = [];

  onMount(async () => {
    const seed = await fetch("https://www.randomtext.me/api/p-20/10-20")
      .then(response => response.json())
      .then(data => {
        var texts = data.text_out.split("<p>");
        fetch("https://randomuser.me/api?results=20")
          .then(response => response.json())
          .then(
            data =>
              (dreams = data.results.map((item, i) => {
                item.first = item.name.first;
                item.last = item.name.last;
                item.city = item.location.city;
                item.profile = item.picture.large;
                item.image = `https://source.unsplash.com/featured/?${item.location.city},city`;
                item.follower = Math.floor(Math.random() * 11 + 1);
                item.dream = texts[i + 1].replace("</p>", "");
                return item;
              }))
          );
      });
    const seed2 = await fetch("https://www.randomtext.me/api/p-20/10-20")
      .then(response => response.json())
      .then(data => {
        var texts = data.text_out.split("<p>");
        fetch("https://randomuser.me/api?results=20")
          .then(response => response.json())
          .then(
            data =>
              (votes = data.results.map((item, i) => {
                item.first = item.name.first;
                item.last = item.name.last;
                item.city = item.location.city;
                item.profile = item.picture.large;
                item.image = `https://source.unsplash.com/featured/?${item.location.city},city`;
                item.follower = Math.floor(Math.random() * 11 + 1);
                item.dream = texts[i + 1].replace("</p>", "");
                return item;
              }))
          );
      });
  });
</script>

<style>
  section {
    @apply grid gap-10 mx-auto overflow-y-scroll;
  }
</style>

<OmoTabs bind:activeTabValue={currentTab} items={tabItems} class="pb-4" />

{#if 1 === currentTab}
  <section
    class="px-4 py-4 md:p-12 lg:p-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {#each dreams as data, i (data.id)}
      <OmoCardDream {data} />
    {/each}
  </section>
{/if}

{#if 2 === currentTab}
  <section
    class="px-4 py-4 md:p-12 lg:p-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {#each dreams as data, i (data.id)}
      <OmoCardDream {data} />
    {/each}
  </section>
{/if}
