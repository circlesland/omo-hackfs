<script>
  import OmoVideo from "./../2-molecules/OmoVideo";
  import OmoProfilePage from "./../2-molecules/OmoProfilePage";

  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";

  var urlParams = new URLSearchParams(window.location.search);
  export let dream = {};
  if (urlParams.has("data")) {
    var id = urlParams.get("data");
    o.graphql
      .query(
        `DreamById(_id:"${id}") {_id first last profile image follower city dream}`
      )
      .then(result => {
        dream = result.data.DreamById;
      });
  }

  export let data = [
    {
      type: "leap",
      title: "share your dream",
      order: 1,
      levels: [
        {
          type: "level",
          title: "Make your decision",
          order: 1,
          steps: [
            {
              type: "step",
              title: "Leave everything else behind",
              locked: false,
              order: 1
            }
          ]
        },
        {
          type: "level",
          title: "Follow your dream",
          order: 2,
          steps: [
            {
              type: "step",
              title: "Define your omo dream",
              locked: false,
              order: 1
            }
          ]
        },
        {
          type: "level",
          title: "Build your dream team",
          order: 3,
          steps: [
            {
              type: "step",
              title: "Inspire Omo 2",
              locked: false,
              order: 1
            },
            {
              type: "step",
              title: "Create new CoOmo",
              locked: false,
              order: 2
            }
          ]
        },
        {
          type: "level",
          title: "Share your commitment",
          order: 4,
          steps: [
            {
              type: "step",
              title: "3 Omo's  - Ø 7/week",
              locked: false,
              order: 1
            },
            {
              type: "step",
              title: "Write a story about your dream",
              locked: false,
              order: 2
            },
            {
              type: "step",
              title: "Verify first 3 Omo's",
              locked: false,
              order: 3
            }
          ]
        },
        {
          type: "level",
          title: "",
          order: 5,
          steps: [
            {
              type: "step",
              title: "5 Omo's - Ø 7 / week",
              locked: false,
              order: 1
            },
            {
              type: "step",
              title: "Omo 2 - Ø 7/week",
              locked: true,
              order: 2
            },
            {
              type: "step",
              title: "Omo 3 - Ø 7/week",
              locked: true,
              order: 3
            },
            {
              type: "step",
              title: "Omo 2 - Ø 7/week",
              locked: true,
              order: 4
            },
            {
              type: "step",
              title: "Verify all 5 Omo's",
              locked: false,
              order: 5
            }
          ]
        },
        {
          type: "level",
          title: "",
          order: 6,
          steps: [
            {
              type: "step",
              title: "8 Omo's - Ø 7 / week",
              locked: false,
              order: 1
            },
            {
              type: "step",
              title: "Omo 2 - Ø 7 / week",
              locked: true,
              order: 2
            },
            {
              type: "step",
              title: "Omo 3 - Ø 7/week",
              locked: true,
              order: 3
            },
            {
              type: "step",
              title: "Omo 2 - Ø 7/week",
              locked: true,
              order: 4
            },
            {
              type: "step",
              title: "Omo 3 - Ø 7/week",
              locked: true,
              order: 5
            },
            {
              type: "step",
              title: "Omo 2 - Ø 7/week",
              locked: true,
              order: 6
            },
            {
              type: "step",
              title: "Omo 3 - Ø 7/week",
              locked: true,
              order: 7
            },
            {
              type: "step",
              title: "Verify all 8 Omo's",
              locked: false,
              order: 8
            }
          ]
        },
        {
          type: "level",
          title: "",
          order: 7,
          steps: [
            {
              type: "step",
              title: "8 Omo's - Ø 7 / week",
              locked: false,
              order: 1
            },
            {
              type: "step",
              title: "Omo 2 - Ø 7 / week",
              locked: true,
              order: 2
            },
            {
              type: "step",
              title: "Omo 3 - Ø 7/week",
              locked: true,
              order: 3
            },
            {
              type: "step",
              title: "Omo 2 - Ø 7/week",
              locked: true,
              order: 4
            },
            {
              type: "step",
              title: "Omo 3 - Ø 7/week",
              locked: true,
              order: 5
            },
            {
              type: "step",
              title: "Omo 2 - Ø 7/week",
              locked: true,
              order: 6
            },
            {
              type: "step",
              title: "Omo 3 - Ø 7/week",
              locked: true,
              order: 7
            },
            {
              type: "step",
              title: "Omo 2 - Ø 7/week",
              locked: true,
              order: 8
            },
            {
              type: "step",
              title: "Omo 2 - Ø 7/week",
              locked: true,
              order: 9
            },
            {
              type: "step",
              title: "Omo 2 - Ø 7/week",
              locked: true,
              order: 10
            },
            {
              type: "step",
              title: "Omo 2 - Ø 7/week",
              locked: true,
              order: 11
            },
            {
              type: "step",
              title: "Omo 2 - Ø 7/week",
              locked: true,
              order: 12
            },
            {
              type: "step",
              title: "Verify all 13 Omo's",
              locked: false,
              order: 13
            }
          ]
        }
      ]
    },
    {
      type: "leap",
      title: "Validate your dream",
      order: 2,
      levels: [
        {
          type: "level",
          title: "Inspire 21 Omo's",
          order: 1,
          steps: [
            {
              type: "step",
              title: "Pre-Order Discount -86%",
              locked: false,
              order: 1
            }
          ]
        },
        {
          type: "level",
          title: "Inspire 34 Omo's",
          order: 2,
          steps: [
            {
              type: "step",
              title: "Pre-Order discount -71%",
              locked: false,
              order: 1
            }
          ]
        },
        {
          type: "level",
          title: "Inspire 55 Omo's",
          order: 3,
          steps: [
            {
              type: "step",
              title: "Pre-Order discount -57%",
              locked: false,
              order: 1
            }
          ]
        },
        {
          type: "level",
          title: "Inspire 89 Omo's",
          order: 4,
          steps: [
            {
              type: "step",
              title: "Pre-Order discount -43%",
              locked: false,
              order: 1
            }
          ]
        },
        {
          type: "level",
          title: "Inspire 144 Omo's",
          order: 5,
          steps: [
            {
              type: "step",
              title: "Pre-Order discount -29%",
              locked: false,
              order: 1
            }
          ]
        },
        {
          type: "level",
          title: "Inspire 233 Omo's",
          order: 6,
          steps: [
            {
              type: "step",
              title: "Pre-Order discount -14%",
              locked: false,
              order: 1
            }
          ]
        },
        {
          type: "level",
          title: "Inspire 377 Omo's",
          order: 7,
          steps: [
            {
              type: "step",
              title: "Pre-Order at 0% discount",
              locked: false,
              order: 1
            }
          ]
        }
      ]
    },
    {
      type: "leap",
      title: "Exchange with investors",
      order: 3,
      levels: [
        {
          type: "level",
          title: "Pre-order 377 - 610",
          order: 1,
          steps: [
            {
              type: "step",
              title: "Exchange rate Ø1 = 0,14€",
              locked: false,
              order: 1
            }
          ]
        },
        {
          type: "level",
          title: "Pre-order 611 - 987",
          order: 2,
          steps: [
            {
              type: "step",
              title: "Exchange rate Ø1 = 0,29€",
              locked: false,
              order: 1
            }
          ]
        },
        {
          type: "level",
          title: "Pre-order 988 - 1597",
          order: 3,
          steps: [
            {
              type: "step",
              title: "Exchange rate Ø1 = 0,43€",
              locked: false,
              order: 1
            }
          ]
        },
        {
          type: "level",
          title: "Pre-order 1598 - 2584",
          order: 4,
          steps: [
            {
              type: "step",
              title: "Exchange rate Ø1 = 0,57€",
              locked: false,
              order: 1
            }
          ]
        },
        {
          type: "level",
          title: "Pre-order 2585 - 4181",
          order: 5,
          steps: [
            {
              type: "step",
              title: "Exchange rate Ø1 = 0,71€",
              locked: false,
              order: 1
            }
          ]
        },
        {
          type: "level",
          title: "Pre-order 4182 - 6765",
          order: 6,
          steps: [
            {
              type: "step",
              title: "Exchange rate Ø1 = 0,86€",
              locked: false,
              order: 1
            }
          ]
        },
        {
          type: "level",
          title: "Pre-order 4182 - 6765",
          order: 7,
          steps: [
            {
              type: "step",
              title: "Exchange rate Ø1 = 1€",
              locked: false,
              order: 1
            }
          ]
        }
      ]
    }
  ];

  export let firstname = "";

  async function saveFirstname() {
    var omo = await store.odentity.currentOmo();
    omo.firstname = firstname;
    await store.odentity.updateOmo(omo);
  }
