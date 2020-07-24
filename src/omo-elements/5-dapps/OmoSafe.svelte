<script>
  import ApolloClient, { gql } from "apollo-boost";
  import { query } from "svelte-apollo";
  import { onMount } from "svelte";
  import OmoHero from "./../2-molecules/OmoHero";
  import OmoTabs from "./../2-molecules/OmoTabs.svelte";

  // List of tab items with labels and values.
  let tabItems = [
    { label: "Token", value: 1 },
    { label: "Transfer IN", value: 2 },
    { label: "Transfer OUT", value: 3 },
    { label: "Trusted By", value: 4 },
    { label: "You Trust", value: 5 },
    { label: "Notifications", value: 6 }
  ];

  // Current active tab
  let currentTab;

  const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/circlesubi/circles"
  });

  let publickey = "0xc1251f7A72B54d025338C4808b059699baA12472";
  // Samuel: 0x0e22dfe2ff3d1734b69c099dd46632fa3ec16678
  // Phibar: 0x206b9f90df961871c1da12c7fd6d7fd32d357d11
  // Omo1: 0xc1251f7A72B54d025338C4808b059699baA12472
  // Omo2: 0xD4f7F5afed7e869C42648c1B8AB7C394e3B11ECD
  // Omo3: 0xa12adCA8F70b1F3899EC4685C809f28BCE1986dC

  publickey = publickey.toLowerCase();

  let balancesResult;
  let transferOUTResult;
  let transferINResult;
  let trustINResult;
  let trustOUTResult;

  let queryBalances = gql`
  {
      safes(where: {id: "${publickey}"})
        {
        id 
      balances(orderBy: amount, orderDirection: desc) {
        id
        amount
            token {
              id
              owner {
                id
              }
            }
      }
      }
    }
 
  `;

  let queryTransferOUT = gql`
    {
      transfers(
        orderBy: id
        orderDirection: desc
        where: { from: "${publickey}" }
      ) {
        from
        to
        amount
      }
    }
  `;

  let queryTransferIN = gql`
    {
      transfers(
        orderBy: id
        orderDirection: desc
        where: { to: "${publickey}" }
      ) {
        from
        to
        amount
      }
    }
  `;

  let queryTrustIN = gql`
    {
      safes(
        where: { id: "${publickey}" }
      ) {   
          incoming(orderBy: limit, orderDirection: desc) {
            limit
            limitPercentage
            user {
              id
            }
          }     
      }
    }
  `;

  let queryTrustOUT = gql`
    {
      safes(
        where: { id: "${publickey}" }
      ) {
          outgoing(orderBy: limit, orderDirection: desc) {
            limit
            limitPercentage
            canSendTo {
              id
            }         
        }
      }
    }
  `;

  balancesResult = query(client, {
    query: queryBalances
  });

  transferOUTResult = query(client, {
    query: queryTransferOUT
  });

  transferINResult = query(client, {
    query: queryTransferIN
  });

  trustINResult = query(client, {
    query: queryTrustIN
  });

  trustOUTResult = query(client, {
    query: queryTrustOUT
  });

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
</script>

