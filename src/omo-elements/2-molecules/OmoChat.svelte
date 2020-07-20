<script>
  import OmoLayoutChat from "./../4-layouts/OmoLayoutChat";
  import OmoInput from "./../1-atoms/OmoInput";
  import OmoButton from "./../1-atoms/OmoButton";
  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";

  // import { ChatRoom } from "./../../Core/Chat.ts";

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

  export let messages = [];
  // var urlParams = new URLSearchParams(window.location.search);
  // if (urlParams.has("invite")) {
  //   ChatRoom.initFromInvite(urlParams.get("invite")).then(() => subscribe());
  // } else {
  //   ChatRoom.initNew("mama@omo.earth").then(() => subscribe());
  // }

  // function subscribe() {
  //   ChatRoom.messageSubscription("omoearthchat", function(message) {
  //     if (message.author == ChatRoom.usermail) message.bg = "bg-green-200";
  //     else message.bg = "bg-blue-200";
  //     messages = [...messages, message];
  //   });
  // }

  export let message;

  function sendMessage() {
    console.log("clicked");
    // ChatRoom.sendMessage(message, ChatRoom.usermail);
    message = "";
  }

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
      "top-left top-right"
      "content-left content-right"
      "bottom-left bottom-right";
    grid-template-columns: 1fr 24rem;
    grid-template-rows: 2.5rem 1fr 3rem;
    overflow: hidden;
  }
  .top-left {
    grid-area: top-left;
  }
  .top-right {
    grid-area: top-right;
  }
  .content-left {
    grid-area: content-left;
    height: 100%;
    overflow-y: scroll;
  }
  .bottom-left {
    grid-area: bottom-left;
  }
  .content-right {
    grid-area: content-right;
    overflow-y: scroll;
  }
  .bottom-right {
    grid-area: bottom-right;
  }
</style>

<OmoIconsFA />

<div class="omo-layout">
  <div class="top-left bg-gray-200 w-full">
    <div
      class="text-xs py-1 leading-none text-center text-white {design.bg}
      uppercase font-bold">
      LEAP 1: Omo Dreamers
    </div>
    <div
      class="{design.bg} py-1 text-xs leading-none text-center text-white"
      style="width: {progress}%">
      {leap.current} of {leap.goal}
    </div>

  </div>
  <div class="top-right">
    <div class="bg-gray-200 w-full">
      <div
        class="text-xs py-1 leading-none text-center text-white {design.bg}
        uppercase font-bold">
        LEVEL 3
      </div>
      <div
        class="{design.bg} py-1 text-xs leading-none text-center text-white"
        style="width: 66%">
        2 of 3
      </div>
    </div>
  </div>
  <div class="content-right bg-gray-200">
    <div class="h-full py-6 px-8 text-md">
      <!-- {#each dreamers as dreamer}
        <div class="flex h-12 mb-4 w-full bg-gray-100">
          <img alt="" src={dreamer.picture.medium} class="h-full w-auto" />
          <p class="py-3 px-4 rounded w-full">{dreamer.email}</p>
        </div>
      {/each} -->
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
  <div class="bottom-right">
    <div class="flex">
      <input
        class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
        border-gray-200 bg-white"
        placeholder="enter email" />

      <button
        class="px-6 bg-primary hover:bg-secondary text-white font-bold p-3
        uppercase ">
        Invite
      </button>
    </div>
  </div>
  <div class="content-left bg-gray-100">
    <div class="py-6 px-8 text-md">
      {#each messages as message}
        <p class="mb-4 py-2 px-3 rounded {message.bg}">{message.text}</p>
      {/each}
    </div>
  </div>
  <div class="bottom-left">
    <div class="flex">
      <input
        class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
        border-gray-200 bg-white"
        placeholder="enter your chat message here"
        bind:value={message} />
      <button
        on:click={sendMessage}
        class="px-6 bg-primary hover:bg-secondary text-white font-bold p-3
        uppercase">
        Send
      </button>
    </div>
  </div>
</div>
