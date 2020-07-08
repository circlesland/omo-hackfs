<script>
  import { ChatRoom } from "./../../Core/Chat.ts";

  export let users = [];

  fetch("https://randomuser.me/api?results=4")
    .then(response => response.json())
    .then(
      data =>
        (users = data.results.map(item => {
          item.amount = Math.floor(Math.random() * 200) - 100;
          return item;
        }))
    );

  export let mail;
</script>

<style>
  .left {
    @apply bg-gray-200 h-full;
  }
  .item {
    @apply text-xl;
  }
</style>

<div class="flex content-end flex-wrap h-full">
  <div class="w-full">

    <div class="py-6 px-8 text-md">
      {#each users as user}
        <div class="flex h-12 mb-4 w-full bg-gray-100">
          <img src={user.picture.medium} class="h-full w-auto" />
          <p class="py-3 px-4 rounded w-full">{user.email}</p>
        </div>
      {/each}
    </div>

    <div class="flex">
      <input
        bind:value={mail}
        class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
        border-gray-200 bg-white"
        placeholder="enter email" />

      <button
        on:click={() => {
          window.ChatRoom.invite(mail);
        }}
        class="px-6 bg-green-400 text-gray-800 font-bold p-3 uppercase ">
        Invite
      </button>
    </div>
    <div class="pb-16" />
  </div>
</div>
