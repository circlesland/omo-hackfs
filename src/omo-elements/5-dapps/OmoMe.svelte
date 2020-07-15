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
  var map = new Map();
  map.set("OmoMolecule1", OmoMolecule1);
  map.set("OmoMolecule2", OmoMolecule2);
  map.set("OmoMolecule3", OmoMolecule3);
  map.set("OmoMolecule4", OmoMolecule4);
  window["map"] = map;

  $: layout = {
    areas: "'left content'",
    columns: "12rem 1fr",
    rows: "1fr"
  };

  $: blocks = [
    {
      type: "molecule",
      slot: "left",
      quant: "OmoMolecule1",
      data: { name: "I am level 1 molecule" }
    },
    {
      type: "organisms",
      slot: "content",
      layout: layout,
      blocks: [
        {
          type: "molecule",
          slot: "left",
          quant: "OmoMolecule2",
          data: { name: "I am level 2 molecule 2" }
        },
        {
          type: "organisms",
          slot: "content",
          layout: layout,
          blocks: [
            {
              type: "molecule",
              slot: "left",
              quant: "OmoMolecule3",
              data: { name: "I am level 3 molecule" }
            },
            {
              type: "organisms",
              slot: "content",
              layout: layout,
              blocks: [
                {
                  type: "molecule",
                  slot: "left",
                  quant: "OmoMolecule4",
                  data: { name: "I am the level 4 left molecule" }
                },
                {
                  type: "molecule",
                  slot: "content",
                  quant: "OmoMolecule4",
                  data: { name: "I am the level 4 content molecule" }
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  $: dapp = {
    layout,
    blocks
  };
</script>

<OmoBlocks {dapp} />
