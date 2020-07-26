<script>
  import OmoLayoutChat from "./../4-layouts/OmoLayoutChat";
  import OmoInput from "./../1-atoms/OmoInput";
  import OmoButton from "./../1-atoms/OmoButton";
  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";

  // export let messages = [];
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

  let rooms = window.o.graphQL.query("ChatRooms{_id, name}");
  window.o.graphQL.subscribe("ChatRooms{_id,name}", result => {
    debugger;
    rooms = result;
  });

  // let progress = (leap.current / leap.goal) * 100;
</script>

<style>
  .omo-layout {
    height: 100%;
    display: grid;
    grid-template-areas:
      "content-left content-right"
      "bottom-left bottom-right";
    grid-template-columns: 1fr 24rem;
    grid-template-rows: 1fr 3rem;
    overflow: hidden;
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
    height: 100%;
    overflow-y: scroll;
  }
  .bottom-right {
    grid-area: bottom-right;
  }
</style>

<OmoIconsFA />

<div class="omo-layout">

  <div class="content-right bg-gray-100">
    <div class="py-6 px-8 text-md">
      <div class="bg-gray-300">
        {#await rooms}
          loading
        {:then rooms}
          {#each rooms.data.ChatRooms as room}
            <p
              class="text-md w-full py-2 bg-gray-200 hover:bg-secondary
              text-center text-blue-900 uppercase font-bold cursor-pointer">
              {room.name}
            </p>
          {/each}
        {/await}

      </div>
    </div>
  </div>

  <div class="bottom-right ">
    <div class="flex">
      <input
        class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
        border-gray-200 bg-white"
        placeholder="room name" />

      <button
        class="px-6 bg-primary hover:bg-secondary text-white font-bold p-3
        uppercase ">
        +room
      </button>
    </div>
  </div>
  <div class="content-left">
    <div class=" py-6 px-8 text-md">
      <!-- {#each messages as message}
        <p class="mb-4 py-2 px-3 rounded {message.bg}">{message.text}</p>
      {/each}  -->
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
