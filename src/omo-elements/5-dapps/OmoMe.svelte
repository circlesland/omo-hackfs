<script>
  import { onMount } from "svelte";
  // Import the generic and dynamic css grid layout builder
  import OmoBlocks from "./../4-templates/OmoBlocks";
  import OmoMolecule1 from "./../2-molecules/OmoMolecule1";
  import OmoMolecule2 from "./../2-molecules/OmoMolecule2";
  import OmoMolecule3 from "./../2-molecules/OmoMolecule3";
  import OmoMolecule4 from "./../2-molecules/OmoMolecule4";

  // Import all your data and blocks you want to display in your DAPP
  //   import { OmoLeftContent } from "./../../omo-data/4-layouts";
  //   import { OmoCenterLeft } from "./../../omo-data/3-organisms";

  $: layout = window.data.layout;
  $: blocks = window.data.blocks;
  $: dapp = {
    layout,
    blocks
  };
</script>

<OmoBlocks {dapp} />
