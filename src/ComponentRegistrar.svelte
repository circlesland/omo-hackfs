<script>
  import OmoDream from "./omo-elements/5-dapps/OmoDream.svelte";
  import OmoDapps from "./omo-elements/2-molecules/OmoDapps";
  import OmoNavBar from "./omo-elements/2-molecules/OmoNavBar";
  import OmoTitleBar from "./omo-elements/2-molecules/OmoTitleBar";
  import OmoBanner from "./omo-elements/2-molecules/OmoBanner";
  import OmoLogin from "./omo-elements/2-molecules/OmoLogin";
  import OmoIntro from "./omo-elements/2-molecules/OmoIntro";
  import OmoChat from "./omo-elements/2-molecules/OmoChat";
  import OmoNext from "./omo-elements/2-molecules/OmoNext";
  import OmoHero from "./omo-elements/2-molecules/OmoHero";
  import OmoGridDreams from "./omo-elements/2-molecules/OmoGridDreams";
  import OmoCircles from "./omo-elements/2-molecules/OmoCircles";
  import OmoCirclesBalance from "./omo-elements/2-molecules/OmoCirclesBalance";

  window.registrar = new Map();
  window.registrar.set("OmoNavBar", OmoNavBar);
  window.registrar.set("OmoHero", OmoHero);
  window.registrar.set("OmoTitleBar", OmoTitleBar);
  window.registrar.set("OmoDapps", OmoDapps);
  window.registrar.set("OmoBanner", OmoBanner);
  window.registrar.set("OmoLogin", OmoLogin);
  window.registrar.set("OmoIntro", OmoIntro);
  window.registrar.set("OmoChat", OmoChat);
  window.registrar.set("OmoDream", OmoDream);
  window.registrar.set("OmoGridDreams", OmoGridDreams);
  window.registrar.set("OmoNext", OmoNext);
  window.registrar.set("OmoCircles", OmoCircles);
  window.registrar.set("OmoCirclesBalance", OmoCirclesBalance);
</script>
