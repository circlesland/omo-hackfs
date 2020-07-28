<script>
function click(action) {
    window.eventBroker.tryGetTopic("omo", "safe").publish(action);
}

let actions =  [{
        name: "omo.safe.trust"
    },{
        name: "omo.safe.untrust"
    },{
        name: "omo.safe.transfer"
    },{
        name: "omo.safe.addOwner"
    },{
        name: "omo.safe.removeOwner"
    }];
</script>
hello list
{#each actions as action}
    <a on:click={() => click(action.name)}> {action.name} </a>
{/each}
