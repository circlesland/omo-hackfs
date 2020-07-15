import {
  OmoLayoutLeftMainRight,
  OmoLayoutTopMainBottom,
  OmoLayoutMainRight,
} from "./omo-data/4-layouts";

export function seed() {
  var seed: any = {};

  let OmoDappOmoMe = {
    name: "OmoDappOmoMe",
    blocks: [
      {
        type: "molecule",
        slot: "top",
        quant: "OmoTitleBar",
        data: { name: "I am level 1 molecule 1 blue" },
      },
      {
        type: "molecule",
        slot: "bottom",
        quant: "OmoNavBar",
        data: { name: "I am level 1 molecule 2 green" },
      },
      {
        type: "organism",
        slot: "main",
        layout: OmoLayoutMainRight,
        blocks: [
          {
            type: "molecule",
            slot: "right",
            quant: "OmoMolecule3",
            data: { name: "filter" },
          },
          {
            type: "molecule",
            slot: "main",
            quant: "OmoDapps",
            data: { name: "I am level 2 molecule 4 pink" },
          },
        ],
      },
    ],
  };

  seed.layouts = [OmoLayoutTopMainBottom, OmoLayoutLeftMainRight];

  seed.blocks = [OmoDappOmoMe];

  return seed;
}
