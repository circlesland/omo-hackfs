<script>
  import OmoMarkdown from "./../3-organisms/OmoMarkdown";
  import OmoAsideMainLayout from "./../4-layouts/OmoAsideMainLayout";

  import Overview from "./../../omo-docs/Overview.svx";
  import Introduction from "./../../omo-docs/Introduction.svx";
  import OmoEarthPOC from "./../../omo-docs/OmoEarthPOC.svx";
  import OmoIdentity from "./../../omo-docs/OmoIdentity.svx";
  import OmoBlocks from "./../../omo-docs/OmoBlocks.svx";
  import DesignSystem from "./../../omo-docs/DesignSystem.svx";
  import ModelDesigner from "./../../omo-docs/ModelDesigner.svx";
  import GraphQLEditor from "./../../omo-docs/GraphQLEditor.svx";
  import DataStore from "./../../omo-docs/DataStore.svx";
  import Circles from "./../../omo-docs/Circles.svx";

  const blogs = [
    { text: "Overview", component: Overview },
    { text: "Introduction", component: Introduction },
    { text: "Odentity", component: OmoIdentity },
    { text: "OmoEarthPOC", component: OmoEarthPOC },
    { text: "Design System", component: DesignSystem },
    { text: "Omo Blocks", component: OmoBlocks },
    { text: "Model Designer", component: ModelDesigner },
    { text: "GraphQL Editor", component: GraphQLEditor },
    { text: "Data Store", component: DataStore },
    { text: "Circles UBI Protocol", component: Circles }
  ];
  let selected = blogs[0];
</script>

<style>
  .list {
    @apply py-4 px-6 bg-gray-100 h-full;
  }
  .item {
    @apply text-lg;
  }
</style>

<OmoAsideMainLayout>
  <div slot="left">
    <ul class="list">
      {#each blogs as blog}
        <li
          class="item hover:text-green-500"
          on:click={() => (selected = blog)}>
          {blog.text}
        </li>
      {/each}
    </ul>
  </div>

  <div slot="right">
    <OmoMarkdown>
      <svelte:component this={selected.component} />
    </OmoMarkdown>
  </div>
</OmoAsideMainLayout>
