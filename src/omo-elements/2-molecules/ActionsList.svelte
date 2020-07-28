<script>
    import {Trust} from "../../Core/Data/Entities/Events/omo/safe/trust";
    import {RemoveOwner} from "../../Core/Data/Entities/Events/omo/safe/removeOwner";
    import {AddOwner} from "../../Core/Data/Entities/Events/omo/safe/addOwner";
    import {Untrust} from "../../Core/Data/Entities/Events/omo/safe/untrust";
    import {Transfer} from "../../Core/Data/Entities/Events/omo/safe/transfer";

    let actions =  [{
        title: "Trust someone",
        event: () => {
            const event = new Trust();
            event.data = {
                trustGiver: { // Owner of the trust-giving safe
                    address: "string",
                    privateKey: "string"
                },
                trustGiverSafe: "", // The trust-giving safe (web3.utils.toChecksumAddress(window.o.odentity.current.circleSafe.safeAddress.trim());)
                trustReceiverSafe: "", // The trust-receiving safe (web3.utils.toChecksumAddress(trustSafeAddress.trim()))
            };
            return event;
        }
    },{
        title: "Untrust someone",
        event: () => {
            const event = new Untrust();
            event.data = {
                formerTrustGiver: { // Owner of the trust-taking safe
                    address: "string",
                    privateKey: "string"
                },
                formerTrustGiverSafe: "", // The trust-taking safe (web3.utils.toChecksumAddress(window.o.odentity.current.circleSafe.safeAddress.trim());)
                formerTrustReceiverSafe: "", // The trust-loosing safe (web3.utils.toChecksumAddress(trustSafeAddress.trim()))
            };
            return event;
        }
    },{
        title: "Send Circles",
        event: () => {
            const event = new Transfer();
            event.data = {
                spendSafeOwner: { // Owner of the trust-taking safe
                    address: "string",
                    privateKey: "string"
                },
                spendSafe: "",
                receivingSafe: "",
                amount: 0.123
            };
            return event;
        }
    },{
        title: "Add another owner to this safe",
        event: () => {
            const event = new AddOwner();
            event.data = {
                ownerAddress: "ownerAddress",
                safeAddress: "safeAddress"
            };
            return event;
        }
    },{
        title: "Remove an owner from this safe",
        event: () => {
            const event = new RemoveOwner();
            event.data = {
                ownerAddress: "ownerAddress",
                safeAddress: "safeAddress"
            };
            return event;
        }
    }];

  function click(action) {
    window.eventBroker.tryGetTopic("omo", "shell").publish(action);
  }
</script>

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
</section>
