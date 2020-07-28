<script>

  let items = [];

  function refreshTree() {
    items = [
      {
        title: node.title,
        level: 1,
        steps: node.children.map((o, i) => {
          return {
            title: o.title,
            state: o.state,
            step: i + 1
          }
        })
      }];
  }

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
      if (next._$eventType === "omo.molecules.OmoDialogSteps.SetNode"
              && next.data.bundleId === data.bundleId
              && next.data.node) {
        node = next.data.node;
        refreshTree();
      }
    });
  });

</script>

<div class="omo-left py-6 px-8 text-md">
      {#each items.sort((first, second) => {
        if (first.level < second.level) return -1;
        if (first.level > second.level) return 1;
        return 0;
      }) as level, i}
        <p class="uppercase text-md font-bold text-gray-600">
          {level.level}. {level.title}
        </p>
        {#each level.steps.sort((first, second) => {
          if (first.step < second.step) return -1;
          if (first.step > second.step) return 1;
          return 0;
        }) as step, i}
          {#if step.state == "Locked"}
            <div
              class="flex flex-col justify-center bg-gray-300 h-12 mb-4 w-full">
              <div class="text-center">
                <i class="fas fa-lock text-gray-500" />
              </div>
            </div>
          {:else}
            <div class="flex h-12 mb-4 w-full bg-gray-100 hover:bg-secondary">
              <p class="py-2 px-4 text-xl font-bold text-primary">
                {step.step}
              </p>
              <p class="py-3 px-4 rounded w-full">{step.title}</p>
            </div>
          {/if}
        {/each}
      {/each}
</div>
