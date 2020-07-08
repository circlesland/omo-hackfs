<script>
  import OmoHero from "./../2-molecules/OmoHero";

  export let hero = {
    uptitle: "my balance",
    title: "624 Ø"
  };
  export let transactions = [];

  fetch("https://randomuser.me/api?results=10")
    .then(response => response.json())
    .then(
      data =>
        (transactions = data.results.map(item => {
          item.amount = Math.floor(Math.random() * 200) - 100;
          return item;
        }))
    );
</script>

<OmoHero data={hero} />

<div class="py-6 px-8 text-md">
  {#each transactions as item}
    <div class="flex h-12 mb-4 w-full bg-gray-100">
      <img src={item.picture.medium} class="h-full w-auto" />
      <p class="py-3 px-4 rounded w-full">{item.name.first}</p>
      {#if item.amount >= 0}
        <div class="h-12 py-1 px-3 text-2xl text-green-400">{item.amount}</div>
      {/if}
      {#if item.amount < 0}
        <div class="h-12 py-1 px-3 text-2xl text-red-400">{item.amount}</div>
      {/if}

    </div>
  {/each}
</div>
