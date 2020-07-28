<script>
import OmoTabs from "./../2-molecules/OmoTabs";
  import moment from "moment";

  import {
    getSafeOwnerFromLocalStorage,
    getSafeFromLocalStorage,
    sendCircles,
  } from "./../../omo-actions/Circles";

  //Tabs
  let currentTab;

  let trustSafeAddress;

  let tabItems = [
    { label: "Transactions", value: 1 },
    { label: "Token", value: 2 },
    { label: "Credit you Receive", value: 3 },
    { label: "Credit you Give", value: 4 },
    { label: "UBI Payouts", value: 5 }
  ];

  export let data = {
    safeAddress: "",
    safeData: {},
    transferData: {}
  };

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

  // Make Ø 1 payments to trusted addresses
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

  async function trust() {
    let safeGivingChecksumAddress = window.o.web3.utils.toChecksumAddress(window.o.odentity.current.circleSafe.safeAddress.trim());
    let safeReceivingChecksumAddress = window.o.web3.utils.toChecksumAddress(trustSafeAddress.trim());

    let trustGivingSafe = {
      safeAddress: safeGivingChecksumAddress
    };
    let trustReceivingSafe = {
      safeAddress: safeReceivingChecksumAddress
    };

    let response = await addTrustLineAsync(
            window.o.odentity.current.circleSafeOwner,
            trustGivingSafe,
            trustReceivingSafe,
            100);

    console.log("trusted:", response);
    // TODO: Implement
  }
</script>

