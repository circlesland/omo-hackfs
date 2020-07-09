<script>
  import { curId, curRoute } from "./Router.ts";
  import { onMount } from "svelte";

  import OmoHome from "./omo-elements/5-pages/OmoHome";
  import OmoDocs from "./omo-elements/5-pages/OmoDocs";
  import OmoDapps from "./omo-elements/5-pages/OmoDapps";
  import OmoChat from "./omo-elements/5-pages/OmoChat";
  import Odentity from "./omo-elements/5-pages/Odentity";
  import OmoSapiens from "./omo-elements/5-pages/OmoSapiens";
  import OmoPay from "./omo-elements/5-pages/OmoPay";
  import OmoAuth from "./omo-elements/5-pages/OmoAuth";
  import OmoActions from "./omo-elements/5-pages/OmoActions";
  import OmoNavTop from "./omo-elements/2-molecules/OmoNavTop";
  import OmoNavBottom from "./omo-elements/2-molecules/OmoNavBottom";

  var router = [
    { route: "?page=home", quant: OmoHome, name: null },
    { route: "?page=docs", quant: OmoDocs, name: null },
    { route: "?page=omodapps", quant: OmoDapps, name: null },
    { route: "?page=omosapiens", quant: OmoSapiens, name: null },
    { route: "?page=omochat", quant: OmoChat, name: null },
    { route: "?page=omoactions", quant: OmoActions, name: null },
    { route: "?page=omopay", quant: OmoPay, name: null },
    { route: "?page=odentity", quant: Odentity, name: null },
    { route: "?page=omoauth", quant: OmoAuth, name: null }
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
  });

  function handlerBackNavigation(event) {
    curRoute.set(event.state.path);
  }
  console.log(router);
</script>

<style>
  .app {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2rem 1fr 4rem;
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
      this={router.find(x => x.route == $curRoute).quant}
      {router} />
  </main>
  <footer>
    <OmoNavBottom />
  </footer>
</div>
