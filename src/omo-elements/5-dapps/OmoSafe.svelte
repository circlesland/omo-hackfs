<script>
  import { Odentity } from "./../../Core/Odentity.ts";
  import OmoOrganisms from "./../4-layouts/OmoOrganisms.svelte";
  import { getSafeFromLocalStorage } from "./../../omo-actions/Circles";
  import {
    loadingSafeDataAsync,
    loadingTransferDataAsync
  } from "./../../omo-data/queries/circles";

  async function loadingData() {
    let d = {};
    if (window.o.odentity.current == null) {
      navigate("omoauth"); // add redirect ...
      return;
    }
    let safeAddress = window.o.odentity.current.circleSafe.safeAddress;

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
