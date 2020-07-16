<script>
  import OmoLayoutChat from "./../4-layouts/OmoLayoutChat";
  import OmoInput from "./../1-atoms/OmoInput";
  import OmoButton from "./../1-atoms/OmoButton";
  //   import { ChatRoom } from "./../../Core/Chat.ts";

  export let users = [];

  fetch("https://randomuser.me/api?results=15")
    .then(response => response.json())
    .then(
      data =>
        (users = data.results.map(item => {
          item.amount = Math.floor(Math.random() * 200) - 100;
          return item;
        }))
    );

  export let messages = [];
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("invite")) {
    ChatRoom.initFromInvite(urlParams.get("invite")).then(() => subscribe());
  } else {
    ChatRoom.initNew("mama@omo.earth").then(() => subscribe());
  }

  function subscribe() {
    ChatRoom.messageSubscription("omoearthchat", function(message) {
      if (message.author == ChatRoom.usermail) message.bg = "bg-green-200";
      else message.bg = "bg-blue-200";
      messages = [...messages, message];
    });
  }

  export let message;

  function sendMessage() {
    console.log("clicked");
    ChatRoom.sendMessage(message, ChatRoom.usermail);
    message = "";
  }
</script>

<OmoLayoutChat>
  <div slot="aside-top">
    <div class="bg-gray-200 py-6 px-8 text-md">
      {#each users as user}
        <div class="flex h-12 mb-4 w-full bg-gray-100">
          <img alt="" src={user.picture.medium} class="h-full w-auto" />
          <p class="py-3 px-4 rounded w-full">{user.email}</p>
        </div>
      {/each}
    </div>
  </div>
  <div slot="aside-bottom">
    <div class="flex">
      <input
        class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
        border-gray-200 bg-white"
        placeholder="enter email" />

      <button class="px-6 bg-green-400 text-gray-800 font-bold p-3 uppercase ">
        Invite
      </button>
    </div>
  </div>
  <div slot="content-top">
    <div class="py-6 px-8 text-md">
      {#each messages as message}
        <p class="mb-4 py-2 px-3 rounded {message.bg}">{message.text}</p>
      {/each}
    </div>
  </div>
  <div slot="content-bottom">
    <div class="flex">
      <input
        class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
        border-gray-200 bg-white"
        placeholder="enter your chat message here"
        bind:value={message} />
      <button
        on:click={sendMessage}
        class="px-6 bg-green-400 text-gray-800 font-bold p-3 uppercase">
        Send
      </button>
    </div>
  </div>
</OmoLayoutChat>
