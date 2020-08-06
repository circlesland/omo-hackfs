<script>
  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";
  import OmoVideo from "./OmoVideo";
  import OmoProfilePage from "./OmoProfilePage";
  import {Dreams as DreamsQueries} from "../../queries/omo/dreams/dreams";
  import {StartFlow} from "../../events/omo/shell/startFlow";
  import OmoNavAside from "./../2-molecules/OmoNavAside.svelte";

  // TODO: Realtime updates of new subscriptions

  let dreamId;

  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("data")) {
    dreamId = urlParams.get("data");
  }

  const leaps = [{
    leap: 1,
    title: "Time commitment",
    description: ""
  },{
    leap: 2,
    title: "Reservations",
    description: ""
  },{
    leap: 3,
    title: "Subscription",
    description: ""
  },{
    leap: 4,
    title: "Impact investors",
    description: ""
  }];

  const subscriptionDiscounts = [{
    fromLevel: 0,
    toLevel: 6,
    subscriptionDiscount: 100
  },{
    fromLevel: 7,
    toLevel: 7,
    subscriptionDiscount: 90
  },{
    fromLevel: 8,
    toLevel: 8,
    subscriptionDiscount: 80
  },{
    fromLevel: 9,
    toLevel: 9,
    subscriptionDiscount: 70
  },{
    fromLevel: 10,
    toLevel: 10,
    subscriptionDiscount: 60
  },{
    fromLevel: 11,
    toLevel: 11,
    subscriptionDiscount: 50
  },{
    fromLevel: 12,
    toLevel: 12,
    subscriptionDiscount: 33.33
  },{
    fromLevel: 13,
    toLevel: 13,
    subscriptionDiscount: 20
  },{
    fromLevel: 14,
    toLevel: 14,
    subscriptionDiscount: 12.50
  },{
    fromLevel: 15,
    toLevel: 15,
    subscriptionDiscount: 7.69
  },{
    fromLevel: 16,
    toLevel: 16,
    subscriptionDiscount: 4.76
  },{
    fromLevel: 17,
    toLevel: 17,
    subscriptionDiscount: 2.94
  },{
    fromLevel: 18,
    toLevel: 18,
    subscriptionDiscount: 1.82
  },{
    fromLevel: 19,
    toLevel: 19,
    subscriptionDiscount: 1.12
  },{
    fromLevel: 20,
    toLevel: 20,
    subscriptionDiscount: 0.69
  }];

  async function load() {
    const d = await DreamsQueries.byId(dreamId);

    const subscriptions = [];

    let lastLevel = 0;
    let lastLeap = 0;

    for (let i = 0; i < d.data.DreamById.subscriptions.length; i++) {
      const subscription = d.data.DreamById.subscriptions[i];
      const levelAndLeap = DreamsQueries.calcLevel(i);

      const subscriptionDiscount = subscriptionDiscounts.find(o => o.fromLevel <= levelAndLeap.level && o.toLevel >= levelAndLeap.level);
      const levelMetadata = {
        levelHeader: lastLevel !== levelAndLeap.level ? levelAndLeap.level : null,
        leapHeader: lastLeap !== levelAndLeap.leap ? levelAndLeap.leap : null,
        level: levelAndLeap.level,
        leap: levelAndLeap.leap,
        subscription: subscription,
        subscriptionDiscount: !subscriptionDiscount ? "" : subscriptionDiscount.subscriptionDiscount
      }

      lastLeap = levelAndLeap.leap;
      lastLevel = levelAndLeap.level;

      subscriptions.push(levelMetadata);
    }

    return {
      dream: d.data.DreamById,
      subscriptions: subscriptions
    };
  }

  load();
</script>

<style>
  .omo-layout {
    display: grid;
    grid-template-areas: "top top nav-right" "content-left content-right nav-right";
    grid-template-columns: 1fr 24rem 3rem;
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
    overflow: hidden;
    display: grid;
    height: 100%;
    grid-template-areas: "aside-top" "aside-bottom";
    grid-template-columns: 1fr;
    grid-template-rows: 18rem 1fr;
  }

  .nav-right {
    grid-area: nav-right;
    height: 100%;
  }

  .aside-top {
    grid-area: aside-top;
    height: 100%;
  }
  .aside-bottom {
    grid-area: aside-bottom;
    height: 100%;
    overflow-y: scroll;
  }
