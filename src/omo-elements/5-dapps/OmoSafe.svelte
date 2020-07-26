<script>
  import OmoOrganisms from "./../4-templates/OmoOrganisms.svelte";
  import { getSafeFromLocalStorage } from "./../../omo-actions/Circles";
  import {
    loadingSafeDataAsync,
    loadingTransferDataAsync
  } from "./../../omo-data/queries/circles";

  async function loadingData() {
    let d = {};
    let safeAddress = "0xc1251f7a72b54d025338c4808b059699baa12472";
    safeAddress = getSafeFromLocalStorage().safeAddress;
    d.safeData = await loadingSafeDataAsync(safeAddress);
    d.transferData = await loadingTransferDataAsync(safeAddress);
    d.safeAddress = safeAddress;
    let OmoSafe = {
      name: "OmoSafe",
      type: "organisms",
      layout: {
        areas: "'top' 'main'",
        columns: "1fr",
        rows: "16rem 1fr"
      },
      blocks: [
        {
          type: "molecule",
          slot: "top",
          quant: "OmoCirclesBalance",
          data: await d
        },
        {
          type: "molecule",
          slot: "main",
          quant: "OmoCircles",
          data: await d
        }
      ]
    };
    return await OmoSafe;
  }
</script>

{#await loadingData()}
  loading
{:then organisms}
  <OmoOrganisms {organisms} />
{/await}
