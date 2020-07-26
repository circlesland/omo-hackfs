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
    loadingSafeDataAsync,
    loadingTransferDataAsync
  } from "./../../omo-data/queries/circles";

  //Tabs
  let currentTab;

  let tabItems = [
    { label: "Transactions", value: 1 },
    { label: "Token", value: 2 },
    { label: "Credit you Receive", value: 3 },
    { label: "Credit you Give", value: 4 },
    { label: "UBI Payouts", value: 5 }
  ];

  // Loading Default Safe
  let safeAddress = "0xc1251f7a72b54d025338c4808b059699baa12472";

  // Loading SafeAddress from Localstorage
  safeAddress = getSafeFromLocalStorage().safeAddress;

  // Loading SafeData from
  let safeData = loadingSafeDataAsync(safeAddress);

  let transferData = loadingTransferDataAsync(safeAddress);

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

  function handleSendButton(safeAddress) {
    sendCircles(
      getSafeOwnerFromLocalStorage(),
      getSafeFromLocalStorage(),
      {
        safeAddress: safeAddress
      },
      "1"
    );
  }
</script>

<main>
  {#await safeData}
    <p>loading</p>
  {:then result}
    <div class="flex justify-center text-center bg-primary py-20 w-100">
      <div class="">
        <h1 class="text-blue-100 text-6xl">Ø{sumCircles(result).toFixed(2)}</h1>
        <span class="text-center text-blue-400">{result.data.safes[0].id}</span>
      </div>
    </div>
  {/await}
  <OmoTabs
    class="bg-primary"
    bind:activeTabValue={currentTab}
    items={tabItems} />
  <div class="w-full md:w-5/6 lg:w-4/6 mx-auto">
    {#if 1 === currentTab}
      {#await transferData}
        <p>loading</p>
      {:then result}
        <div class="py-6 px-8 text-md mt-6">
          {#each result.data.notifications as data}
            {#if data.transfer.to != '0x812d4e73eb6b8200a62469ec3249fb02eac58c91' && data.transfer.from != '0x0000000000000000000000000000000000000000'}
              <div class="flex h-12 mb-4 w-full bg-gray-100 text-gray-700">
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
                    Ø{(data.transfer.amount / 1000000000000000000).toFixed(2)}
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
                    Ø{(data.transfer.amount / 1000000000000000000).toFixed(2)}
                  </div>
                {/if}
              </div>
            {/if}
          {/each}
        </div>
      {/await}
    {/if}

    {#if 2 === currentTab}
      {#await safeData}
        <p>loading</p>
      {:then result}
        <div class="py-6 px-8 text-md mt-6">
          {#each result.data.safes[0].balances as data}
            <div class="flex h-12 mb-4 w-full bg-gray-100">
              {#if data.token.owner.id == '0x0e22dfe2ff3d1734b69c099dd46632fa3ec16678'}
                <img alt="" src="/profiles/samuel.jpg" class="h-full w-auto" />
                <p class="py-3 px-4 rounded flex-1">Samuel Taler</p>
              {:else if data.token.owner.id == '0x206b9f90df961871c1da12c7fd6d7fd32d357d11'}
                <img alt="" src="/profiles/philipp.jpg" class="h-full w-auto" />
                <p class="py-3 px-4 rounded flex-1">Philipp Taler</p>
              {:else}
                <img
                  alt=""
                  src="https://api.adorable.io/avatars/{data.token.owner.id}"
                  class="h-full w-auto" />
                <p class="py-3 px-4 rounded flex-1">{data.token.owner.id}</p>
              {/if}
              <div class="h-12 py-1 px-3 text-2xl text-blue-400">
                Ø{(data.amount / 1000000000000000000).toFixed(2)}
              </div>
            </div>
          {/each}
        </div>
      {/await}
    {/if}

    {#if 3 === currentTab}
      {#await safeData}
        <p>loading</p>
      {:then result}
        <div class="py-6 px-8 text-md mt-6">
          {#each result.data.safes[0].outgoing as data}
            <div class="flex h-12 mb-4 w-full bg-gray-100">
              <img
                alt=""
                src="https://api.adorable.io/avatars/{data.canSendTo.id}"
                class="h-full w-auto" />
              <p class="py-3 px-4 flex-1 text-gray-700">{data.canSendTo.id}</p>
              <div class="h-12 py-1 px-3 text-2xl text-blue-400">
                ({data.limitPercentage}%) Ø{(data.limit / 1000000000000000000).toFixed(0)}
              </div>
              <span
                class="h-full py-2 px-4 bg-secondary text-lg text-white
                cursor-pointer uppercase"
                on:click={() => handleSendButton(data.canSendTo.id)}>
                send Ø 1
              </span>
            </div>
          {/each}
        </div>
      {/await}
    {/if}

    {#if 4 === currentTab}
      {#await safeData}
        <p>loading</p>
      {:then result}
        <div class="py-6 px-8 text-md mt-6">
          {#each result.data.safes[0].incoming as data}
            <div class="flex h-12 mb-4 w-full bg-gray-100 text-gray-700">
              {#if data.user}
                <img
                  alt=""
                  src="https://api.adorable.io/avatars/{data.user.id}"
                  class="h-full w-auto" />
                <div class="py-3 px-4 rounded flex-1">{data.user.id}</div>
                <div class="h-12 py-1 px-3 text-2xl text-blue-400">
                  ({data.limitPercentage}%) Ø{(data.limit / 1000000000000000000).toFixed(2)}
                </div>
              {:else}
                <p class="py-3 px-4 rounded flex-1">User not activated</p>
              {/if}
            </div>
          {/each}
        </div>
      {/await}
    {/if}

    {#if 5 === currentTab}
      {#await transferData}
        <p>loading</p>
      {:then result}
        <div class="py-6 px-8 text-md mt-6">
          {#each result.data.notifications as data}
            {#if data.transfer.from === '0x0000000000000000000000000000000000000000'}
              <div
                class="flex h-12 mb-4 w-full bg-gray-100 rounded text-gray-700">
                <img
                  alt="ubi payout"
                  src="/logos/logo.png"
                  class="h-full w-auto" />
                <p class="py-3 px-4 rounded w-full">
                  MamaOmo's universal basic income payout ({moment
                    .unix(data.time)
                    .locale('en')
                    .fromNow()})
                </p>
                <div class="h-12 py-1 px-3 text-2xl text-green-400">
                  Ø{(data.transfer.amount / 1000000000000000000).toFixed(2)}
                </div>
              </div>
            {/if}
          {/each}
        </div>
      {/await}
    {/if}
  </div>
</main>
