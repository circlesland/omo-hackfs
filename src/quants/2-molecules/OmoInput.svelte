<script>
  import {SubmitFlowStep} from "../../events/omo/shell/submitFlowStep";
  import {onDestroy, onMount} from "svelte";

  let subscription = null;
  let value = "";

  export let data = {
  };

  onDestroy(() => {
      if (subscription) {
          subscription.unsubscribe();
      }
  });

  onMount(() => {
      let notifications = window.o.eventBroker.tryGetTopic("omo", "shell");
      subscription = notifications.observable.subscribe(event => {
          if (!event._$schemaId) return;

          console.log(event, data);

          switch (event._$schemaId) {
              case "events:omo.shell.requestSubmitFlowStep":
                  if (!event.data.processNodeId === data.id) {
                      return; // Not meant for our executing flow
                  }
                  submit()
                  break;
          }
      });
  });

  function submit() {
    console.log("submit()");
    const submitEvent = new SubmitFlowStep(data.id, value);
    window.o.publishShellEventAsync(submitEvent);
  }
</script>

<style>
  section {
    height: 70vh;
  }
</style>

<section
  class="flex flex-col justify-center text-center w-full lg:w-3/4 mx-auto px-12
  py-32">
  <h1 class="text-primary text-3xl">[Add here dynamic step title]</h1>
  <h2 class="text-gray-600 text-lg">
    [Add here dynamic step detailed description]
  </h2>
  <form class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
    <div class="flex flex-col pt-6">
      <input
        type="text"
        bind:value={value}
        placeholder="[add here dynamic placeholder]"
        class="appearance-none border rounded w-full py-4 px-6 text-gray-700
        text-xl mt-1 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
  </form>

</section>

<!-- <div
  class="bg-cover bg-center object-fill"
  style="background-image: url({data.image})">
  <h1>Lookup an existing known safe</h1>
  <div class="h-full flex flex-col justify-center">
    <div class="flex flex-wrap w-5/6 md:w-2/3 m-auto">
      <input type="text" placeholder="Safe ID" bind:value={data.safeId}>
      <input type="button" class="bg-primary text-white p-2" value="Next" on:click={submit}>
    </div>
  </div>
</div> -->
