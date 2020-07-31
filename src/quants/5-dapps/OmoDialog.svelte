<script>
    import OmoOrganisms from "./../4-layouts/OmoOrganisms.svelte";
    import {ProcessNode} from "../../core/Flows/ProcessNode";
    import {onDestroy, onMount} from "svelte";
    import {SubmitFlowStep} from "../../events/omo/shell/submitFlowStep";
    import {RequestSubmitFlowStep} from "../../events/omo/shell/requestSubmitFlowStep";
    import {ClosePopup} from "../../events/omo/shell/closePopup";

    export let processNode = {};

    let subscription = null;
    let executionContext;

    onDestroy(() => {
        if (subscription) {
            subscription.unsubscribe();
        }
    });

    let currentlyActiveNode;

    onMount(() => {
        let notifications = window.o.eventBroker.tryGetTopic("omo", "shell");
        subscription = notifications.observable.subscribe(event => {
            if (!event._$schemaId) return;

            switch (event._$schemaId) {
                case "events:omo.shell.submitFlowStep":
                    if (!event.data.processNodeId === processNode.id) {
                        return; // Not meant for our executing flow
                    }
                    next(processNode, event.data.argument);
                    break;
                case "events:omo.shell.undoFlowStep":
                    break;
            }
        });
    });

    let organisms = {
        name: "OmoSafe",
        type: "organisms",
        layout: {
            areas: "'aside content' 'foot foot'",
            columns: "400px 1fr",
            rows: "1fr 3rem"
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
            },
            {
                type: "molecule",
                slot: "foot",
                quant: "OmoNextButton",
                data: {
                    processNode: processNode,
                    label: "Next"
                }
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
            organisms.blocks[1].data = processNode;
            organisms.blocks[2].data = {
                processNode: processNode,
                label: activeLeaf.submitButtonLabel
            };
        }

        if (isNewProcess(processNode)) {
            const activatedNodeId = initProcess(processNode);

            activeLeaf = ProcessNode.findById(copy, activatedNodeId);
            if (activeLeaf && activeLeaf.quant) {
                organisms.blocks[1].quant = activeLeaf.quant;
                organisms.blocks[1].data = processNode;
                organisms.blocks[2].data = {
                    processNode: processNode,
                    label: activeLeaf.submitButtonLabel
                };
            }
        }
    }

    $: {
        onNewProcessNode(processNode);
    }

    /**
     * Checks if the supplied ProcessNode is a pristine ProcessNode.
     * @param processNode {ProcessNode}
     * @returns {boolean}
     */
    function isNewProcess(processNode) {
        const activeBranch = !ProcessNode.findActiveBranch(processNode);
        if (!activeBranch) {
            // pristine process, set initial active node
            const usedNodes = ProcessNode.flattenSequencial(processNode).filter(
                    o => o.state !== "Pristine"
            );
            return usedNodes.length === 0;
        }
        return false;
    }

    /**
     * Initializes a new ProcessNode by setting the first leaf node to "Active".
     * @param processNode {ProcessNode}
     * @returns {string} The id of the activated node.
     */
    function initProcess(processNode) {
        const flatLeafs = ProcessNode.flattenSequencial(processNode);

        if (!flatLeafs || flatLeafs.length === 0) {
            throw new Error(
                    "A non executable or empty 'processNode' was supplied to 'OmoDialog'."
            );
        }
        const first = flatLeafs[0];
        first.state = "Active";
        executionContext = {
            stepId: first.stepId,
            o: window.o
        };
        return first.id;
    }

    /**
     * Sets the current node to "Finish" and proceeds with the next executable leaf node.
     */
    function next(processNode, argument) {
        console.log("next(processNode, argument) called:", processNode, argument);

        const oldOrg = organisms;
        organisms = false;

        setTimeout(() => {
            // We need to work with a copy of the tree because OmoOrganism doesn't like circular references
            // (specifically the 'parent' property of the ProcessNode)
            const copy = JSON.parse(JSON.stringify(processNode));

            // Because OmoDialog received the ProcessNode as JSON copy as well, the parent links must
            // be restored from the node IDs first.
            ProcessNode.restoreParentLinks(copy);

            if (isNewProcess(copy)) {
                throw new Error("You must first call 'initProcess()'.");
            }

            // Find the active and next leaf in the copy with the restored 'parent' properties ..
            let currentlyActiveNode_ = ProcessNode.findActiveLeaf(copy);
            let nextNode_ = ProcessNode.findNextNode(copy, currentlyActiveNode_.id);

            // .. then use the IDs to look up the "real" node and execute its side-effect (if any)
            const currentlyActiveNode = ProcessNode.findById(processNode, currentlyActiveNode_.id);
            executionContext.stepId = currentlyActiveNode.stepId;

            if (currentlyActiveNode.sideEffect) {
                const sideEffect = window.sideEffectRegistrar.get(currentlyActiveNode.sideEffect);

                // Check if there is a side effect and if it can be executed
                if (sideEffect
                        && (!sideEffect.canExecute ? true : sideEffect.canExecute(executionContext, argument))
                        && sideEffect.execute) {
                    try {
                        sideEffect.execute(executionContext, argument);
                    } catch (e) {
                        currentlyActiveNode.state = "Failed";
                        currentlyActiveNode.error = e;
                        return;
                    }
                }
            }

            if (!nextNode_) {
                window.o.publishShellEventAsync(new ClosePopup());
                return;
            }

            const nextNode = ProcessNode.findById(processNode, nextNode_.id);

            currentlyActiveNode.state = "Finished";
            nextNode.state = "Active";

            // If the nextNode has a 'quant' set, use it.
            // If not, stay with the current quant.
            if (nextNode && nextNode.quant) {
                oldOrg.blocks[1].quant = nextNode.quant;
                oldOrg.blocks[1].data = {
                    processNode: processNode
                }
                organisms.blocks[2].data = {
                    processNode: processNode,
                    label: currentlyActiveNode.submitButtonLabel
                };
            }

            organisms = oldOrg;
        }, 1);
    }
</script>

{#if organisms}
    <OmoOrganisms {organisms}/>
{/if}
