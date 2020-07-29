<script>
  import OmoStatusResponse from "./OmoStatusResponse.svelte";
  import ActionsList from "./ActionsList.svelte";
  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";
  import OmoDialog from "./../5-dapps/OmoDialog.svelte";
  import OmoModal from "./OmoModal.svelte";
  import OmoSpin from "./../1-atoms/OmoSpin.svelte";

  let isOpen = false;

  let triggerRef;

  export let navitems = [
    {
      icon: "fa-user-circle",
      text: "Omo Pay",
      link: "javascript:navigate('omosafe')",
      design: "text-blue-600 hover:text-secondary"
    },
    {
      icon: "fa-users",
      text: "dreams",
      link: "javascript:navigate('omodreams')",
      design: "text-blue-600 hover:text-secondary"
    },
    {
      icon: "fa-plus",
      text: "Actions",
      link: "javascript:navigate('omoactions')",
      design: "bg-secondary text-white"
    },
    {
      icon: "fa-comments",
      text: "Chat",
      link: "javascript:navigate('omochat')",
      design: "text-blue-600 hover:text-secondary"
    },
    {
      icon: "fa-home",
      text: "dapps",
      link: "javascript:navigate('omodapps')",
      design: "text-blue-600 hover:text-secondary"
    }
  ];
</script>

<style>
  li {
    @apply p-2;
  }
</style>

<OmoModal {triggerRef} bind:isOpen>
  <!-- <ActionsList /> -->
  <!-- <OmoDialog /> -->
  <!-- <div class="h-64">
    <OmoSpin />
  </div> -->
  <OmoStatusResponse />
</OmoModal>

<OmoIconsFA />
<nav class="bottom-0 w-full bg-dark">
  <ul
    class="flex justify-around md:justify-center items-center text-center
    font-semibold">

    {#each navitems as item}
      <li class={item.design}>
        <a href={item.link} class={item.design}>
          <div>
            <i class="text-lg fas {item.icon}" />
            <br />
            <span class="text-xs uppercase">{item.text}</span>
          </div>
        </a>
      </li>
    {/each}
    <button
      class="text-blue-500"
      bind:this={triggerRef}
      on:click={() => (isOpen = !isOpen)}>
      Open actions
    </button>
  </ul>
</nav>
