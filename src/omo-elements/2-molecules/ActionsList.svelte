<script>
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
    <a onclick="javascript:navigate('omodialog');"> {action.name} </a>
{/each}
