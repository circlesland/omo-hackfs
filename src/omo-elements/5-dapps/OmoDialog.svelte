<script>

    import OmoOrganisms from "./../4-layouts/OmoOrganisms.svelte";
    import {ProcessNode} from "../../Core/Flows/ProcessNode";

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

    function onNewProcessNode(processNode) {

        const copy = JSON.parse(JSON.stringify(processNode));

        ProcessNode.restoreParentLinks(copy);
        organisms.blocks[0].data = processNode;

        let activeLeaf = ProcessNode.findActiveLeaf(copy);
        if (activeLeaf && activeLeaf.quant) {
            organisms.blocks[1].quant = activeLeaf.quant;
            console.log("Setting organisms.blocks[1].quant = " + activeLeaf.quant);
        }

        if (isNewProcess()) {
            initProcess();

            activeLeaf = ProcessNode.findActiveLeaf(copy);
            if (activeLeaf && activeLeaf.quant) {
                organisms.blocks[1].quant = activeLeaf.quant;
                console.log("Setting organisms.blocks[1].quant = " + activeLeaf.quant);
            }
        }

        console.log("activeLeaf:", activeLeaf);
    }

    $: {
        onNewProcessNode(processNode);
    }

    function isNewProcess() {
        const activeBranch = !ProcessNode.findActiveBranch(processNode);
        if (!activeBranch) {
            // pristine process, set initial active node
            const usedNodes = ProcessNode.flattenSequencial(processNode).filter(o => o.state !== "Pristine");
            const isNew = usedNodes.length === 0;
            console.log("isNewProcess", isNew);
            return isNew;
        }
        console.log("isNewProcess", false);
        return false;
    }

    function initProcess() {
        const flatLeafs = ProcessNode.flattenSequencial(processNode);
        console.log("initProcess", flatLeafs);
        if (!flatLeafs || flatLeafs.length === 0) {
            throw new Error("A non executable or empty 'processNode' was supplied to 'OmoDialog'.");
        }
        const first = flatLeafs[0];
        first.state = "Active";
    }

    function next() {
        const oldOrg = organisms;
        organisms = false;
        setTimeout(() => {
            if (isNewProcess()) {
                throw new Error("You must first call 'initProcess()'.");
            }
            const copy = JSON.parse(JSON.stringify(processNode));
            ProcessNode.restoreParentLinks(copy);

            let currentlyActiveNode = ProcessNode.findActiveLeaf(copy);
            let nextNode = ProcessNode.findNextNode(copy, currentlyActiveNode.id);

            if (!nextNode) {
                alert("End of dialog.");
                return;
            }

            currentlyActiveNode = ProcessNode.findById(processNode, currentlyActiveNode.id);
            nextNode = ProcessNode.findById(processNode, nextNode.id);

            currentlyActiveNode.state = "Finished";
            nextNode.state = "Active";

            if (nextNode && nextNode.quant) {
                oldOrg.blocks[1].quant = nextNode.quant;
                console.log("Setting organisms.blocks[1].quant = " + nextNode.quant);
            }

            organisms = oldOrg;
        }, 10);
    }

    setTimeout(() => next(), 10000);
    setTimeout(() => next(), 20000);

</script>

{#if organisms}
    <OmoOrganisms {organisms}/>
{/if}
