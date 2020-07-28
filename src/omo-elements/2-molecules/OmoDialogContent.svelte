<script>
    import {SetNode as SetStepsNode } from "../../Core/Data/Entities/Events/omo/molecules/OmoDialogSteps/SetNode";
    import {SetNode as SetContentNode } from "../../Core/Data/Entities/Events/omo/molecules/OmoDialogContent/SetNode";
    import {onMount} from "svelte";

    export let data = {
        bundleId:""
    };

    let node = null;
    let bundleTopic = null;

    onMount(() => {
        bundleTopic = window.o.eventBroker.tryGetTopic("omo", data.bundleId);
        bundleTopic.observable.subscribe(next => {
            console.log("Got message for bundle " + data.bundleId, next);
            if (next._$eventType === "omo.molecules.OmoDialogContent.SetNode"
                    && next.data.bundleId === data.bundleId
                    && next.data.node) {
                node = next.data.node;
            }
        });
    });

    function submit()
    {
        const activeNode = node.getActiveNode();
        if (!activeNode) {
            alert("No active DialogFlow node");
            return;
        }

        activeNode.submit().then(() => {
            const setStepsNode = new SetStepsNode();
            setStepsNode.data = {
                bundleId: data.bundleId,
                node: node
            };

            const setContentNode = new SetContentNode();
            setContentNode.data = {
                bundleId: data.bundleId,
                node: node
            };

            bundleTopic.publish(setStepsNode);
            bundleTopic.publish(setContentNode);
        });
    }
</script>

<div class="h-full flex flex-col justify-center">
    <div class="text-center">
        Trust another Omo Sapiens
    </div>
</div>

<div class="flex">
    <input
            class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
        border-gray-200 bg-white"
            placeholder="Safe address" />
    <button
            on:click="{() => submit()}"
            class="px-6 bg-green-400 text-gray-800 font-bold p-3 uppercase ">
        Next
    </button>
</div>
