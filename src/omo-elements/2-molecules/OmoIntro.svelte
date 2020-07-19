<script>
  import OmoInput from "./../1-atoms/OmoInput";
  import OmoButton from "./../1-atoms/OmoButton";
  import OmoHero from "./../2-molecules/OmoHero";
  import Actions, { nextStep } from "./../../omo-actions/Actions";

  export let data = {
    step: 0,
    subline: "",
    title: "",
    button: ""
  };

  var handleButton = function() {
    data = nextStep(step);
  };

  $: step = data.step;
  $: title = data.output;
  $: subline = data.subline;
  $: button = data.button;
</script>

<style>
  .omo-layout {
    min-height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 3rem;
    grid-template-areas: "'top''bottom'";
  }
  .top {
    grid-area: "top";
  }
  .bottom {
    grid-area: "bottom";
  }
</style>

<div class="omo-layout bg-gray-200 ">
  <div class="flex flex-col justify-center">
    <div class="top">
      <div class="py-6 px-8 lg:px-20 text-center mx-auto">
        <OmoHero {data} />
      </div>
    </div>
  </div>
  <div class="bottom bg-gray-200">
    <form onsubmit="event.preventDefault();" class="flex text-center">
      <button
        on:click={() => handleButton()}
        type="submit"
        class="bg-primary hover:bg-secondary px-6 text-white font-bold p-3
        uppercase">
        {button}
      </button>
    </form>
  </div>
</div>

<!-- 
    <div class="bg-gray-200 py-6 px-8 text-md">
      {#each users as user}
        <div class="flex h-12 mb-4 w-full bg-gray-100">
          <img alt="" src={user.picture.medium} class="h-full w-auto" />
          <p class="py-3 px-4 rounded w-full">{user.email}</p>
        </div>
      {/each}
    </div> -->
