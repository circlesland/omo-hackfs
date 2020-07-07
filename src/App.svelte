<script>
  import { curId, curRoute } from "./Router.ts";
  import { onMount } from "svelte";

  import OmoHome from "./omo-elements/5-pages/OmoHome";
  import OmoUser from "./omo-elements/5-pages/OmoUser";

  var router = [
    { route: "?page=home", quant: OmoHome, name: null },
    { route: "?page=user", quant: OmoUser, name: null }
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

<svelte:component
  this={router.find(x => x.route == $curRoute).quant}
  {router} />
