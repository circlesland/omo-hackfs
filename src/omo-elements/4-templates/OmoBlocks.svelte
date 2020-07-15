<script>
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
  .blocks {
    height: 100%;
    display: grid;
    grid-template-areas: var(--areas);
    grid-template-columns: var(--columns);
    grid-template-rows: var(--rows);
    overflow: hidden;
  }
</style>

<section
  class="blocks"
  style="--areas: {dapp.layout.areas}; --columns: {dapp.layout.columns}; --rows:
  {dapp.layout.rows}; ">
  {#each dapp.blocks as block}
    {#if block.type == 'molecule'}
      <div
        style="grid-area: {block.slot}; display: grid; grid-template-columns:
        'minmax(1fr)'; grid-template-rows: 'minmax(1fr)'; overflow: hidden;">
        <svelte:component this={block.quant} data={block.data} />
      </div>
    {:else}
      <section
        class="blocks"
        style="--areas: {block.layout.areas}; --columns: {block.layout.columns};
        --rows: {block.layout.rows}; ">
        {#each block.blocks as block}
          {#if block.type == 'molecule'}
            <div
              style="grid-area: {block.slot}; display: grid;
              grid-template-columns: 'minmax(1fr)'; grid-template-rows:
              'minmax(1fr)'; overflow: hidden;">
              <svelte:component this={block.quant} data={block.data} />
            </div>
          {:else}i am an organisms please repeat me{/if}
        {/each}
      </section>
    {/if}
  {/each}
</section>
