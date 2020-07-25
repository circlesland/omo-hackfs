<script>
  import OmoHero from "./../2-molecules/OmoHero";
  import OmoTabs from "./../2-molecules/OmoTabs";
  import moment from "moment";

  import {
    getSafeOwnerFromLocalStorage,
    getSafeFromLocalStorage,
    sendCircles
  } from "./../../omo-actions/Circles";
  import {
    getSafeAddressAsync,
    loggedInSafe,
    transferResult
  } from "./../../omo-data/queries/circles";

  // List of tab items with labels and values.
  let tabItems = [
    { label: "Transactions", value: 1 },
    { label: "Token", value: 2 },
    { label: "Trusted By", value: 3 },
    { label: "You Trust", value: 4 }
  ];

  // Current active tab
  let currentTab;

  let safeAddress = "0xc1251f7a72b54d025338c4808b059699baa12472";

  safeAddress = getSafeFromLocalStorage().safeAddress;

  let safe = loggedInSafe(safeAddress);

  let transfers = transferResult(safeAddress);

  Array.prototype.sum = function(prop) {
    var total = 0;
    for (var i = 0, _len = this.length; i < _len; i++) {
      total += parseInt(this[i][prop]);
    }
    return total;
  };

  function sumCircles(query) {
    var b = query.data.safes[0].balances;
    return b.sum("amount") / 1000000000000000000;
  }

  function handleSendButton() {
    sendCircles(
      getSafeOwnerFromLocalStorage(),
      getSafeFromLocalStorage(),
      {
        safeAddress: "0xc1251f7a72b54d025338c4808b059699baa12472"
      },
      "1"
    );
  }
</script>

<main>
  {#await safe}
    <p>loading</p>
  {:then query}
    <div class="flex justify-center text-center bg-gray-200 py-20 w-100">
      <div class="">
        <h1 class=" text-green-400 text-6xl ">
          {sumCircles(query).toFixed(2)}
        </h1>
        <span class="text-center">{query.data.safes[0].id}</span>
      </div>
    </div>

  {/await}
  <OmoTabs bind:activeTabValue={currentTab} items={tabItems} />

  {#await safe}
    <p>loading</p>
  {:then query}
    {#if 1 === currentTab}
      {#await transfers}
        <p>loading</p>
      {:then query}
        <div class="py-6 px-8 text-md">
          {#each query.data.notifications as data}
            {#if data.transfer.to != '0x812d4e73eb6b8200a62469ec3249fb02eac58c91' && data.transfer.from != '0x0000000000000000000000000000000000000000'}
              <div class="flex h-12 mb-4 w-full bg-gray-100">
                <!-- {JSON.stringify(data)} -->
                {#if data.transfer.from == safeAddress}
                  <img
                    alt=""
                    src="https://api.adorable.io/avatars/{data.transfer.to}"
                    class="h-full w-auto" />
                  <p class="py-3 px-4 rounded w-full">
                    {data.transfer.to} ({moment
                      .unix(data.time)
                      .locale('en')
                      .fromNow()})
                  </p>
                  <div class="h-12 py-1 px-3 text-2xl text-red-400">
                    {(data.transfer.amount / 1000000000000000000).toFixed(4)}
                  </div>
                {:else}
                  <img
                    alt=""
                    src="https://api.adorable.io/avatars/{data.transfer.from}"
                    class="h-full w-auto" />
                  <p class="py-3 px-4 rounded w-full">
                    {data.transfer.from} ({moment
                      .unix(data.time)
                      .locale('en')
                      .fromNow()})
                  </p>
                  <div class="h-12 py-1 px-3 text-2xl text-green-400">
                    {(data.transfer.amount / 1000000000000000000).toFixed(4)}
                  </div>
                {/if}
              </div>
            {/if}
          {/each}
        </div>
      {/await}
    {/if}
    {#if 2 === currentTab}
      <div class="py-6 px-8 text-md">
        {#each query.data.safes[0].balances as data}
          <div class="flex h-12 mb-4 w-full bg-gray-100">
            {#if data.token.owner.id == '0x0e22dfe2ff3d1734b69c099dd46632fa3ec16678'}
              <img alt="" src="/profiles/samuel.jpg" class="h-full w-auto" />
              <p class="py-3 px-4 rounded w-full">Samuel Taler</p>
            {:else if data.token.owner.id == '0x206b9f90df961871c1da12c7fd6d7fd32d357d11'}
              <img alt="" src="/profiles/philipp.jpg" class="h-full w-auto" />
              <p class="py-3 px-4 rounded w-full">Philipp Taler</p>
            {:else}
              <img
                alt=""
                src="https://api.adorable.io/avatars/{data.token.owner.id}"
                class="h-full w-auto" />
              <p class="py-3 px-4 rounded w-full">{data.token.owner.id}</p>
            {/if}
            <div class="h-12 py-1 px-3 text-2xl text-green-400">
              {(data.amount / 1000000000000000000).toFixed(2)}
            </div>
          </div>
        {/each}
      </div>
    {/if}

    {#if 3 === currentTab}
      <div class="py-6 px-8 text-md">
        {#each query.data.safes[0].outgoing as data}
          <div class="flex h-12 mb-4 w-full bg-gray-100">
            <img
              alt=""
              src="https://api.adorable.io/avatars/{data.canSendTo.id}"
              class="h-full w-auto" />
            <p class="py-3 px-4 rounded w-full">
              {data.canSendTo.id} (max limit you can send to this address: {data.limitPercentage}%)
              <span
                class="p-2 bg-primary text-white"
                on:click={() => handleSendButton()}>
                send 1
              </span>
            </p>
            <div class="h-12 py-1 px-3 text-2xl text-blue-400">
              {(data.limit / 1000000000000000000).toFixed(2)}
            </div>
          </div>
        {/each}
      </div>
    {/if}

    {#if 4 === currentTab}
      <div class="py-6 px-8 text-md">
        {#each query.data.safes[0].incoming as data}
          <div class="flex h-12 mb-4 w-full bg-gray-100">
            {#if data.user}
              <img
                alt=""
                src="https://api.adorable.io/avatars/{data.user.id}"
                class="h-full w-auto" />
              <div class="py-3 px-4 rounded w-full">
                {data.user.id} (max limit you can receive from this address: {data.limitPercentage}%)
              </div>
            {:else}
              <p class="py-3 px-4 rounded w-full">User not activated</p>
            {/if}
            <div class="h-12 py-1 px-3 text-2xl text-blue-400">
              {(data.limit / 1000000000000000000).toFixed(2)}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  {/await}
</main>
