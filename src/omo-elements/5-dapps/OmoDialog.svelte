<script>
  import { onMount, } from "svelte";
  import OmoOrganisms from "./../4-layouts/OmoOrganisms.svelte";
  import {v4} from "uuid";

  let bundleId = v4();
  let bundleTopic = null;

  import {Trust} from "../../Core/DialogFlows/omo/safe/Trust"
  import {SetNode as SetStepsNode } from "../../Core/Data/Entities/Events/omo/molecules/OmoDialogSteps/SetNode";
  import {SetNode as SetContentNode } from "../../Core/Data/Entities/Events/omo/molecules/OmoDialogContent/SetNode";

  const df = new Trust();

  onMount(() => {
    bundleTopic = window.o.eventBroker.createTopic("omo", bundleId);
    refreshTree();
  });

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

  function submit()
  {
      const activeNode = df.getActiveNode();
      if (!activeNode) {
          alert("No active DialogFlow node");
          return;
      }

      activeNode.submit().then(() => {
      });
  }

  async function loadingData() {
    let d = {
      bundleId: bundleId
    };

    let OmoSafe = {
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
          quant: "OmoDialogContent",
          data: d
        }
      ]
    };
    return OmoSafe;
  }
</script>

{#await loadingData()}
  loading
{:then organisms}
  <OmoOrganisms {organisms} />
{/await}
