import { OmoLayoutLeftMainRight } from "./omo-layouts";

export const OmoDappOmoMe = {
  name: "OmoDappOmoMe",
  blocks: [
    {
      type: "molecule",
      slot: "top",
      quant: "OmoMolecule1",
      data: {
        name: "I am level 1 molecule 1 blue",
      },
    },
    {
      type: "molecule",
      slot: "bottom",
      quant: "OmoNavBar",
      data: {
        name: "I am level 1 molecule 2 green",
      },
    },
    {
      type: "organism",
      slot: "main",
      layout: OmoLayoutLeftMainRight,
      blocks: [
        {
          type: "molecule",
          slot: "left",
          quant: "OmoMolecule3",
          data: {
            name: "I am level 2 molecule 3 yellow",
          },
        },
        {
          type: "molecule",
          slot: "main",
          quant: "OmoMolecule4",
          data: {
            name: "I am level 2 molecule 4 pink",
          },
        },
        {
          type: "molecule",
          slot: "right",
          quant: "OmoMolecule3",
          data: {
            name: "I am level 2 molecule 3 yellow",
          },
        },
      ],
    },
  ],
};
