<script>
  import OmoOrganisms from "./../4-templates/OmoOrganisms";

  let levels = [
    {
      type: "level",
      title: "Omo-Dreamer",
      color: "bg-leap1",
      order: 1,
      current: 1,
      goal: 1,
      total: 1,
      steps: [
        {
          type: "step",
          title: "Commit 13h / week",
          benefit: "100 years free",
          state: "done",
          order: 1
        }
      ]
    },
    {
      type: "level",
      title: "Omo-Dreamers",
      color: "bg-leap1",
      order: 2,
      current: 1,
      goal: 1,
      total: 2,
      steps: [
        {
          type: "step",
          title: "Commit 13h / week",
          benefit: "100 years free",
          state: "done",
          order: 1
        }
      ]
    },
    {
      type: "level",
      title: "Omo-Dreamers",
      color: "bg-leap1",
      order: 3,
      current: 1,
      goal: 2,
      total: 4,
      steps: [
        {
          type: "step",
          title: "Commit 7h / week",
          benefit: "50 years free",
          state: "done",
          order: 1
        },
        {
          type: "step",
          title: "Commit 7h / week",
          state: "active",
          benefit: "50 years free",
          order: 2
        }
      ]
    },
    {
      type: "level",
      title: "Omo-Dreamers",
      color: "bg-leap1",
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
          benefit: "33 years free",
          state: "locked",
          order: 3
        }
      ]
    },
    {
      type: "level",
      title: "Omo-Dreamers",
      color: "bg-leap1",
      order: 5,
      current: 0,
      goal: 5,
      total: 12,
      steps: [
        {
          type: "step",
          title: "Commit 3h / week",
          benefit: "20 years free",
          state: "locked",
          order: 1
        },
        {
          type: "step",
          title: "Commit 3h / week",
          benefit: "20 years free",
          state: "locked",
          order: 2
        },
        {
          type: "step",
          title: "Commit 3h / week",
          benefit: "20 years free",
          state: "locked",
          order: 3
        },
        {
          type: "step",
          benefit: "20 years free",
          title: "Commit 3h / week",
          state: "locked",
          order: 4
        },
        {
          type: "step",
          benefit: "20 years free",
          title: "Commit 3h / week",
          state: "locked",
          order: 5
        }
      ]
    },
    {
      type: "level",
      title: "Omo-Dreamers",
      color: "bg-leap1",
      order: 6,
      current: 0,
      goal: 8,
      total: 20,
      steps: [
        {
          type: "step",
          benefit: "12 years free",
          title: "Commit 2h / week",
          state: "locked",
          order: 1
        },
        {
          type: "step",
          title: "Commit 2h / week",
          benefit: "12 years free",

          state: "locked",
          order: 2
        },
        {
          type: "step",
          benefit: "12 years free",
          title: "Commit 2h / week",
          state: "locked",
          order: 3
        },
        {
          type: "step",
          benefit: "12 years free",
          title: "Commit 2h / week",
          state: "locked",
          order: 4
        },
        {
          type: "step",
          benefit: "12 years free",
          title: "Commit 2h / week",
          state: "locked",
          order: 5
        },
        {
          type: "step",
          benefit: "12 years free",
          title: "Commit 2h / week",
          state: "locked",
          order: 6
        },
        {
          type: "step",
          benefit: "12 years free",
          title: "Commit 2h / week",
          state: "locked",
          order: 7
        },
        {
          type: "step",
          benefit: "12 years free",
          title: "Commit 2h / week",
          state: "locked",
          order: 8
        }
      ]
    },
    {
      type: "level",
      title: "Omo-Dreamers",
      color: "bg-leap1",
      order: 7,
      current: 0,
      goal: 13,
      total: 33,
      steps: [
        {
          type: "step",
          title: "Commit 1h / week",
          benefit: "7 years free",
          state: "locked",
          order: 1
        },
        {
          type: "step",
          title: "Commit 1h / week",
          benefit: "7 years free",

          state: "locked",
          order: 2
        },
        {
          type: "step",
          benefit: "7 years free",
          title: "Commit 1h / week",
          state: "locked",
          order: 3
        },
        {
          type: "step",
          title: "Commit 1h / week",
          benefit: "7 years free",
          state: "locked",
          order: 4
        },
        {
          type: "step",
          title: "Commit 1h / week",
          benefit: "7 years free",
          state: "locked",
          order: 5
        },
        {
          type: "step",
          title: "Commit 1h / week",
          benefit: "7 years free",
          state: "locked",
          order: 6
        },
        {
          type: "step",
          title: "Commit 1h / week",
          benefit: "7 years free",
          state: "locked",
          order: 7
        },
        {
          type: "step",
          title: "Commit 1h / week",
          benefit: "7 years free",
          state: "locked",
          order: 8
        },
        {
          type: "step",
          title: "Commit 1h / week",
          benefit: "7 years free",
          state: "locked",
          order: 9
        },
        {
          type: "step",
          title: "Commit 1h / week",
          benefit: "7 years free",
          state: "locked",
          order: 10
        },
        {
          type: "step",
          title: "Commit 1h / week",
          benefit: "7 years free",
          state: "locked",
          order: 11
        },
        {
          type: "step",
          title: "Commit 1h / week",
          benefit: "7 years free",
          state: "locked",
          order: 12
        },
        {
          type: "step",
          title: "Commit 1h / week",
          benefit: "7 years free",
          state: "locked",
          order: 13
        }
      ]
    }
  ];
  var leap = {
    type: "leap",
    title: "Omo Dreamers",
    state: "active",
    order: 1,
    current: 4,
    goal: 33
  };
  var design = { bg: "bg-primary", text: "bg-primary" };

  let OmoMessages = {
    name: "OmoMessages",
    type: "organisms",
    layout: { areas: "'full'", columns: "1fr", rows: "1fr" },
    blocks: [
      {
        type: "molecule",
        slot: "full",
        quant: "OmoChat",
        data: { leap, levels, design }
      }
    ]
  };
</script>

<OmoOrganisms organisms={OmoMessages} />