</style>

{#await load()}
  Loading...
{:then data}
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

    <div class="content-left bg-gray-100">
      <OmoVideo />
      <OmoProfilePage data={data.dream} />
    </div>

    <div class="nav-right">
      <OmoNavAside dreamId={data.dream._id} />q
    </div>

    <div class="content-right bg-gray-200 py-6 px-8">
      <div class="aside-top text-md">
        <div class="bg-gray-300">
          <div class="flex flex-col justify-center h-16 text-center">
            <p
              class="py-2 px-4 text-xl font-bold text-primary h-full flex
              justify-center flex-col bg-gray-300 uppercase">
              80% lifetime subscriptionDiscount
            </p>
          </div>
          <div class="bg-gray-100">
            <p class="text-md p-6 text-gray-600">
              By joining the dream now, you will reservate your pre-order slot,
              which will give you x percent subscriptionDiscount for lifetime on using the
              future [product service title placeholder].
            </p>
          </div>
          {#if data.dream.leap == "1"}
            <p
                    class="text-md w-full py-2 bg-tertiary hover:bg-secondary
            text-center text-white uppercase font-bold cursor-pointer"
                    on:click={() => window.o.publishShellEventAsync(new StartFlow("flows:omo.dreams.addReservation", data.dream._id))}>
              Commit time
            </p>
          {/if}
          {#if data.dream.leap == "2"}
            <p
                    class="text-md w-full py-2 bg-tertiary hover:bg-secondary
            text-center text-white uppercase font-bold cursor-pointer"
                    on:click={() => window.o.publishShellEventAsync(new StartFlow("flows:omo.dreams.addSubscription", data.dream._id))}>
              Reserve subscription discount
            </p>
          {/if}
          {#if data.dream.leap == "3"}
            <p
                    class="text-md w-full py-2 bg-tertiary hover:bg-secondary
            text-center text-white uppercase font-bold cursor-pointer"
                    on:click={() => window.o.publishShellEventAsync(new StartFlow("flows:omo.dreams.addSubscription", data.dream._id))}>
              Subscribe
            </p>
          {/if}
          {#if data.dream.leap == "4"}
            <p
                    class="text-md w-full py-2 bg-tertiary hover:bg-secondary
            text-center text-white uppercase font-bold cursor-pointer"
                    on:click={() => window.o.publishShellEventAsync(new StartFlow("flows:omo.dreams.addSubscription", data.dream._id))}>
              Buy tokens with discount
            </p>
          {/if}
        </div>
      </div>
      <div class="aside-bottom">
        {#each data.subscriptions as reservation, i}
          {#if reservation.leapHeader}
            Leap {reservation.leapHeader}
          {/if}
          {#if reservation.levelHeader}
            Level {reservation.levelHeader}
          {/if}
          <div class="flex h-12 mb-4 w-full bg-gray-100">
            <img
              alt=""
              src="https://i.pravatar.cc/150?u={reservation.subscription._id}"
              class="h-full w-auto" />
            <p class="py-3 px-4 rounded w-full">{reservation.subscriptionDiscount} {reservation.subscription._id}</p>
          </div>
        {/each}
        Level X
        <div class="flex h-12 mb-4 w-full bg-gray-300">
          <div
            class="h-full w-16 text-center flex justify-center flex-col
            bg-gray-500 text-xl text-gray-300 uppercase font-bold">
            <i class="fas fa-lock text-gray-300" />
          </div>
          <div class="py-3 h-12 w-full bg-gray-300">reservate for -70%</div>
        </div>
      </div>
      <!--
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
                        class="h-full w-auto"/>
                <p class="py-3 px-4 rounded w-full">{dreamer.name}</p>
              </div>
            {/each}
          {:else}
            <div class="flex h-12 mb-4 w-full bg-gray-300">
              <div
                      class="h-full w-16 text-center flex justify-center flex-col
                bg-gray-500 text-xl text-gray-300 uppercase font-bold">
                {step.order}
              </div>
              <div class="py-3 h-12 w-full text-center bg-gray-300">
                <i class="fas fa-lock text-gray-500"/>
              </div>
            </div>
          {/if}
        {/each}
      {/each}
  -->
    </div>
  </div>

{/await}
