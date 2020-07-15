<script>
  import OmoOrganism from "./OmoOrganism";
  import OmoMolecule from "./OmoMolecule";
  export let dapp = {
    layout: {
      areas: "'full'",
      columns: "1fr",
      rows: "1fr"
    },
    blocks: [
      {
        type: "molecule",
        slot: "molecule",
        quant: OmoMolecule,
        data: { name: "I am an block" }
      },
      {
        type: "organism",
        slot: "organims",
        layout: layout,
        blocks: []
      }
    ]
  };
</script>

<style>
  .dapp {
    height: 100%;
    display: grid;
    grid-template-areas: var(--areas);
    grid-template-columns: var(--columns);
    grid-template-rows: var(--rows);
    overflow: hidden;
  }
</style>

<section
  class="dapp"
  style="--areas: {dapp.layout.areas}; --columns: {dapp.layout.columns}; --rows:
  {dapp.layout.rows}; ">
  {#each dapp.blocks as block}
    {#if block.type == 'molecule'}
      <OmoMolecule transfer={JSON.stringify(block)} />
    {:else}
      <OmoOrganism transfer={JSON.stringify(block)} />
    {/if}
  {/each}
</section>
