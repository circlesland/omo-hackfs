<script>
  import OmoInput from "./../1-atoms/OmoInput";
  import OmoButton from "./../1-atoms/OmoButton";

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

<div>
  <div>
    <div class="py-6 px-8 text-md">
      {#each messages as message}
        <p class="mb-4 py-2 px-3 rounded {message.bg}">{message.text}</p>
      {/each}
    </div>
  </div>
  <div>
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
</div>

<!-- <div class="flex content-end flex-wrap h-full">
  <div class="w-full">
    <div class="py-6 px-8 text-md">
      {#each messages as message}
        <p class="mb-4 py-2 px-3 rounded {message.bg}">{message.text}</p>
      {/each}
    </div>
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
    <div class="pb-16" />
  </div>
</div> -->
