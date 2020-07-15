<script>
  import { getRoute, curRoute, navigate, getComponent } from "./Router.ts";
  import { onMount } from "svelte";
  import OmoNavTop from "./omo-elements/2-molecules/OmoNavTop";
  import OmoNavBottom from "./omo-elements/2-molecules/OmoNavBottom";
  import OmoButton from "./omo-elements/1-atoms/OmoButton";

  export let login = {
    text: "Login (alpha test)",
    design: "o-btn-secondary h-8 o-btn-xl uppercase w-1/2 text-center",
    link: "javascript:navigate('omoauth');"
  };

  onMount(() => {
    let route = getRoute();
    if (route.startsWith("?page")) curRoute.set(route);
    if (!history.state) {
      window.history.replaceState(
        { path: window.location.pathname },
        "",
        window.location.href
      );
    }
  });

  function handlerBackNavigation(event) {
    debugger;
    curRoute.set(event.state.path);
  }

  export let omo = window.o.odentity.current;
  //@todo listen to changes

  window.navigate = navigate;

  // ROUTING
  import MagicLogin from "./omo-elements/5-pages/MagicLogin.svelte";
  import OmoHome from "./omo-elements/5-pages/OmoHome";
  import OmoDocs from "./omo-elements/5-pages/OmoDocs";
  import OmoDapps from "./omo-elements/5-pages/OmoDapps";
  import OmoChat from "./omo-elements/5-pages/OmoChat";
  import Odentity from "./omo-elements/5-pages/Odentity";
  import OmoSapiens from "./omo-elements/5-pages/OmoSapiens";
  import OmoPay from "./omo-elements/5-pages/OmoPay";
  import OmoAuth from "./omo-elements/5-pages/OmoAuth";
  import OmoActions from "./omo-elements/5-pages/OmoActions";
  import OmoFunding from "./omo-elements/5-pages/OmoFunding";
  var routes = [
    { route: "?page=home", quant: OmoHome, authenticate: false },
    { route: "?page=omoauth", quant: OmoAuth, authenticate: false },
    { route: "?page=magicLogin", quant: MagicLogin, authenticate: false },
    { route: "?page=odentity", quant: Odentity, authenticate: true },
    { route: "?page=docs", quant: OmoDocs, authenticate: true },
    { route: "?page=omodapps", quant: OmoDapps, authenticate: true },
    { route: "?page=omosapiens", quant: OmoSapiens, authenticate: true },
    { route: "?page=omochat", quant: OmoChat, authenticate: true },
    { route: "?page=omoactions", quant: OmoActions, authenticate: true },
    { route: "?page=omopay", quant: OmoPay, authenticate: true },
    { route: "?page=odentity", quant: Odentity, authenticate: true },
    { route: "?page=omofunding", quant: OmoFunding, authenticate: true }
  ];
</script>

<style>
  .app {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2rem 1fr 3rem;
  }
  main {
    display: grid;
    grid-template-columns: 1fr;
    overflow: hidden;
  }
</style>

<svelte:window on:popstate={handlerBackNavigation} />
<div class="app">
  <header>
    <OmoNavTop />
  </header>
  <main>
    <svelte:component this={getComponent($curRoute, routes)} {routes} />
  </main>
  <footer>
    {#if omo != null}
      <OmoNavBottom />
    {:else if !$curRoute.startsWith('?page=omoauth')}
      <div class="flex flex-col justify-center bg-gray-200 h-12">
        <div class="p-4 text-center">
          <OmoButton data={login} />
        </div>
      </div>
    {/if}
  </footer>
</div>
