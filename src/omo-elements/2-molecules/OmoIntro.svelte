<script>
  import OmoInput from "./../1-atoms/OmoInput";
  import OmoButton from "./../1-atoms/OmoButton";
  import OmoHero from "./../2-molecules/OmoHero";

  var step = 0;
  $: text = "";

  let output = {
    title: "Welcome, Omo Sapiens nice to meet and see you finally in person"
  };

  function mamaomo() {
    switch (step) {
      case 0:
        output = {
          title:
            "I am MamaOmo and I am your Co-Captain on your intergalactic journey through your life dreams"
        };
        break;

      case 1:
        output = {
          title:
            "First, let's find you a new home planet from where you will start to explore your universe"
        };
        break;

      case 2:
        output = {
          title:
            "Well done, you just landed your OmoDream Rocket on your personal planet"
        };
        break;

      case 3:
        output = {
          title:
            "Your planet is still very grey, cold and lonely. Let me show you how to introduce some color"
        };
        break;

      case 4:
        output = {
          title:
            "First of all, you are the captain and in charge of bringing your own planet to life and keep it nice and tidy",
          subline:
            "everything you will grow, build and store on your planet is 100% under your control"
        };
        break;
      case 5:
        output = {
          title:
            "For now your planet is living in a parallel universe and can only be seen and visited by you",
          subline:
            "in technical terms all your data is encrypted, offline first and owned only by you"
        };
        break;

      case 6:
        output = {
          title: "Time to get your hands dirty and to plant some life here"
        };
        break;

      case 7:
        output = {
          title:
            "Your first seed will be your tree of life, which will need a lot of care and attention in the first weeks"
        };
        break;

      case 8:
        output = {
          title: "Congratulations, you just planted your tree of life",
          subline:
            "We justed launched in the background your own personal ${name} currency"
        };
        break;

      case 9:
        output = {
          title:
            "Your tree will grow alongside your life every minute new fruits, which you can share and trade with other planets",
          subline:
            "your planets ${} currency is tightly coupled to your time alive, the most valuable resource you have"
        };
        break;

      case 10:
        output = {
          title: "more coming tomorrow",
          subline: "getting tired now"
        };
        break;
    }
    // if (step == 1) {
    //   output.title =
    //     "I am Mama Omo and I will help you to get familiar with your own planet";
    // } else if (step == 2) {
    //   output.title = `"Hello, ${text}"`;
    //   text = "";
    //   // question = "next text?";
    //   // setTimeout(timedQuestion, 3000);
    // }
  }

  // function timedQuestion() {
  //   output.title = question;
  // }

  var next = function() {
    mamaomo();
    step++;
  };
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
      <div class="py-6 px-8 lg:px-20 -text-md">
        <OmoHero data={output} />
      </div>
    </div>
  </div>
  <div class="bottom bg-gray-200">
    <form onsubmit="event.preventDefault();" class="flex text-center">
      {#if step == 0 || 1}
        <div class="w-full" />
      {:else}
        <input
          bind:value={text}
          type="text"
          placeholder="type your answer here"
          class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
          border-gray-200 bg-white" />
      {/if}
      <button
        on:click={next}
        type="submit"
        class="px-6 bg-primary text-white font-bold p-3 uppercase">
        {#if step == 0 || 1}next{:else}send{/if}
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
