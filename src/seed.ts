export function seed() {
  var seed: any = {};
  seed.example = "hello omo seeder";
  let layout = {
    areas: "'left content'",
    columns: "12rem 1fr",
    rows: "1fr",
  };
  seed.layout = layout;
  seed.blocks = [
    {
      type: "molecule",
      slot: "left",
      quant: "OmoMolecule1",
      data: { name: "I am level 1 molecule" },
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
          data: { name: "I am level 2 molecule 2" },
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
              data: { name: "I am level 3 molecule" },
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
                  data: { name: "I am the level 4 left molecule" },
                },
                {
                  type: "molecule",
                  slot: "content",
                  quant: "OmoMolecule4",
                  data: { name: "I am the level 4 content molecule" },
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  return seed;
}
