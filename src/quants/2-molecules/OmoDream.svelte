<script>
  import OmoDreamGoal from "./OmoDreamGoal.svelte";
  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";
  import OmoVideo from "./OmoVideo";
  import OmoProfilePage from "./OmoProfilePage";
  import OmoNavAside from "./../2-molecules/OmoNavAside.svelte";
  import OmoDreamChat from "./OmoDreamChat.svelte";
  import OmoDreamFollower from "./OmoDreamFollower.svelte";
  import { Dreams as DreamsQueries } from "../../queries/omo/dreams/dreams";

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

  $: contentLeft = items[activeTabValue].left;
  $: contentRight = items[activeTabValue].right;


  async function load() {
    const d = await DreamsQueries.byId(dreamId);
    const returnValue = {
      dream: d.data.DreamById,
    };

    return returnValue;
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
  <h1>{activeTabValue}</h1>
  <OmoIconsFA />
  <div class="omo-layout">
    <div class="top bg-gray-200 w-full">
      <div class="relative">
        <div class="overflow-hidden h-4 text-xs flex bg-primary">
          <div
                  style="width: 33%"
                  class="shadow-none flex flex-col text-center whitespace-nowrap
            text-white justify-center bg-tertiary"/>
        </div>
      </div>
    </div>

    <div class="content-left bg-gray-100">
      <svelte:component this={contentLeft} data={data} />
    </div>

    <div class="content-right bg-gray-200 py-6 px-8">
      <svelte:component
        this={contentRight}
        data={data} />
    </div>

    <div class="nav-right">
      <OmoNavAside
        dreamId={data.dream._id}
        items={JSON.stringify(items)}
        bind:current={activeTabValue} />
    </div>
  </div>

{/await}
