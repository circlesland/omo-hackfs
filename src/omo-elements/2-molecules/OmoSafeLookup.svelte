<script>
  import {Submit} from "../../Core/Data/Entities/Events/omo/molecules/OmoDialogContent/Submit";

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
  class="bg-cover bg-center object-fill"
  style="background-image: url({data.image})">
  <h1>Lookup an existing known safe</h1>
  <div class="h-full flex flex-col justify-center">
    <div class="flex flex-wrap w-5/6 md:w-2/3 m-auto">
      <input type="text" placeholder="Safe ID" bind:value={data.safeId}>
      <input type="button" class="bg-primary text-white p-2" value="Next" on:click={submit}>
    </div>
  </div>
</div>