<OmoTabs class="bg-primary" bind:activeTabValue={currentTab} items={tabItems} />
<section class="overflow-y-scroll">
  <div class="w-full md:w-5/6 lg:w-4/6 mx-auto">
    {#if 1 === currentTab}
      <div class="py-6 px-8 text-md mt-6">
        {#each data.transferData.data.notifications as item}
          {#if item.transfer.to != '0x812d4e73eb6b8200a62469ec3249fb02eac58c91' && item.transfer.from != '0x0000000000000000000000000000000000000000'}
            <div class="flex h-12 mb-4 w-full bg-gray-100 text-gray-700">
              {#if item.transfer.from == data.safeAddress}
                <img
                  alt=""
                  src="https://api.adorable.io/avatars/{item.transfer.to}"
                  class="h-full w-auto" />
                <div class="text-sm py-2 px-4 w-full">
                  <p>{item.transfer.to}</p>
                  <p class="text-xs -mt-3 text-gray-600">
                    {moment
                      .unix(item.time)
                      .locale('en')
                      .fromNow()}
                  </p>
                </div>
                <div class="h-12 py-1 px-3 text-2xl text-red-400">
                  Ø{(item.transfer.amount / 1000000000000000000).toFixed(2)}
                </div>
              {:else}
                <img
                  alt=""
                  src="https://api.adorable.io/avatars/{item.transfer.from}"
                  class="h-full w-auto" />
                <div class="text-sm py-2 px-4 w-full">
                  <p>{item.transfer.from}</p>
                  <p class="text-xs -mt-3 text-gray-600">
                    {moment
                      .unix(item.time)
                      .locale('en')
                      .fromNow()}
                  </p>
                </div>
                <div class="h-12 py-1 px-3 text-2xl text-green-400">
                  Ø{(item.transfer.amount / 1000000000000000000).toFixed(2)}
                </div>
              {/if}
            </div>
          {/if}
        {/each}
      </div>
    {/if}

    {#if 2 === currentTab}
      <div class="py-6 px-8 text-md mt-6">
        {#each data.safeData.data.safes[0].balances as item}
          <div class="flex h-12 mb-4 w-full bg-gray-100">
            {#if item.token.owner.id == '0x0e22dfe2ff3d1734b69c099dd46632fa3ec16678'}
              <img alt="" src="/profiles/samuel.jpg" class="h-full w-auto" />
              <p class="py-3 px-4 rounded flex-1">Samuel Taler</p>
            {:else if item.token.owner.id == '0x206b9f90df961871c1da12c7fd6d7fd32d357d11'}
              <img alt="" src="/profiles/philipp.jpg" class="h-full w-auto" />
              <p class="py-3 px-4 rounded flex-1">Philipp Taler</p>
            {:else}
              <img
                alt=""
                src="https://api.adorable.io/avatars/{item.token.owner.id}"
                class="h-full w-auto" />
              <p class="py-3 px-4 rounded flex-1">{item.token.owner.id}</p>
            {/if}
            <div class="h-12 py-1 px-3 text-2xl text-blue-400">
              Ø{(item.amount / 1000000000000000000).toFixed(2)}
            </div>
          </div>
        {/each}
      </div>
    {/if}

    {#if 3 === currentTab}
      <div class="py-6 px-8 text-md mt-6">
        {#each data.safeData.data.safes[0].outgoing as item}
          <div class="flex h-12 mb-4 w-full bg-gray-100">
            <img
              alt=""
              src="https://api.adorable.io/avatars/{item.canSendTo.id}"
              class="h-full w-auto" />
            <p class="py-3 px-4 flex-1 text-gray-700">{item.canSendTo.id}</p>
            <div class="h-12 py-1 px-3 text-2xl text-blue-400">
              ({item.limitPercentage}%) Ø{(item.limit / 1000000000000000000).toFixed(0)}
            </div>
            <span
              class="h-full py-2 px-4 bg-secondary text-lg text-white
              cursor-pointer uppercase"
              on:click={() => handleSendButton(item.canSendTo.id)}>
              send Ø 1
            </span>
          </div>
        {/each}
      </div>
    {/if}

    {#if 4 === currentTab}
      <div class="py-6 px-8 text-md mt-6">

        <form class="flex flex-col pt-3 md:pt-8"
                onsubmit="event.preventDefault();">
          <div class="flex flex-col pt-6">
            <input
                    type="text"
                    id="safeAddress"
                    bind:value={trustSafeAddress}
                    placeholder="Safe address"
                    class="appearance-none border rounded w-full py-4 px-6
                      text-gray-700 text-xl mt-1 leading-tight focus:outline-none
                      focus:shadow-outline" />
          </div>

          <button
                  on:click={() => trust()}
                  type="submit"
                  value="Log In"
                  class="bg-primary rounded text-white font-bold text-lg hover:bg-secondary p-2">
            Trust
          </button>
        </form>

        {#each data.safeData.data.safes[0].incoming as item}
          <div class="flex h-12 mb-4 w-full bg-gray-100 text-gray-700">
            {#if item.user}
              <img
                alt=""
                src="https://api.adorable.io/avatars/{item.user.id}"
                class="h-full w-auto" />
              <div class="py-3 px-4 rounded flex-1">{item.user.id}</div>
              <div class="h-12 py-1 px-3 text-2xl text-blue-400">
                ({item.limitPercentage}%) Ø{(item.limit / 1000000000000000000).toFixed(2)}
              </div>
            {:else}
              <p class="py-3 px-4 rounded flex-1">User not activated</p>
            {/if}
          </div>
        {/each}
      </div>
    {/if}

    {#if 5 === currentTab}
      <div class="py-6 px-8 text-md mt-6">
        {#each data.transferData.data.notifications as item}
          {#if item.transfer.from === '0x0000000000000000000000000000000000000000'}
            <div
              class="flex h-12 mb-4 w-full bg-gray-100 rounded text-gray-700">
              <img
                alt="ubi payout"
                src="/logos/logo.png"
                class="h-full w-auto" />
              <div class="text-sm py-2 px-4 w-full">
                <p>Universal basic income payout</p>
                <p class="text-xs -mt-3 text-gray-600">
                  {moment
                    .unix(item.time)
                    .locale('en')
                    .fromNow()}
                </p>
              </div>
              <div class="h-12 py-1 px-3 text-2xl text-green-400">
                Ø{(item.transfer.amount / 1000000000000000000).toFixed(2)}
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
</section>
