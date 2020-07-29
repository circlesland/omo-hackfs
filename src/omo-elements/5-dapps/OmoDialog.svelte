<script>
    import {onMount} from "svelte";
    import OmoOrganisms from "./../4-layouts/OmoOrganisms.svelte";
    import {v4} from "uuid";

    export let processNode = {};

    let organisms = {
        name: "OmoSafe",
        type: "organisms",
        layout: {
            areas: "'aside content'",
            columns: "400px 1fr",
            rows: "1fr"
        },
        blocks: [
            {
                type: "molecule",
                slot: "aside",
                quant: "OmoDialogSteps",
                data: processNode
            },
            {
                type: "molecule",
                slot: "content",
                quant: "OmoStatusResponse",
                data: {}
            }
        ]
    };

    $: {
        organisms.blocks[0].data = processNode;
        const activeLeaf = processNode.findActiveLeaf();
        if (activeLeaf && activeLeaf.quant) {
            organisms.blocks[1].quant = activeLeaf.quant;
        } else if (!activeLeaf) {
            // Start
            processNode.findNextNode(processNode);
        }
    }

    onMount(() => {
        console.log("Creating OmoDialog. processNode:", processNode);
    });

</script>

{#if organisms}
    <OmoOrganisms {organisms}/>
{/if}
