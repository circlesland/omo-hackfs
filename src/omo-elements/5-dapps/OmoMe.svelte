<script>
  import { onMount } from "svelte";
  // Import the generic and dynamic css grid layout builder
  import OmoDapp from "./../4-templates/OmoDapp";
  // Import your graphql queries here
  // Currently work around with browser localstore until local threads DB is implemented

  let blocks = window.data.blocks;
  let layouts = window.data.layouts;

  const OmoLayoutTopMainBottom = layouts.find(
    l => l.name === "OmoLayoutTopMainBottom"
  );
  const OmoDappOmoMe = blocks.find(b => b.name === "OmoDappOmoMe").blocks;

  $: dapp = {
    layout: OmoLayoutTopMainBottom,
    blocks: OmoDappOmoMe
  };
</script>

<OmoDapp {dapp} />
