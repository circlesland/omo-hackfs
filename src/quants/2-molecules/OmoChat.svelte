<script>
    import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";
    import moment from "moment";
    import {observe} from "svelte-observable";

    export function list() {
    }

    let newRoom = "";

    async function createNewRoom() {
        currentRoom = (await o.graphQL.mutation(
                `addChatRoom(name:"${newRoom}") {_id name}`
        )).data.addChatRoom;
        newRoom = "";
    }

    async function deleteRoom(id) {
        await o.graphQL.mutation(`deleteChatRoom(_id:"${id}") {name}`);
        if (currentRoom._id == id) currentRoom = {_id: null};
    }

    function chooseRoom(room) {
        currentRoom = room;
    }

    let rooms = observe(
      window.o.graphQL.subscribe(
              "ChatRooms{_id,name}"
      ));


    let currentRoom = {_id: null};
    let messages;

    $: {
        console.warn(currentRoom);
        console.warn("MESSAGES");
        messages = observe(window.o.graphQL.subscribe(
                "Messages{_id,text, name, date, ChatRoom{_id}}"
        ));
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
        grid-template-areas: "content-left content-right" "bottom-left bottom-right";
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

<OmoIconsFA/>

<div class="omo-layout">

    <div class="content-right bg-gray-100">
        <div class="py-6 px-8 text-md ">
            <div class="bg-gray-300 overflow-y-scroll">
              {#await $rooms}
                  pending - No value or error has been received yet
              {:then result}
                {#each result.data.ChatRooms as room}
                    <div
                            on:click={() => chooseRoom(room)}
                            class="text-md w-full py-2 bg-gray-200 hover:bg-secondary
              text-center text-blue-900 uppercase font-bold cursor-pointer "
                            class:active={room._id === currentRoom._id}>
                      {room.name}
                        <button on:click={() => deleteRoom(room._id)}>del</button>
                    </div>
                {/each}
              {:catch error}
                  rejected - Received an error
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
                    placeholder="room name"/>

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
      {#await $messages}
              pending - No value or error has been received yet
      {:then result}
              {#each result.data.Messages.filter(x => x.ChatRoom !== null && x.ChatRoom._id == currentRoom._id) as message}
                  <li
                          class="flex flex-no-wrap items-center pr-3 text-black rounded-lg
              cursor-pointer mt-200 py-65 hover:bg-gray-200"
                          style="padding-top: 0.65rem; padding-bottom: 0.65rem">
                      <div class="flex justify-between w-full focus:outline-none">
                          <div class="flex justify-between w-full">
                              <div
                                      class="relative flex items-center justify-center w-12 h-12
                    ml-2 mr-3 text-xl font-semibold text-white bg-blue-500
                    rounded flex-no-shrink">
                                  <img
                                          class="object-cover w-12 h-12 rounded"
                                          src="https://images.unsplash.com/photo-1589349133269-183a6c90fbfc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100"
                                          alt=""/>
                              </div>
                              <div class="items-center flex-1 min-w-0">
                                  <div class="flex justify-between">
                                      <h2 class="text-sm font-semibold text-black -mb-2">
                                        {message.name}
                                      </h2>
                                      <div class="flex">
                        <span class="ml-1 text-xs font-medium text-gray-600">
                          {moment
                          .unix(message.date)
                          .locale('en')
                          .fromNow()}
                        </span>
                                      </div>
                                  </div>
                                  <div
                                          class="flex justify-between text-sm leading-none truncate">
                                      <span>{message.text}</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </li>
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
                      placeholder="enter your chat message here"/>

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
