<script lang="ts">
    import {getRoute, curRoute, navigate, getComponent} from "./Router.ts";
    import {onMount, onDestroy} from "svelte";
    import ComponentRegistrar from "./ComponentRegistrar";
    import MagicLogin from "./omo-elements/5-dapps/MagicLogin.svelte";

    import OmoHome from "./omo-elements/5-dapps/OmoHome";
    import OmoDialog from "./omo-elements/5-dapps/OmoDialog";
    import MamaOmo from "./omo-elements/5-dapps/MamaOmo";
    import OmoDream from "./omo-elements/5-dapps/OmoDream";
    import OmoDocs from "./omo-elements/5-dapps/OmoDocs";
    import OmoDapps from "./omo-elements/5-dapps/OmoDapps";
    import OnBoarding from "./omo-elements/5-dapps/OnBoarding";
    import Odentity from "./omo-elements/5-dapps/oDentity";
    import OmoDreams from "./omo-elements/5-dapps/OmoDreams";
    import OmoOrgas from "./omo-elements/5-dapps/OmoOrgas";
    import OmoSafe from "./omo-elements/5-dapps/OmoSafe";
    import OmoAuth from "./omo-elements/5-dapps/OmoAuth";
    import OmoFunding from "./omo-elements/5-dapps/OmoFunding";
    import OmoConnectCircles from "./omo-elements/5-dapps/OmoConnectCircles.svelte";
    import OmoChat from "./omo-elements/5-dapps/OmoChat.svelte";
    import OmoActions from "./omo-elements/5-dapps/OmoActions.svelte";
    import OmoNotifications from "./omo-elements/5-dapps/OmoNotifications.svelte";

    import OmoNavTop from "./omo-elements/2-molecules/OmoNavTop.svelte";
    import OmoNavBottom from "./omo-elements/2-molecules/OmoNavBottom.svelte";
    import {StartFlow} from "./Core/Events/omo/shell/StartFlow";

    onMount(() => {
        let route = getRoute();
        if (route.startsWith("?page")) curRoute.set(route);
        // if (!history.state) {
        //   window.history.replaceState(
        //     { path: window.location.pathname },
        //     "",
        //     window.location.href
        //   );
        // }
        // o.store.odentity.currentOmo().then(o => {
        //   omo = o;
        // });
        window.navigate = navigate;

        let notifications = window.o.eventBroker.tryGetTopic("omo", "shell");
        notifications.observable.subscribe(next => {
            if (!next._$eventType)
                return;

            switch (next._$eventType) {
                case "omo.shell.notification":
                    notify(next.data);
                    break;
                case "omo.shell.navigate":
                    navigate(next.data.page);
                    break;
                case "omo.shell.navigated":
                    navigated(next.data.page);
                    break;
            }
        });
    });

    function notify(next) {
        console.log("New notification:", next);
    }

    function navigated(page) {
        console.log("Navigated to:", page);
    }

    function handlerBackNavigation(event) {
        curRoute.set(event.state.route);
    }

    // export const omo = window.o.odentity.current;
    //@todo listen to changes

    // ROUTING
    var routes = [
        {route: "/", quant: OmoHome, authenticate: false},
        {route: "?page=home", quant: OmoHome, authenticate: false},
        {route: "?page=mamaomo", quant: MamaOmo, authenticate: true},
        {route: "?page=omoauth", quant: OmoAuth, authenticate: false},
        {route: "?page=magicLogin", quant: MagicLogin, authenticate: false},
        {route: "?page=odentity", quant: Odentity, authenticate: false},
        {route: "?page=docs", quant: OmoDocs, authenticate: true},
        {route: "?page=omodapps", quant: OmoDapps, authenticate: true},
        {route: "?page=omodream", quant: OmoDream, authenticate: true},
        {route: "?page=omofunding", quant: OmoFunding, authenticate: true},
        {route: "?page=omoorgas", quant: OmoOrgas, authenticate: true},
        {
            route: "?page=omosafe",
            quant: OmoSafe,
            authenticate: true,
            actions: [
                // TODO: Custom actions should be available on every level
                {
                    title: "Trust someone",
                    event: () => new StartFlow("omo.safe.trustFlow")
                },
                {
                    title: "Untrust someone",
                    event: () => new StartFlow("omo.safe.trustFlow")
                },
                {
                    title: "Send Circles",
                    event: () => new StartFlow("omo.safe.trustFlow")
                },
                {
                    title: "Add another owner to this safe",
                    event: () => new StartFlow("omo.safe.trustFlow")
                },
                {
                    title: "Remove an owner from this safe",
                    event: () => new StartFlow("omo.safe.trustFlow")
                }
            ]
        },
        {route: "?page=omodreams", quant: OmoDreams, authenticate: true},
        {route: "?page=omochat", quant: OmoChat, authenticate: true},
        {route: "?page=onboarding", quant: OnBoarding, authenticate: true},
        {route: "?page=omodialog", quant: OmoDialog, authenticate: true},
        {
            route: "?page=omonotifications",
            quant: OmoNotifications,
            authenticate: true
        },
        {
            route: "?page=omoactions",
            quant: OmoActions,
            authenticate: true
        },
        {
            route: "?page=omoconnectcircles",
            quant: OmoConnectCircles,
            authenticate: true
        }
    ];
    window.routes = routes; // TODO: Pfui!
</script>

<style>
    .app {
        height: 100vh;
        width: 100vw;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-areas: "'header', 'main', 'footer'";
        grid-template-columns: "1fr";
        grid-template-rows: 3rem 1fr 4rem;
    }

    header {
        grid-area: "header";
    }

    main {
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        grid-area: "main";
        overflow: hidden;
    }

    footer {
        grid-area: "footer";
    }
</style>

<svelte:window on:popstate={handlerBackNavigation}/>
<ComponentRegistrar/>

<div class="app">
    <header>
        <OmoNavTop/>
    </header>
    <main>
        <svelte:component this={getComponent($curRoute, routes)} {routes}/>
    </main>
    <footer>
        <OmoNavBottom/>
    </footer>
    <!-- <footer>
      {#if omo != null}
        <OmoNavBottom />
      {:else if !$curRoute.startsWith('?page=omoauth')}
        <div class="flex flex-col justify-center bg-gray-200 h-12">
          <div class="p-4 text-center">
            <OmoButton data={login} />
          </div>
        </div>
      {/if}
    </footer> -->
</div>