</script>

<style>
  .omo-layout {
    display: grid;
    grid-template-areas: "aside content-center";
    grid-template-columns: 24rem 1fr;
    grid-template-rows: 1fr;
    overflow: hidden;
  }
  .aside {
    grid-area: aside;
    overflow-y: scroll;
    @apply bg-gray-200;
  }
  .content-top {
    grid-area: content-top;
  }
  .content-center {
    grid-area: content-center;
    overflow-x: scroll;
  }
</style>

<div class="omo-layout">
  <div class="aside">
    <div class="omo-left py-6 px-8 text-md">
      {#each data.sort((first, second) => {
        if (first.leap < second.leap) return -1;
        if (first.leap > second.leap) return 1;
        return 0;
      }) as leap, i}
        <p
          class="uppercase text-lg text-center py-8 bg-gray-300 -mx-8 mb-6
          font-bold text-secondary">
          {leap.type} {leap.order}: {leap.title}
        </p>
        {#each leap.levels.sort((first, second) => {
          if (first.order < second.order) return -1;
          if (first.order > second.order) return 1;
          return 0;
        }) as level, i}
          <p class="uppercase font-bold text-sm text-gray-500">
            Level {level.order}: {level.title}
          </p>
          {#each level.steps.sort((first, second) => {
            if (first.order < second.order) return -1;
            if (first.order > second.order) return 1;
            return 0;
          }) as step, i}
            {#if step.locked}
              <div
                class="flex flex-col justify-center bg-gray-300 h-12 mb-4 w-full">
                <div class="text-center">
                  <i class="fas fa-lock text-gray-500" />
                </div>
              </div>
            {:else}
              <div class="flex h-12 mb-4 w-full bg-gray-100 hover:bg-secondary">
                <p class="py-2 px-4 text-xl font-bold text-gray-700">
                  {step.order}
                </p>
                <p class="py-3 px-4 text-gray-700 rounded w-full">
                  {step.title}
                </p>
              </div>
            {/if}
          {/each}
        {/each}
      {/each}
    </div>
  </div>

  <div class="content-center">
    <OmoVideo />
    {JSON.stringify(dream)}
    <OmoProfilePage />
  </div>

</div>
