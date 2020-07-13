<script>
  import OmoVideo from "./../2-molecules/OmoVideo";
  import OmoProfilePage from "./../2-molecules/OmoProfilePage";
  import OmoNavAside from "./../2-molecules/OmoNavAside";

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
      title: "Seeding the dream",
      color: "bg-blue-600",
      state: "active",
      order: 1,
      levels: [
        {
          type: "level",
          title: "OmoDreamers",
          state: "active",
          order: 5,
          steps: [
            {
              type: "step",
              title: "leave everything behind",
              state: "done",
              order: 0
            },
            {
              type: "step",
              title: "define vision",
              state: "done",
              order: 1
            },
            {
              type: "step",
              title: "mutual commitment",
              state: "done",
              order: 2
            },
            {
              type: "step",
              title: "build dream team",
              state: "active",
              order: 3
            },
            {
              type: "step",
              title: "complete the gang",
              state: "locked",
              order: 5
            }
          ]
        }
      ]
    },
    {
      type: "leap",
      title: "Validating the idea",
      color: "bg-blue-300",
      state: "locked",
      order: 2,
      levels: [
        {
          type: "level",
          title: "OmoThinkers",
          state: "locked",
          order: 55,
          steps: [
            {
              type: "step",
              title: "thinkers",
              state: "locked",
              order: 8
            },
            {
              type: "step",
              title: "thinkers",
              state: "locked",
              order: 13
            },
            {
              type: "step",
              title: "thinkers",
              state: "locked",
              order: 21
            },
            {
              type: "step",
              title: "thinkers",
              state: "locked",
              order: 34
            },
            {
              type: "step",
              title: "thinkers",
              state: "locked",
              order: 55
            }
          ]
        }
      ]
    },
    {
      type: "leap",
      title: "developing the prototype",
      color: "bg-teal-400",
      order: 3,
      levels: [
        {
          type: "level",
          title: "OmoMakers",
          state: "active",
          order: 610,
          steps: [
            {
              type: "step",
              title: "-86%",
              state: "locked",
              order: 89
            },
            {
              type: "step",
              title: "-86%",
              state: "locked",
              order: 144
            },
            {
              type: "step",
              title: "-86%",
              state: "locked",
              order: 233
            },
            {
              type: "step",
              title: "-86%",
              state: "locked",
              order: 377
            },
            {
              type: "step",
              title: "-86%",
              state: "locked",
              order: 610
            }
          ]
        }
      ]
    },
    {
      type: "leap",
      title: "building the product",
      color: "bg-green-400",
      state: "locked",
      order: 4,
      levels: [
        {
          type: "level",
          title: "Omo-Preneurs",
          state: "locked",
          order: 6765,
          steps: [
            {
              type: "step",
              title: "",
              state: "locked",
              order: 997
            },
            {
              type: "step",
              title: "",
              state: "locked",
              order: 1517
            },
            {
              type: "step",
              title: "",
              state: "locked",
              order: 2584
            },
            {
              type: "step",
              title: "",
              state: "locked",
              order: 4181
            },
            {
              type: "step",
              title: "",
              state: "locked",
              order: 6765
            }
          ]
        }
      ]
    },
    {
      type: "leap",
      title: "scaling the service",
      color: "bg-secondary",
      state: "locked",
      order: 5,
      levels: [
        {
          type: "level",
          title: "Omo Vestors",
          state: "locked",
          order: 75.025,
          steps: [
            {
              type: "step",
              title: "",
              state: "locked",
              order: 10.146
            },
            {
              type: "step",
              title: "",
              state: "locked",
              order: 17.711
            },
            {
              type: "step",
              title: "",
              state: "locked",
              order: 28.657
            },
            {
              type: "step",
              title: "",
              state: "locked",
              order: 46.368
            },
            {
              type: "step",
              title: "",
              state: "locked",
              order: 75.025
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
    grid-template-areas: " content-center aside nav-aside";
    grid-template-columns: 1fr 20rem 3rem;
    grid-template-rows: 1fr;
    overflow: hidden;
  }
  .nav-aside {
    grid-area: nav-aside;
    overflow-y: scroll;
  }
  .aside {
    grid-area: aside;
    overflow-y: scroll;
    @apply bg-gray-100;
  }

  .content-center {
    grid-area: content-center;
    overflow-x: scroll;
  }
</style>

<div class="omo-layout">
  <div class="nav-aside">
    <OmoNavAside />
  </div>
  <div class="aside">
    <div class="omo-lefttext-md">
      {#each data.sort((first, second) => {
        if (first.leap < second.leap) return -1;
        if (first.leap > second.leap) return 1;
        return 0;
      }) as leap, i}
        <p
          class="uppercase text-md text-center h-12 py-3 {leap.color} font-bold
          text-white">
          {leap.order}. {leap.title}
        </p>
        {#each leap.levels.sort((first, second) => {
          if (first.order < second.order) return -1;
          if (first.order > second.order) return 1;
          return 0;
        }) as level, i}
          <div class="flex justify-center mx-auto h-8 w-full bg-gray-300">
            <p
              class="text-center uppercase py-1 px-3 text-sm font-bold
              text-gray-600">
              inspire {level.order} omo sapiens
            </p>
          </div>
          {#each level.steps.sort((first, second) => {
            if (first.order < second.order) return -1;
            if (first.order > second.order) return 1;
            return 0;
          }) as step, i}
            {#if step.state == 'active'}
              <div class="flex m-4 h-12 bg-gray-200 hover:bg-gray-300">
                <p class="py-2 px-4 text-xl font-bold text-gray-700">
                  {step.order}
                </p>
                <p class="py-3 px-4 text-gray-700 rounded">{step.title}</p>
              </div>
            {:else if step.state == 'done'}
              <div class="m-4 flex flex-col justify-center h-12">
                <div class="py-3 h-12 text-center bg-gray-200">
                  <i class="fas fa-check-circle text-blue-600" />
                </div>
              </div>
            {:else}
              <div class="flex flex-col justify-center m-4 h-12">
                <div class="py-3 h-12 text-center bg-gray-200">
                  <i class="fas fa-lock text-gray-500" />
                </div>
              </div>
            {/if}
          {/each}
        {/each}
      {/each}
    </div>
  </div>

  <div class="content-center">
    <OmoVideo data={dream} />
    <OmoProfilePage data={dream} />
  </div>

</div>
