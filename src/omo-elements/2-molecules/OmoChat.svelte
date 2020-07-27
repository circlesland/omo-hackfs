<script>
  import { moment } from "moment";
  import OmoLayoutChat from "./../4-layouts/OmoLayoutChat";
  import OmoInput from "./../1-atoms/OmoInput";
  import OmoButton from "./../1-atoms/OmoButton";
  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";

  let rooms = window.o.graphQL.subscribe(
    "ChatRooms{_id,name}",
    result => (rooms = result)
  );

  let newRoom = "";
  async function createNewRoom() {
    currentRoom = (await o.graphQL.mutation(
      `addChatRoom(name:"${newRoom}") {_id name}`
    )).data.addChatRoom;
    newRoom = "";
  }

  async function deleteRoom(id) {
    await o.graphQL.mutation(`deleteChatRoom(_id:"${id}") {name}`);
    if (currentRoom._id == id) currentRoom = { _id: null };
  }

  function chooseRoom(room) {
    currentRoom = room;
  }

  let currentRoom = { _id: null };
  let messages;

  $: {
    console.warn(currentRoom);
    console.warn("MESSAGES");
    messages = window.o.graphQL.subscribe(
      "Messages{_id,text, name, date, ChatRoom{_id}}",
      result => {
        console.log("CALLBACK", result);
        messages = result;
      }
    );
  }

  let newMessage;
  async function sendMessage() {
    await window.o.graphQL.mutation(
      `addMessage(name: "${
        o.odentity.current._id
      }",text: "${newMessage}", date: "${Date.now()}", chatroomId: "${
        currentRoom._id
      }"){_id}`
    );
    newMessage = "";
  }
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
    overflow: hidden;
  }
  .bottom-left {
    grid-area: bottom-left;
  }
  .content-right {
    grid-area: content-right;
    height: 100%;
    overflow: hidden;
  }
  .bottom-right {
    grid-area: bottom-right;
  }

  .active {
    @apply text-white bg-primary;
  }
</style>

<OmoIconsFA />

<div class="omo-layout">

  <div class="content-right bg-gray-100">
    <div class="py-6 px-8 text-md ">
      <div class="bg-gray-300 overflow-y-scroll">
        {#await rooms}
          loading
        {:then rooms}
          {#each rooms.data.ChatRooms as room}
            <div
              on:click={() => chooseRoom(room)}
              class="text-md w-full py-2 bg-gray-200 hover:bg-secondary
              text-center text-blue-900 uppercase font-bold cursor-pointer "
              class:active={room._id === currentRoom._id}>
              {room.name}
              <button on:click={() => deleteRoom(room._id)}>del</button>
            </div>
          {/each}
        {/await}
      </div>
    </div>
  </div>

  <div class="bottom-right ">
    <div class="flex">
      <input
        bind:value={newRoom}
        class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
        border-gray-200 bg-white"
        placeholder="room name" />

      <button
        class="px-6 bg-primary hover:bg-secondary text-white font-bold p-3
        uppercase "
        on:click={createNewRoom}>
        +room
      </button>
    </div>
  </div>

  {#if currentRoom._id != null}
    <div class="content-left">
      <h1 class="text-center p-3 uppercase">{currentRoom.name}</h1>
      <div class="py-6 px-8 text-md h-full overflow-y-scroll">
        {#await messages}
          loading
        {:then messages}
          {#each messages.data.Messages.filter(x => x.ChatRoom !== null && x.ChatRoom._id == currentRoom._id) as message}
            <p class="mb-4 py-2 px-3 rounded">
              {message.text} from {message.name} at {message.date}
            </p>
          {/each}
        {/await}
      </div>
    </div>
    <div class="bottom-left">
      <div class="flex">
        <input
          bind:value={newMessage}
          class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
          border-gray-200 bg-white"
          placeholder="enter your chat message here" />

        <button
          on:click={sendMessage}
          class="px-6 bg-primary hover:bg-secondary text-white font-bold p-3
          uppercase">
          Send
        </button>
      </div>
    </div>
  {:else}
    <div class="content-left">Please choose room</div>
  {/if}
</div>