<main>
  {#await $balancesResult}
    <p>loading</p>
  {:then query}
    <h1
      class="bg-gray-200 py-20 w-100 text-green-400 text-6xl flex justify-center
      text-center">
      {sumCircles(query).toFixed(2)}
    </h1>
  {/await}
  <OmoTabs bind:activeTabValue={currentTab} items={tabItems} />

  {#if 1 === currentTab}
    {#await $balancesResult}
      <p>loading</p>
    {:then query}
      <div class="py-6 px-8 text-md">
        {#each query.data.safes[0].balances as b}
          <div class="flex h-12 mb-4 w-full bg-gray-100">
            {#if b.token.owner.id == '0x0e22dfe2ff3d1734b69c099dd46632fa3ec16678'}
              <img alt="" src="/profiles/samuel.jpg" class="h-full w-auto" />
              <p class="py-3 px-4 rounded w-full">Samuel Taler</p>
            {:else if b.token.owner.id == '0x206b9f90df961871c1da12c7fd6d7fd32d357d11'}
              <img alt="" src="/profiles/philipp.jpg" class="h-full w-auto" />
              <p class="py-3 px-4 rounded w-full">Philipp Taler</p>
            {:else}
              <img
                alt=""
                src="https://api.adorable.io/avatars/{b.token.owner.id}"
                class="h-full w-auto" />
              <p class="py-3 px-4 rounded w-full">{b.token.owner.id}</p>
            {/if}
            <div class="h-12 py-1 px-3 text-2xl text-green-400">
              {(b.amount / 1000000000000000000).toFixed(2)}
            </div>
          </div>
        {/each}
      </div>
    {/await}
  {/if}

  {#if 2 === currentTab}
    {#await $transferINResult}
      <p>loading</p>
    {:then query}
      <div class="py-6 px-8 text-md">
        {#each query.data.transfers as data}
          <div class="flex h-12 mb-4 w-full bg-gray-100">

            {#if data.from == '0x0000000000000000000000000000000000000000'}
              <img alt="" src="/logos/omo.png" class="h-full w-auto" />
              <p class="py-3 px-4 rounded w-full">Universal basic income</p>
            {:else if data.from == '0x0e22dfe2ff3d1734b69c099dd46632fa3ec16678'}
              <img alt="" src="/profiles/samuel.jpg" class="h-full w-auto" />
              <p class="py-3 px-4 rounded w-full">Samuel Taler</p>
            {:else if data.from == '0x206b9f90df961871c1da12c7fd6d7fd32d357d11'}
              <img alt="" src="/profiles/philipp.jpg" class="h-full w-auto" />
              <p class="py-3 px-4 rounded w-full">Philipp Taler</p>
            {:else}
              <img
                alt=""
                src="https://api.adorable.io/avatars/{data.from}"
                class="h-full w-auto" />
              <p class="py-3 px-4 rounded w-full">{data.from}</p>
            {/if}
            <div class="h-12 py-1 px-3 text-2xl text-green-400">
              {(data.amount / 1000000000000000000).toFixed(2)}
            </div>

          </div>
        {/each}
      </div>
    {/await}
  {/if}

  {#if 3 === currentTab}
    {#await $transferOUTResult}
      <p>loading</p>
    {:then query}
      <div class="py-6 px-8 text-md">
        {#each query.data.transfers as data}
          {#if data.to != '0x812d4e73eb6b8200a62469ec3249fb02eac58c91'}
            <div class="flex h-12 mb-4 w-full bg-gray-100">
              {#if data.to == '0x0e22dfe2ff3d1734b69c099dd46632fa3ec16678'}
                <img alt="" src="/profiles/samuel.jpg" class="h-full w-auto" />
                <p class="py-3 px-4 rounded w-full">Samuel Taler</p>
              {:else if data.to == '0x206b9f90df961871c1da12c7fd6d7fd32d357d11'}
                <img alt="" src="/profiles/philipp.jpg" class="h-full w-auto" />
                <p class="py-3 px-4 rounded w-full">Philipp Taler</p>
              {:else}
                <img
                  alt=""
                  src="https://api.adorable.io/avatars/{data.to}"
                  class="h-full w-auto" />
                <p class="py-3 px-4 rounded w-full">{data.to}</p>
              {/if}
              <div class="h-12 py-1 px-3 text-2xl text-green-400">
                {(data.amount / 1000000000000000000).toFixed(2)}
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {/await}
  {/if}

  {#if 4 === currentTab}
    {#await $trustOUTResult}
      <p>loading</p>
    {:then query}
      <div class="py-6 px-8 text-md">
        {#each query.data.safes[0].outgoing as data}
          <div class="flex h-12 mb-4 w-full bg-gray-100">
            <img
              alt=""
              src="https://api.adorable.io/avatars/{data.canSendTo.id}"
              class="h-full w-auto" />
            <p class="py-3 px-4 rounded w-full">
              {data.canSendTo.id} (max limit you can send to this address: {data.limitPercentage}%)
            </p>
            <div class="h-12 py-1 px-3 text-2xl text-blue-400">
              {(data.limit / 1000000000000000000).toFixed(2)}
            </div>
          </div>
        {/each}
      </div>
    {/await}
  {/if}

  {#if 5 === currentTab}
    {#await $trustINResult}
      <p>loading</p>
    {:then query}
      <div class="py-6 px-8 text-md">
        {#each query.data.safes[0].incoming as data}
          <div class="flex h-12 mb-4 w-full bg-gray-100">
            {#if data.user}
              <img
                alt=""
                src="https://api.adorable.io/avatars/{data.user.id}"
                class="h-full w-auto" />
              <p class="py-3 px-4 rounded w-full">
                {data.user.id} (max limit you can receive from this address: {data.limitPercentage}%)
              </p>
            {:else}
              <p class="py-3 px-4 rounded w-full">User not found anymore</p>
            {/if}
            <div class="h-12 py-1 px-3 text-2xl text-blue-400">
              {(data.limit / 1000000000000000000).toFixed(2)}
            </div>
          </div>
        {/each}
      </div>
    {/await}
  {/if}

</main>

<!-- <OmoHero data={hero} /> -->

<!-- <div class="py-6 px-8 text-md">
    {#each balances as b}
      <div class="flex h-12 mb-4 w-full bg-gray-100">
        <img alt="" src={b.picture.medium} class="h-full w-auto" />
        <p class="py-3 px-4 rounded w-full">{b.name.first}</p>
        {#if b.amount >= 0}
          <div class="h-12 py-1 px-3 text-2xl text-green-400">{b.amount}</div>
        {/if}
        {#if b.amount < 0}
          <div class="h-12 py-1 px-3 text-2xl text-red-400">{b.amount}</div>
        {/if}
      </div>
    {/each}
  </div> -->
