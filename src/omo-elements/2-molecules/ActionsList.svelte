<script>
    let actions =  [{
        name: "omo.safe.trust",
        event: () => {
            return {
                _$eventType: "omo.safe.trust",
                _id: "",
                timestamp: new Date().toJSON(),
                data: {
                    trustGiver: { // Owner of the trust-giving safe
                        address: "string",
                        privateKey: "string"
                    },
                    trustGiverSafe: "", // The trust-giving safe (web3.utils.toChecksumAddress(window.o.odentity.current.circleSafe.safeAddress.trim());)
                    trustReceiverSafe: "", // The trust-receiving safe (web3.utils.toChecksumAddress(trustSafeAddress.trim()))
                }
            }
        }
    },{
        name: "omo.safe.untrust",
        event: () => {
            return {
                _$eventType: "omo.safe.untrust",
                _id: "",
                timestamp: new Date().toJSON(),
                data: {
                    exTrustGiver: { // Owner of the trust-taking safe
                        address: "string",
                        privateKey: "string"
                    },
                    exTrustGiverSafe: "", // The trust-taking safe (web3.utils.toChecksumAddress(window.o.odentity.current.circleSafe.safeAddress.trim());)
                    exTrustReceiverSafe: "", // The trust-loosing safe (web3.utils.toChecksumAddress(trustSafeAddress.trim()))
                }
            }
        }
    },{
        name: "omo.safe.transfer",
        event: () => {
            return {
                _$eventType: "omo.safe.transfer",
                _id: "",
                timestamp: new Date().toJSON(),
                data: {
                    spendSafeOwner: { // Owner of the trust-taking safe
                        address: "string",
                        privateKey: "string"
                    },
                    spendSafe: "",
                    receivingSafe: "",
                    amount: 0.123
                }
            }
        }
    },{
        name: "omo.safe.addOwner",
        event: () => {
            return {
                _$eventType: "omo.safe.addOwner",
                _id: "",
                timestamp: new Date().toJSON(),
                data: {}
            }
        }
    },{
        name: "omo.safe.removeOwner",
        event: () => {
            return {
                _$eventType: "omo.safe.removeOwner",
                _id: "",
                timestamp: new Date().toJSON(),
                data: {}
            }
        }
    }];

    function click(action) {
        window.eventBroker.tryGetTopic("omo", "notification").publish(action);
    }
</script>
hello list
{#each actions as action}
    <a on:click={() => click(action.event())}> {action.name} </a>
{/each}
