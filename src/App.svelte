<script>
  import MagicLogin from "./omo-elements/5-pages/MagicLogin.svelte";
  import { curId, curRoute } from "./Router.ts";
  import { onMount } from "svelte";

  import OmoHome from "./omo-elements/5-pages/OmoHome";
  import OmoDocs from "./omo-elements/5-pages/OmoDocs";
  import OmoDapps from "./omo-elements/5-pages/OmoDapps";
  import OmoChat from "./omo-elements/5-pages/OmoChat";
  import Odentity from "./omo-elements/5-pages/Odentity";
  import OmoDreams from "./omo-elements/5-pages/OmoDreams";
  import OmoOrgas from "./omo-elements/5-pages/OmoOrgas";
  import OmoSafe from "./omo-elements/5-pages/OmoSafe";
  import OmoAuth from "./omo-elements/5-pages/OmoAuth";
  import OmoActions from "./omo-elements/5-pages/OmoActions";
  import OmoFunding from "./omo-elements/5-pages/OmoFunding";

  import OmoNavTop from "./omo-elements/2-molecules/OmoNavTop";
  import OmoNavBottom from "./omo-elements/2-molecules/OmoNavBottom";

  import OmoButton from "./omo-elements/1-atoms/OmoButton";

  export let login = {
    text: "Login (alpha test)",
    design: "o-btn-secondary h-8 o-btn-xl uppercase w-1/2 text-center",
    link: "javascript:navigate('omoauth');"
  };

  var router = [
    { route: "?page=home", quant: OmoHome, name: null },
    { route: "?page=docs", quant: OmoDocs, name: null },
    { route: "?page=omodapps", quant: OmoDapps, name: null },
    { route: "?page=omodreams", quant: OmoDreams, name: null },
    { route: "?page=omochat", quant: OmoChat, name: null },
    { route: "?page=omoactions", quant: OmoActions, name: null },
    { route: "?page=omosafe", quant: OmoSafe, name: null },
    { route: "?page=omoorgas", quant: OmoOrgas, name: null },

    { route: "?page=odentity", quant: Odentity, name: null },
    { route: "?page=omoauth", quant: OmoAuth, name: null },
    { route: "?page=odentity", quant: Odentity, name: null },
    { route: "?page=omofunding", quant: OmoFunding, name: null },

    { route: "?page=magicLogin", quant: MagicLogin, name: null }
  ];

  onMount(() => {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("page")) {
      curRoute.set("?page=" + urlParams.get("page"));
    }
    if (!history.state) {
      window.history.replaceState(
        { path: window.location.pathname },
        "",
        window.location.href
      );
    }
    // o.store.odentity.currentOmo().then(o => {
    //   omo = o;
    // });
  });

  window["navigate"] = function(page, data = "") {
    if (data != "")
      window.history.pushState(
        { page: "another" },
        "another page",
        `?page=${page}&data=${data}`
      );
    else
      window.history.pushState(
        { page: "another" },
        "another page",
        `?page=${page}`
      );
    curRoute.set(`?page=${page}`);
  };

  function handlerBackNavigation(event) {
    curRoute.set(event.state.path);
  }

  let omo;

  // if (omo == null) curRoute.set("?page=home");

  import ApolloClient from "apollo-boost";
  import { setClient } from "svelte-apollo";

  // 1. Create an Apollo client and pass it to all child components
  //    (uses svelte's built-in context)
  const client = new ApolloClient({
    uri:
      "https://graph.circles.garden/subgraphs/name/CirclesUBI/circles-subgraph"
  });
  setClient(client);
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

<div class="app">
  <header>
    <OmoNavTop />
  </header>
  <main>

    <svelte:component
      this={router.find(x => x.route == $curRoute.split('&')[0]).quant}
      {router} />

  </main>
  <footer>
    {#if omo != null}
      <OmoNavBottom />
    {:else}
      <div class="flex flex-col justify-center bg-gray-200 h-12">
        <div class="p-4 text-center">
          <OmoButton data={login} />
        </div>
      </div>
    {/if}
  </footer>
</div>
