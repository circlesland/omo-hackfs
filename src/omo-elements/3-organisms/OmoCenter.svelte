<script>
  import OmoBlocks from "./../4-templates/OmoBlocks";
  import { OmoTopBottom } from "./../../omo-data/4-layouts";
  import OmoMolecule1 from "./../2-molecules/OmoMolecule1";
  import OmoMolecule2 from "./../2-molecules/OmoMolecule2";

  export let data;

  const layout = OmoTopBottom;

  const blocks = [
    {
      slot: "top",
      quant: OmoMolecule1,
      data: { name: "I am top" }
    },
    {
      slot: "bottom",
      quant: OmoMolecule2,
      data: { name: "I am bottom" }
    }
  ];
</script>

<OmoBlocks {layout} {blocks}>{data.name}</OmoBlocks>
