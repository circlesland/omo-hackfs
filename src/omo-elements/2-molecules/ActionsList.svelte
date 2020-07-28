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
            return new AddOwner();
        }
    },{
        title: "Remove an owner from this safe",
        event: () => {
            return new RemoveOwner();
        }
    }];

    function click(action) {
        window.eventBroker.tryGetTopic("omo", "notification").publish(action);
    }
</script>
hello list
{#each actions as action}
    <a on:click={() => click(action.event())}> {action.title} </a>
{/each}
