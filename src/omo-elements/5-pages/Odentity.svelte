<script>
  import OmoHero from "./../2-molecules/Omohero";
  import OmoProgressBar from "./../2-molecules/OmoProgressBar";
  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";

  export let steps = [
    {
      sort: "0",
      title: "Welcome",
      locked: false
    },
    {
      sort: "1",
      title: "Add first name",
      locked: false
    },
    {
      sort: "2",
      title: "Add last name",
      locked: false
    },
    {
      sort: "3",
      title: "Add image",
      locked: false
    },
    {
      sort: "4",
      title: "Add birthday",
      locked: true
    },
    {
      sort: "5",
      title: "Add address",
      locked: true
    }
  ];

  export let auth = [
    {
      sort: "1",
      title: "OmoEarthAuth Email",
      locked: false
    },
    {
      sort: "1",
      title: "Circles Wallet",
      locked: true
    },
    {
      sort: "1",
      title: "Github",
      locked: true
    },
    {
      sort: "1",
      title: "Github",
      locked: true
    },
    {
      sort: "1",
      title: "Github",
      locked: true
    }
  ];

  export let hero = {
    uptitle: "Welcome",
    title: "Hello, I am Mama Omo",
    subline:
      "I am here to assist you in growing your passions and building your dreamteams"
  };
</script>

<style>
  .omo-layout {
    display: grid;
    grid-template-areas:
      "aside content-top"
      "aside content-center"
      "aside content-bottom";
    grid-template-columns: 24rem 1fr;
    grid-template-rows: 1rem 1fr 3rem;
    overflow: hidden;
  }
  .aside {
    grid-area: aside;
    overflow-y: scroll;
    @apply bg-gray-200;
  }
  .content-top {
    grid-area: content-top;
  }
  .content-center {
    grid-area: content-center;
  }
  .content-bottom {
    grid-area: content-bottom;
  }
</style>

<div class="omo-layout">
  <div class="aside">
    <div class="omo-left py-6 px-8 text-md">
      <p class="uppercase text-md font-bold text-gray-600">MY ODENTITY</p>
      {#each steps as step}
        {#if step.locked}
          <div
            class="flex flex-col justify-center bg-gray-300 h-12 mb-4 w-full">
            <div class="text-center">
              <i class="fas fa-lock text-gray-500" />
            </div>
          </div>
        {:else}
          <div class="flex h-12 mb-4 w-full bg-gray-100 hover:bg-secondary">
            <p class="py-2 px-4 text-xl font-bold text-primary">{step.sort}</p>
            <p class="py-3 px-4 rounded w-full">{step.title}</p>
          </div>
        {/if}
      {/each}
      <p class="uppercase text-md font-bold mt-8 text-gray-600">
        AUTHENTICATIONS
      </p>
      {#each auth as step}
        {#if step.locked}
          <div
            class="flex flex-col justify-center bg-gray-300 h-12 mb-4 w-full">
            <div class="text-center">
              <i class="fas fa-lock text-gray-500" />
            </div>
          </div>
        {:else}
          <div class="flex h-12 mb-4 w-full bg-gray-100 hover:bg-secondary">
            <p class="py-2 px-4 text-xl font-bold text-primary">{step.sort}</p>
            <p class="py-3 px-4 rounded w-full">{step.title}</p>
          </div>
        {/if}
      {/each}
    </div>
  </div>
  <div class="content-top">
    <OmoProgressBar />
  </div>
  <div class="content-center">
    <div class="h-full flex flex-col justify-center">
      <div class="text-center">
        <OmoHero data={hero} />
        <p class="text-gray-400 hover:text-secondary">skip</p>
      </div>
    </div>
  </div>
  <div class="content-bottom">
    <div class="flex">
      <input
        class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
        border-gray-200 bg-white"
        placeholder="placeholder" />
      <a href="?page=omodapps">
        <button
          class="px-6 bg-green-400 text-gray-800 font-bold p-3 uppercase ">
          next
        </button>
      </a>
    </div>
  </div>
</div>
