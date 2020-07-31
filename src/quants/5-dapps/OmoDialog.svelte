<script>
  import OmoOrganisms from "./../4-layouts/OmoOrganisms.svelte";
  import { ProcessNode } from "../../core/Flows/ProcessNode";
  import { onDestroy, onMount } from "svelte";
  import { SubmitFlowStep } from "../../events/omo/shell/submitFlowStep";

  export let processNode = {};

  let subscription = null;
  onDestroy(() => {
    if (subscription) {
      subscription.unsubscribe();
    }
  });

  onMount(() => {
    let notifications = window.o.eventBroker.tryGetTopic("omo", "shell");
    subscription = notifications.observable.subscribe(event => {
      if (!event._$eventType) return;

      switch (event._$eventType) {
        case "omo.shell.submitFlowStep":
          if (!event.data.processNodeId === processNode.id) {
            return; // Not meant for our executing flow
          }
          next(processNode);
          break;
        case "omo.shell.undoFlowStep":
          break;
      }
    });
  });

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
    }

    if (isNewProcess(processNode)) {
      const activatedNodeId = initProcess(processNode);

      activeLeaf = ProcessNode.findById(copy, activatedNodeId);
      if (activeLeaf && activeLeaf.quant) {
        organisms.blocks[1].quant = activeLeaf.quant;
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
    return first.id;
  }

  /**
   * Sets the current node to "Finish" and proceeds with the next executable leaf node.
   */
  function next(processNode) {
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
      let currentlyActiveNode = ProcessNode.findActiveLeaf(copy);
      let nextNode = ProcessNode.findNextNode(copy, currentlyActiveNode.id);

      if (!nextNode) {
        alert("End of dialog.");
        return;
      }

      // .. then use the IDs of the found nodes to set the 'state' on the "real" ProcessNode
      currentlyActiveNode = ProcessNode.findById(
        processNode,
        currentlyActiveNode.id
      );
      nextNode = ProcessNode.findById(processNode, nextNode.id);

      currentlyActiveNode.state = "Finished";
      nextNode.state = "Active";

      // If the nextNode has a 'quant' set, use it.
      // If not, stay with the current quant.
      if (nextNode && nextNode.quant) {
        oldOrg.blocks[1].quant = nextNode.quant;
      }

      organisms = oldOrg;
    }, 1);
  }
</script>

{#if organisms}
  <OmoOrganisms {organisms} />
  <div class="w-full">
    <button
      class="w-full font-bold uppercase text-center bg-tertiary px-4 py-3
      text-white"
      on:click={() => window.o.publishShellEventAsync(new SubmitFlowStep(processNode.id, ))}>
      next step
    </button>
  </div>
{/if}
