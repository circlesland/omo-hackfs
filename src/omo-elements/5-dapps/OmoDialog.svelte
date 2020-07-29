<script>
    import {onMount,} from "svelte";
    import OmoOrganisms from "./../4-layouts/OmoOrganisms.svelte";
    import {v4} from "uuid";

    let bundleId = v4();
    let d = {
        bundleId: bundleId
    };

    let bundleTopic = null;

    import {Trust} from "../../Core/DialogFlows/omo/safe/Trust"
    import {SetNode as SetStepsNode} from "../../Core/Data/Entities/Events/omo/molecules/OmoDialogSteps/SetNode";
    import {SetNode as SetContentNode} from "../../Core/Data/Entities/Events/omo/molecules/OmoDialogContent/SetNode";

    const df = new Trust();

    onMount(() => {
        bundleTopic = window.o.eventBroker.createTopic("omo", bundleId);
        bundleTopic.observable.subscribe(event => {
            if (event._$eventType == "omo.molecules.OmoDialogContent.Submit"
                    && event.data.bundleId == bundleId) {
                submit();
                console.log("Submit received:", event);
            }
        });

        refreshOrganism();
        refreshTree();
        setTimeout(() => {
            refreshTree();
        }, 10);
    });

    let organisms = null;

    function refreshOrganism() {
        const org = {
            name: "OmoSafe",
            type: "organisms",
            layout: {
                areas: "'aside content'",
                columns: "20rem 1fr",
                rows: "1fr"
            },
            blocks: [
                {
                    type: "molecule",
                    slot: "aside",
                    quant: "OmoDialogSteps",
                    data: d
                },
                {
                    type: "molecule",
                    slot: "content",
                    quant: df.getActiveNode().quant,
                    data: d
                }
            ]
        };
        organisms = null;
        setTimeout(() => {
            organisms = org;
            setTimeout(() => {
                refreshTree();
            }, 10);
        }, 10);
    }

    async function refreshTree() {
        const setStepsNode = new SetStepsNode();
        setStepsNode.data = {
            bundleId: bundleId,
            node: df
        };

        const setContentNode = new SetContentNode();
        setContentNode.data = {
            bundleId: bundleId,
            node: df
        };

        bundleTopic.publish(setStepsNode);
        bundleTopic.publish(setContentNode);
    }

    function submit() {
        const activeNode = df.getActiveNode();
        if (!activeNode) {
            alert("No active DialogFlow node");
            return;
        }

        activeNode.submit().then(() => {
            refreshOrganism();
            refreshTree();
        });
    }

</script>
{#if organisms}
<OmoOrganisms {organisms}/>
{/if}
