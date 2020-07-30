<script>
  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";
  import OmoVideo from "./OmoVideo";
  import OmoProfilePage from "./OmoProfilePage";

  export let dreamers = [];

  fetch("https://randomuser.me/api?results=10")
    .then(response => response.json())
    .then(
      data =>
        (dreamers = data.results.map(item => {
          item.amount = Math.floor(Math.random() * 200) - 100;
          item.name = item.name.first;
          item.level = Math.floor(Math.random() * 7) + 1;
          return item;
        }))
    );

  export let data = {
    leap: {
      type: "leap",
      title: "Omo Dreamers",
      state: "active",
      order: 1,
      current: 4,
      goal: 33
    },
    design: { bg: "bg-primary", text: "bg-primary" },
    levels: []
  };

  let leap = data.leaps[0];
  let design = data.design;
  let levels = data.levels;

  let progress = (leap.current / leap.goal) * 100;
</script>

<style>
  .omo-layout {
    display: grid;
    grid-template-areas:
      "top top"
      "content-left content-right";
    grid-template-columns: 1fr 24rem;
    grid-template-rows: 1rem 1fr;
    overflow: hidden;
  }
  .top {
    grid-area: top;
  }
  .content-left {
    grid-area: content-left;
    height: 100%;
    overflow-y: scroll;
  }
  .content-right {
    grid-area: content-right;
    overflow-y: scroll;
  }
</style>

<OmoIconsFA />

<div class="omo-layout">
  <div class="top bg-gray-200 w-full">
    <div class="relative">
      <div class="overflow-hidden h-4 text-xs flex bg-primary">
        <div
          style="width: 33%"
          class="shadow-none flex flex-col text-center whitespace-nowrap
          text-white justify-center bg-tertiary" />
      </div>
    </div>
  </div>

  <div class="content-right bg-gray-200">
    <div class="h-full py-6 px-8 text-md">
 
      {#each levels.sort((first, second) => {
        if (first.order < second.order) return -1;
        if (first.order > second.order) return 1;
        return 0;
      }) as level, i}
        <p class="py-2 text-md font-bold text-gray-500 uppercase">
          Level {level.order}: {level.total} {level.title}
        </p>
        {#each level.steps.sort((first, second) => {
          if (first.order < second.order) return -1;
          if (first.order > second.order) return 1;
          return 0;
        }) as step, i}
          {#if step.state === 'active'}
            <div class="bg-gray-300">
              <div class="flex flex-col justify-center h-16 text-center">
                <p
                  class="py-2 px-4 text-xl font-bold text-primary h-full flex
                  justify-center flex-col bg-gray-300 uppercase">
                  {step.benefit}
                </p>
              </div>
              <div class="bg-gray-100">
                <p class="text-md p-6 text-gray-600">
                  {#if step.content}
                    {step.content}
                  {:else}
                    By comitting regularly your time, knowledge and feedback to
                    the dreamers, you will unlock {step.benefit} usage of the
                    future products or services that you are co-creating.
                  {/if}
                </p>
              </div>
              <p
                class="text-md w-full py-2 bg-tertiary hover:bg-secondary
                text-center text-white uppercase font-bold cursor-pointer">
                {step.title}
              </p>
            </div>
          {:else if step.state === 'done'}
            {#each dreamers.slice(0, level.goal) as dreamer}
              <div class="flex h-12 mb-4 w-full bg-gray-100">
                <img
                  alt=""
                  src={dreamer.picture.medium}
                  class="h-full w-auto" />
                <p class="py-3 px-4 rounded w-full">{dreamer.name}</p>
              </div>
            {/each}
            <!-- <div class="m-4 flex flex-col justify-center h-12">
              <div class="py-3 h-12 text-center bg-gray-300">
                <i class="fas fa-check-circle text-secondary" />
              </div>
            </div> -->
          {:else}
            <div class="flex h-12 mb-4 w-full bg-gray-300">
              <div
                class="h-full w-16 text-center flex justify-center flex-col
                bg-gray-500 text-xl text-gray-300 uppercase font-bold">
                {step.order}
              </div>
              <div class="py-3 h-12 w-full text-center bg-gray-300">
                <i class="fas fa-lock text-gray-500" />
              </div>
            </div>
            <!-- <div class="flex flex-wrap justify-center m-4 h-12">
              <div class="w-12">3</div>
              <div class="py-3 h-12 text-center bg-gray-300">
                <i class="fas fa-lock text-gray-500" />
              </div>
            </div> -->
          {/if}
        {/each}
      {/each}
    </div>
  </div>
  <div class="content-left bg-gray-100">
    <OmoVideo />
    <OmoProfilePage />
  </div>
</div>
