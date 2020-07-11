<script>
  export let progress = [
    {
      style: "w-1/6 bg-green-500"
    },
    {
      style: "w-1/6"
    },
    {
      style: "w-1/6"
    },
    {
      style: "w-1/6"
    },
    {
      style: "w-1/6"
    }
  ];
  export let style = {
    height: "h-2"
  };
</script>

<div class="relative">
  <div class="overflow-hidden {style.height} mb-4 text-xs flex bg-gray-100">
    {#each progress as p}
      <div
        class="{p.style} shadow-none flex flex-col text-center whitespace-nowrap
        text-white justify-center border-r border-gray-400" />
    {/each}
  </div>
</div>
