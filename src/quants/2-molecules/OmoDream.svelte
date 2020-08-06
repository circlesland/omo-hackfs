<script>
  import OmoDreamGoal from "./OmoDreamGoal.svelte";
  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";
  import OmoVideo from "./OmoVideo";
  import OmoProfilePage from "./OmoProfilePage";
  import { Dreams as DreamsQueries } from "../../queries/omo/dreams/dreams";
  import { StartFlow } from "../../events/omo/shell/startFlow";
  import OmoNavAside from "./../2-molecules/OmoNavAside.svelte";
  import OmoDreamChat from "./OmoDreamChat.svelte";
  import OmoDreamFollower from "./OmoDreamFollower.svelte";

  // TODO: Realtime updates of new subscriptions
  let dreamId;
  export let activeTabValue = 0;
  let items = [
    {
      icon: "fa-bullseye",
      text: "dapps",
      link: "javascript:navigate('omofunding')",
      design: "text-white bg-blue-600",
      left: OmoDreamGoal,
      right: OmoDreamFollower,
    },
    {
      icon: "fa-users",
      text: "messages",
      link: "javascript:navigate('omochat')",
      design: "text-white bg-blue-600",
      left: OmoDreamChat,
      right: OmoDreamFollower,
    },
    {
      icon: "fa-comments",
      text: "messages",
      link: "javascript:navigate('omochat')",
      design: "text-white bg-blue-600",
      left: OmoDreamChat,
      right: OmoDreamFollower,
    },
    {
      icon: "fa-bell",
      text: "messages",
      link: "javascript:navigate('docs')",
      design: "text-white bg-blue-600",
      left: OmoDreamGoal,
      right: OmoDreamFollower,
    },
  ];

  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("data")) {
    dreamId = urlParams.get("data");
  }

  const leaps = [
    {
      leap: 1,
      title: "Time commitment",
      description: "",
    },
    {
      leap: 2,
      title: "Reservations",
      description: "",
    },
    {
      leap: 3,
      title: "Subscription",
      description: "",
    },
    {
      leap: 4,
      title: "Impact investors",
      description: "",
    },
  ];

  const subscriptionDiscounts = [
    {
      fromLevel: 0,
      toLevel: 6,
      subscriptionDiscount: 100,
    },
    {
      fromLevel: 7,
      toLevel: 7,
      subscriptionDiscount: 90,
    },
    {
      fromLevel: 8,
      toLevel: 8,
      subscriptionDiscount: 80,
    },
    {
      fromLevel: 9,
      toLevel: 9,
      subscriptionDiscount: 70,
    },
    {
      fromLevel: 10,
      toLevel: 10,
      subscriptionDiscount: 60,
    },
    {
      fromLevel: 11,
      toLevel: 11,
      subscriptionDiscount: 50,
    },
    {
      fromLevel: 12,
      toLevel: 12,
      subscriptionDiscount: 33.33,
    },
    {
      fromLevel: 13,
      toLevel: 13,
      subscriptionDiscount: 20,
    },
    {
      fromLevel: 14,
      toLevel: 14,
      subscriptionDiscount: 12.5,
    },
    {
      fromLevel: 15,
      toLevel: 15,
      subscriptionDiscount: 7.69,
    },
    {
      fromLevel: 16,
      toLevel: 16,
      subscriptionDiscount: 4.76,
    },
    {
      fromLevel: 17,
      toLevel: 17,
      subscriptionDiscount: 2.94,
    },
    {
      fromLevel: 18,
      toLevel: 18,
      subscriptionDiscount: 1.82,
    },
    {
      fromLevel: 19,
      toLevel: 19,
      subscriptionDiscount: 1.12,
    },
    {
      fromLevel: 20,
      toLevel: 20,
      subscriptionDiscount: 0.69,
    },
  ];

  async function load() {
    const d = await DreamsQueries.byId(dreamId);

    const subscriptions = [];

    let lastLevel = 0;
    let lastLeap = 0;

    for (let i = 0; i < d.data.DreamById.subscriptions.length; i++) {
      const subscription = d.data.DreamById.subscriptions[i];
      const levelAndLeap = DreamsQueries.calcLevel(i);

      const subscriptionDiscount = subscriptionDiscounts.find(
        (o) =>
          o.fromLevel <= levelAndLeap.level && o.toLevel >= levelAndLeap.level
      );
      const levelMetadata = {
        levelHeader:
          lastLevel !== levelAndLeap.level ? levelAndLeap.level : null,
        leapHeader: lastLeap !== levelAndLeap.leap ? levelAndLeap.leap : null,
        level: levelAndLeap.level,
        leap: levelAndLeap.leap,
        subscription: subscription,
        subscriptionDiscount: !subscriptionDiscount
          ? ""
          : subscriptionDiscount.subscriptionDiscount,
      };

      lastLeap = levelAndLeap.leap;
      lastLevel = levelAndLeap.level;

      subscriptions.push(levelMetadata);
    }

    return {
      dream: d.data.DreamById,
      subscriptions: subscriptions,
    };
  }

  $: contentLeft = items[activeTabValue].left;
  $: contentRight = items[activeTabValue].right;
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
  <h1>{activeTabValue}</h1>
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
      <svelte:component this={contentLeft} dream={data.dream} />
    </div>

    <div class="content-right bg-gray-200 py-6 px-8">
      <svelte:component
        this={contentRight}
        dream={data.dream}
        subscriptions={data.subscriptions} />
    </div>

    <div class="nav-right">
      <OmoNavAside
        dreamId={data.dream._id}
        items={JSON.stringify(items)}
        bind:current={activeTabValue} />
    </div>
  </div>

{/await}
