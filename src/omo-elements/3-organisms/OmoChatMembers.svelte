<script>
  const users = [
    { mail: "x@omo.earth", bg: "bg-green-300" },
    { mail: "y@omo.earth", bg: "bg-blue-300" }
  ];
</script>

<style>
  .left {
    @apply bg-gray-200 h-full;
  }
  .item {
    @apply text-xl;
  }
</style>

<form class="flex">
  <input
    class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
    border-gray-200 bg-white"
    placeholder="enter email" />

  <button class="px-6 bg-green-400 text-gray-800 font-bold p-3 uppercase ">
    Invite
  </button>

</form>
<ul class="py-6 px-8">
  {#each users as user}
    <p class="mb-4 py-2 px-3 rounded {user.bg}">{user.mail}</p>
  {/each}
</ul>
