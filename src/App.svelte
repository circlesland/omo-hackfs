<script>
  import { getRoute, curRoute, navigate, getComponent } from "./Router.ts";
  import { onMount, onDestroy } from "svelte";
  import { seed } from "./Seed.ts";

  import OmoHome from "./omo-elements/5-dapps/OmoHome";
  import MamaOmo from "./omo-elements/5-dapps/MamaOmo";
  import OmoDream from "./omo-elements/5-dapps/OmoDream";

  import OmoDocs from "./omo-elements/5-pages/OmoDocs";
  import OmoDapps from "./omo-elements/5-pages/OmoDapps";
  import Odentity from "./omo-elements/5-pages/Odentity";
  import OmoDreams from "./omo-elements/5-dapps/OmoDreams";
  import OmoOrgas from "./omo-elements/5-pages/OmoOrgas";
  import OmoSafe from "./omo-elements/5-dapps/OmoSafe";
  import OmoAuth from "./omo-elements/5-dapps/OmoAuth";
  import OmoActions from "./omo-elements/5-pages/OmoActions";
  import OmoFunding from "./omo-elements/5-pages/OmoFunding";
  import OmoNavTop from "./omo-elements/2-molecules/OmoNavTop";
  import OmoNavBottom from "./omo-elements/2-molecules/OmoNavBottom";
  import OmoButton from "./omo-elements/1-atoms/OmoButton";

  import OmoNotify from "./omo-elements/2-molecules/OmoNotify";

  import ComponentRegistrar from "./ComponentRegistrar";

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

    var jsonString = localStorage.getItem("data");
    var data = jsonString == null ? seed() : JSON.parse(jsonString);
    window.data = data;
    window.navigate = navigate;
  });

  function handlerBackNavigation(event) {
    curRoute.set(event.state.route);
  }

  export const omo = window.o.odentity.current;
  //@todo listen to changes

  // ROUTING
  import MagicLogin from "./omo-elements/5-pages/MagicLogin.svelte";
  var routes = [
    { route: "/", quant: OmoHome, authenticate: false },
    { route: "?page=home", quant: OmoHome, authenticate: false },
    { route: "?page=mamaomo", quant: MamaOmo, authenticate: true },
    { route: "?page=omoauth", quant: OmoAuth, authenticate: false },
    { route: "?page=magicLogin", quant: MagicLogin, authenticate: false },
    { route: "?page=odentity", quant: Odentity, authenticate: true },
    { route: "?page=docs", quant: OmoDocs, authenticate: true },
    { route: "?page=omodapps", quant: OmoDapps, authenticate: true },
    { route: "?page=omodream", quant: OmoDream, authenticate: true },
    { route: "?page=omoactions", quant: OmoActions, authenticate: true },
    { route: "?page=omofunding", quant: OmoFunding, authenticate: true },
    { route: "?page=omoorgas", quant: OmoOrgas, authenticate: true },
    { route: "?page=omosafe", quant: OmoSafe, authenticate: true },
    { route: "?page=omodreams", quant: OmoDreams, authenticate: true }
  ];
</script>

<style>
  .app {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
</style>

<svelte:window on:popstate={handlerBackNavigation} />
<ComponentRegistrar />

<div class="app">
  <OmoNotify />
  <svelte:component this={getComponent($curRoute, routes)} {routes} />
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
