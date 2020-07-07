<script>
  import OmoProfile from "./../3-organisms/OmoProfile";
  import OmoHandbook from "./../3-organisms/OmoHandbook";
  import OmoAsideMainLayout from "./../4-layouts/OmoAsideMainLayout";

  import RedThing from "./1.svx";
  import GreenThing from "./2.svx";
  import BlueThing from "./3.svx";

  const blogs = [
    { text: "red", component: RedThing },
    { text: "green", component: GreenThing },
    { text: "blue", component: BlueThing }
  ];
  let selected = blogs[0];
</script>

<OmoAsideMainLayout>
  <div slot="left">
    <OmoProfile />
    {#each blogs as blog}
      <button on:click={() => (selected = blog)}>{blog.text}</button>
    {/each}
  </div>
  <div slot="right">
    <OmoHandbook>
      <svelte:component this={selected.component} />
    </OmoHandbook>
  </div>
</OmoAsideMainLayout>
