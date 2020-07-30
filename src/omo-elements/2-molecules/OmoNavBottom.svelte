<script>
    import ActionsList from "./ActionsList.svelte";
    import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";
    import OmoModal from "./OmoModal.svelte";
    import {onMount} from "svelte";
    import OmoDialog from "../5-dapps/OmoDialog.svelte";
    import {SubmitFlowStep} from "../../events/omo/shell/submitFlowStep";

  let isOpen = false;

  let triggerRef;

    let page = "";
    let actions = [];
    let processNode = undefined;

    onMount(() => {
        let notifications = window.o.eventBroker.tryGetTopic("omo", "shell");
        notifications.observable.subscribe(next => {
            if (!next._$eventType)
                return;

            switch (next._$eventType) {
                case "events:omo.shell.navigated":
                    processNode = false;
                    page = next.data.page;
                    const route = window.routes.find(o => o.route === "?page=" + page); // TODO: Pfui!
                    if (route && route.actions) {
                        actions = route.actions;
                    } else {
                        actions = [];
                    }
                    break;
                case "events:omo.shell.startFlow":
                    actions = false;
                    processNode = false;
                    const flowImpl = window.flowRegistrar.get(next.data.flow);
                    if (!flowImpl) {
                        throw new Error("Couldn't find a flow with id '" + next.data.flow + "' in 'window.flowRegistrar'");
                    }
                    processNode = flowImpl();
                    if (!isOpen)
                        isOpen = true;
                    break;
                case "events:omo.shell.closePopup":
                    isOpen = false;
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
            text: "contacts",
            link: () => {},
            design: "text-blue-600 hover:text-secondary"
        },
        {
            icon: "fa-plus",
            text: "Actions",
            link: () => {
                (isOpen = !isOpen)
                if (!isOpen) {
                    processNode = null;
                } else {
                    const route = window.routes.find(o => o.route === "?page=" + page); // TODO: Pfui!
                    actions = route.actions;
                }
            },
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
