<script>
  import OmoOrganisms from "./../4-templates/OmoOrganisms";

  let levels = [
    {
      type: "level",
      title: "Level 1",
      order: 1,
      current: 1,
      goal: 1,
      total: 1,
      steps: [
        {
          type: "step",
          title: "Commit 12h / week",
          benefit: "lifelong free",
          state: "done",
          order: 1
        }
      ]
    },
    {
      type: "level",
      title: "Level 2",
      order: 2,
      current: 1,
      goal: 1,
      total: 2,
      steps: [
        {
          type: "step",
          title: "Commit 12h / week",
          benefit: "lifelong free",
          state: "done",
          order: 1
        }
      ]
    },
    {
      type: "level",
      title: "Level 3",
      order: 3,
      current: 1,
      goal: 2,
      total: 4,
      steps: [
        {
          type: "step",
          title: "Commit 6h / week",
          benefit: "lifelong free",
          state: "done",
          order: 1
        },
        {
          type: "step",
          title: "Commit 6h / week",
          state: "active",
          benefit: "lifelong free",
          order: 2
        }
      ]
    },
    {
      type: "level",
      title: "Level 4",
      order: 4,
      current: 0,
      goal: 3,
      total: 7,
      steps: [
        {
          type: "step",
          title: "Commit 4h / week",
          benefit: "33 years free",
          state: "locked",
          order: 1
        },
        {
          type: "step",
          title: "Commit 4h / week",
          benefit: "33 years free",
          state: "locked",
          order: 2
        },
        {
          type: "step",
          title: "Commit 4h / week",
          benefit: "lifelong free",
          state: "locked",
          order: 3
        }
      ]
    },
    {
      type: "level",
      title: "Level 5",
      order: 5,
      current: 0,
      goal: 5,
      total: 12,
      steps: [
        {
          type: "step",
          title: "Commit 2h / week",
          benefit: "lifelong free",
          state: "locked",
          order: 1
        },
        {
          type: "step",
          title: "Commit 2h / week",
          benefit: "lifelong free",
          state: "locked",
          order: 2
        },
        {
          type: "step",
          title: "Commit 2h / week",
          benefit: "lifelong free",
          state: "locked",
          order: 3
        },
        {
          type: "step",
          benefit: "lifelong free",
          title: "Commit 2h / week",
          state: "locked",
          order: 4
        },
        {
          type: "step",
          benefit: "lifelong free",
          title: "Commit 2h / week",
          state: "locked",
          order: 5
        }
      ]
    }
  ];
  var leaps = [
    {
      type: "leap",
      title: "Omo Dreamers",
      state: "active",
      order: 1,
      current: 4,
      goal: 12
    }
  ];
  var design = { bg: "bg-primary", text: "bg-primary" };

  let OmoDream = {
    name: "OmoDream",
    type: "organisms",
    layout: {
      areas: "'main'",
      columns: "1fr",
      rows: "1fr"
    },
    blocks: [
      {
        type: "molecule",
        slot: "main",
        quant: "OmoDream",
        data: { leaps, levels, design }
      }
    ]
  };
</script>

<OmoOrganisms organisms={OmoDream} />
