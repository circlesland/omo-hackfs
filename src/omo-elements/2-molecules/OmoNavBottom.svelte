<script>
  import ActionsList from "./ActionsList.svelte";
  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";
  import OmoModal from "./OmoModal.svelte";
  import { onMount } from "svelte";

  let isOpen = false;

  let triggerRef;

  let actions = [];
  onMount(() => {
    let notifications = window.o.eventBroker.tryGetTopic("omo", "shell");
    notifications.observable.subscribe(next => {
      if (!next._$eventType) return;

      switch (next._$eventType) {
        case "omo.shell.navigated":
          const route = window.routes.find(
            o => o.route === "?page=" + next.data.page
          ); // TODO: Pfui!
          if (route && route.actions) {
            actions = route.actions;
          } else {
            actions = [];
          }
          break;
      }
    });
  });

  export let navitems = [
    {
      icon: "fa-user-circle",
      text: "Omo Pay",
      link: "javascript:navigate('omosafe')",
      design: "text-blue-600 hover:text-secondary"
    },
    {
      icon: "fa-users",
      text: "contacts",
      link: "/",
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
  <ActionsList {actions} />
  <!-- <OmoDialog /> -->
  <!-- <div class="h-64">
    <OmoSpin />
  </div> -->
  <!--<OmoStatusResponse />-->
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
