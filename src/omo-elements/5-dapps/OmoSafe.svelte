<script>
  import { Odentity } from "./../../Core/Odentity.ts";
  import { onMount, onDestroy } from "svelte";
  import OmoOrganisms from "./../4-layouts/OmoOrganisms.svelte";
  import { getSafeFromLocalStorage } from "./../../omo-actions/Circles";
  import {
    loadingSafeDataAsync,
    loadingTransferDataAsync
  } from "./../../omo-data/queries/circles";

  onMount(() => {
    let safeTopic = window.eventBroker.tryGetTopic("omo", "safe");
    safeTopic.observable.subscribe(next => {
      alert(next);
    });
  });

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
        areas: "'top' 'head' 'main' 'foot'",
        columns: "1fr",
        rows: "2rem 12rem 1fr 4rem"
      },
      blocks: [
        {
          type: "molecule",
          slot: "top",
          quant: "OmoNavTop",
          data: {}
        },
        {
          type: "molecule",
          slot: "head",
          quant: "OmoCirclesBalance",
          data: await d
        },
        {
          type: "molecule",
          slot: "main",
          quant: "OmoCircles",
          data: await d
        },
        {
          type: "molecule",
          slot: "foot",
          quant: "OmoNavBottom",
          data: {}
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
