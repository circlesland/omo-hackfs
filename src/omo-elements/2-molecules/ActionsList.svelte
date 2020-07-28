<script>
  let actions = [
    {
      name: "omo.safe.trust",
      event: () => {
        return {
          _$eventType: "omo.safe.trust",
          _id: "",
          timestamp: new Date().toJSON(),
          data: {
            trustGiver: {
              // Owner of the trust-giving safe
              address: "string",
              privateKey: "string"
            },
            trustGiverSafe: "", // The trust-giving safe (web3.utils.toChecksumAddress(window.o.odentity.current.circleSafe.safeAddress.trim());)
            trustReceiverSafe: "" // The trust-receiving safe (web3.utils.toChecksumAddress(trustSafeAddress.trim()))
          }
        };
      }
    },
    {
      name: "omo.safe.untrust",
      event: () => {
        return {
          _$eventType: "omo.safe.untrust",
          _id: "",
          timestamp: new Date().toJSON(),
          data: {
            exTrustGiver: {
              // Owner of the trust-taking safe
              address: "string",
              privateKey: "string"
            },
            exTrustGiverSafe: "", // The trust-taking safe (web3.utils.toChecksumAddress(window.o.odentity.current.circleSafe.safeAddress.trim());)
            exTrustReceiverSafe: "" // The trust-loosing safe (web3.utils.toChecksumAddress(trustSafeAddress.trim()))
          }
        };
      }
    },
    {
      name: "omo.safe.transfer",
      event: () => {
        return {
          _$eventType: "omo.safe.transfer",
          _id: "",
          timestamp: new Date().toJSON(),
          data: {
            spendSafeOwner: {
              // Owner of the trust-taking safe
              address: "string",
              privateKey: "string"
            },
            spendSafe: "",
            receivingSafe: "",
            amount: 0.123
          }
        };
      }
    },
    {
      name: "omo.safe.addOwner",
      event: () => {
        return {
          _$eventType: "omo.safe.addOwner",
          _id: "",
          timestamp: new Date().toJSON(),
          data: {}
        };
      }
    },
    {
      name: "omo.safe.removeOwner",
      event: () => {
        return {
          _$eventType: "omo.safe.removeOwner",
          _id: "",
          timestamp: new Date().toJSON(),
          data: {}
        };
      }
    }
  ];

  function click(action) {
    window.eventBroker.tryGetTopic("omo", "notification").publish(action);
  }
</script>

<div
  class="flex content-end justify-center w-full flex-wrap bg-gray-100 h-full">
  <div class="text-gray-700 bg-gray-200 w-full lg:w-2/3">
    {#each actions as action}
      <div
        on:click={() => click(action.event())}
        class="py-4 px-8 hover:bg-primary hover:text-white">
        {action.name}
        <div
          class="text-xs truncate w-full normal-case font-normal -mt-1
          text-gray-500">
          description
        </div>
      </div>
    {/each}
  </div>
</div>

<!-- <div class="h-full flex content-end flex-wrap w-full">
  <div class="flex justify-center w-full">
    {#each actions as action}
      <div class="flex flex-col items-center relative">
        <div class="w-full">
          <div class="cursor-pointer w-full lg:w-2/3 bg-gray-200">
            <div on:click={() => click(action.event())} class="py-2 px-4">
              Action title
              <div
                class="text-xs truncate w-full normal-case font-normal -mt-1
                text-gray-500">
                Action description
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div> -->

<!-- 
<div class="w-full md:w-1/2 mx-auto bg-red-300">

  <div class="flex flex-col w-full bg-gray-100">
    <div
      class="cursor-pointer w-full border-gray-100 rounded-t border-b
      hover:bg-primary">
      <div class="flex w-full items-center p-2 pl-2 ">
        <div class="w-full items-center flex">
          <div class="mx-2 -mt-1 ">
            Jack jhon
            <div
              class="text-xs truncate w-full normal-case font-normal -mt-1
              text-gray-500">
              CEO &amp; managin director
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> -->
<!-- 
<section>
  {#each actions as action}
    <div class="p-2 w-full md:w-4/5 lg:w-3/5 mx-auto">
      <div
        class="inline-flex items-center bg-gray-100 leading-none text-primary
        rounded p-1 shadow text-primary text-sm w-full">
        <a
          href="#"
          on:click={() => click(action.event())}
          class="inline-flex px-2">
          {action.name}
        </a>
      </div>
    </div>
  {/each}
</section> -->
