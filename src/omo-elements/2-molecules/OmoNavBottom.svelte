<script>
    import ActionsList from "./ActionsList.svelte";
    import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";
    import OmoModal from "./OmoModal.svelte";
    import {onMount} from "svelte";
    import OmoDialog from "../5-dapps/OmoDialog.svelte";

    let isOpen = false;

    let triggerRef;

    let actions = [];
    let processNode = undefined;

    onMount(() => {
        let notifications = window.o.eventBroker.tryGetTopic("omo", "shell");
        notifications.observable.subscribe(next => {
            if (!next._$eventType)
                return;

            switch (next._$eventType) {
                case "omo.shell.navigated":
                    processNode = undefined;
                    const route = window.routes.find(o => o.route === "?page=" + next.data.page); // TODO: Pfui!
                    if (route && route.actions) {
                        actions = route.actions;
                    } else {
                        actions = [];
                    }
                    break;
                case "omo.shell.startFlow":
                    actions = undefined;
                    processNode = undefined;
                    const flowImpl = window.flowRegistrar.get(next.data.flow);
                    if (!flowImpl) {
                        throw new Error("Couldn't find a flow with id '" + next.data.flow + "' in 'window.flowRegistrar'");
                    }
                    processNode = flowImpl();
                    break;
            }
        });
    });

    export let navitems = [
        {
            icon: "fa-user-circle",
            text: "Omo Pay",
            link: () => window.navigate('omosafe'),
            design: "text-blue-600 hover:text-secondary"
        },
        {
            icon: "fa-users",
            text: "dreams",
            link: () => window.navigate('omodreams'),
            design: "text-blue-600 hover:text-secondary"
        },
        {
            icon: "fa-plus",
            text: "Actions",
            link: () => (isOpen = !isOpen),
            design: "bg-secondary text-white"
        },
        {
            icon: "fa-comments",
            text: "Chat",
            link: () => window.navigate('omochat'),
            design: "text-blue-600 hover:text-secondary"
        },
        {
            icon: "fa-home",
            text: "dapps",
            link: () => window.navigate('omodapps'),
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
  {#if actions}
      <ActionsList {actions} />
  {/if}
  {#if processNode}
      <OmoDialog {processNode} />
  {/if}
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
        <a on:click={() => item.link()} class={item.design}>
          <div>
            <i class="text-lg fas {item.icon}" />
            <br />
            <span class="text-xs uppercase">{item.text}</span>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</nav>
