<script>
  import { Submit } from "../../Core/Data/Entities/Events/omo/molecules/OmoDialogContent/Submit";

  export let data = {
    bundleId: "",
    safeId: ""
  };

  function submit() {
    const topic = window.o.eventBroker.tryGetTopic("omo", data.bundleId);
    const submitEvent = new Submit();
    submitEvent.data = data;
    topic.publish(submitEvent);
  }
</script>

<div
  class="flex flex-col justify-center text-center w-full lg:w-3/4 mx-auto px-12
  py-32">
  <h1 class="text-primary text-3xl">Enter SafeAddress you want to trust</h1>
  <form class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
    <div class="flex flex-col pt-6">
      <input
        type="text"
        bind:value={data.safeId}
        placeholder="Safe ID"
        class="appearance-none border rounded w-full py-4 px-6 text-gray-700
        text-xl mt-1 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <button
      on:click={submit}
      type="submit"
      class="bg-primary rounded text-white font-bold text-lg hover:bg-secondary
      p-2">
      Trust Safe
    </button>
  </form>

</div>

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
