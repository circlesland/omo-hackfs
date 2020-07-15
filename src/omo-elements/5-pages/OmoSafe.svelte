<script>
  import OmoHero from "./../2-molecules/OmoHero";
  import OmoLayoutOverflowY from "./../4-layouts/OmoLayoutOverflowY";
</script>

<OmoHero data={hero} />

<OmoLayoutOverflowY>

  <div class="py-6 px-8 text-md">
    {#each transactions as item}
      <div class="flex h-12 mb-4 w-full bg-gray-100">
        <img src={item.picture.medium} class="h-full w-auto" />
        <p class="py-3 px-4 rounded w-full">{item.name.first}</p>
        {#if item.amount >= 0}
          <div class="h-12 py-1 px-3 text-2xl text-green-400">
            {item.amount}
          </div>
        {/if}
        {#if item.amount < 0}
          <div class="h-12 py-1 px-3 text-2xl text-red-400">{item.amount}</div>
        {/if}

      </div>
    {/each}
  </div>
</OmoLayoutOverflowY>
