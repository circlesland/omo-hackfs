<script>
  import { ChatRoom } from "./../../Core/Chat.ts";
  const users = [
    { mail: "x@omo.earth", bg: "bg-green-300" },
    { mail: "y@omo.earth", bg: "bg-blue-300" }
  ];

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
<ul class="py-6 px-8">
  {#each users as user}
    <p class="mb-4 py-2 px-3 rounded {user.bg}">{user.mail}</p>
  {/each}
</ul>
