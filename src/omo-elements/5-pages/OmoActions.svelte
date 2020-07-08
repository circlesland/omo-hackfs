<script>
  import OmoHero from "./../2-molecules/OmoHero";

  export let actions = [
    {
      title: "Send Ø",
      action: "/"
    },
    {
      title: "Receive Ø",
      action: "/"
    },
    {
      title: "Invite",
      action: "/"
    },
    {
      title: "Search",
      action: "/"
    }
  ];
</script>

<div class="flex content-end flex-wrap h-full">
  <div class="w-full">
    {#each actions as action}
      <div
        class="text-center bg-gray-100 text-gray-800 p-4 border border-gray-200
        uppercase">
        {action.title}
      </div>
    {/each}
    <div class="pb-16" />
  </div>
</div>
