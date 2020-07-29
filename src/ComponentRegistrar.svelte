<script>
  import OmoDream from "./omo-elements/2-molecules/OmoDream.svelte";
  import OmoTitleBar from "./omo-elements/2-molecules/OmoTitleBar";
  import ActionsList from "./omo-elements/2-molecules/ActionsList";
  import OmoBanner from "./omo-elements/2-molecules/OmoBanner";
  import OmoLogin from "./omo-elements/2-molecules/OmoLogin";
  import OmoIntro from "./omo-elements/2-molecules/OmoIntro";
  import OmoChat from "./omo-elements/2-molecules/OmoChat";
  import OmoNext from "./omo-elements/2-molecules/OmoNext";
  import OmoHero from "./omo-elements/2-molecules/OmoHero";
  import OmoGridDreams from "./omo-elements/2-molecules/OmoGridDreams";
  import OmoCircles from "./omo-elements/2-molecules/OmoCircles";
  import OmoCirclesBalance from "./omo-elements/2-molecules/OmoCirclesBalance";
  import OmoNavBottom from "./omo-elements/2-molecules/OmoNavBottom";
  import OmoNavTop from "./omo-elements/2-molecules/OmoNavTop";
  import OmoNavbar from "./omo-elements/2-molecules/OmoNavbar";
  import OmoDappsGrid from "./omo-elements/2-molecules/OmoDappsGrid";
  import OmoDapps from "./omo-elements/2-molecules/OmoDapps";
  import OmoDialogSteps from "./omo-elements/2-molecules/OmoDialogSteps";
  import OmoDialogContent from "./omo-elements/2-molecules/OmoDialogContent";
  import OmoSafeLookup from "./omo-elements/2-molecules/OmoSafeLookup";
  import OmoStatusResponse from "./omo-elements/2-molecules/OmoStatusResponse";
  import {trustFlow} from "./Flows/Flows/omo/safe/TrustFlow";
  import {collectUserValue} from "./Flows/SideEffects/omo/shell/collectUserValue";
  import {giveTrust} from "./Flows/SideEffects/omo/safe/giveTrust";
  import OmoGridVoting from "./omo-elements/2-molecules/OmoGridVoting";
  import OmoGridPreOrder from "./omo-elements/2-molecules/OmoGridPreOrder";

  window.registrar = new Map();
  window.registrar.set("OmoHero", OmoHero);
  window.registrar.set("OmoTitleBar", OmoTitleBar);
  window.registrar.set("OmoDapps", OmoDapps);
  window.registrar.set("OmoBanner", OmoBanner);
  window.registrar.set("OmoLogin", OmoLogin);
  window.registrar.set("OmoIntro", OmoIntro);
  window.registrar.set("OmoChat", OmoChat);
  window.registrar.set("OmoDream", OmoDream);
  window.registrar.set("OmoGridDreams", OmoGridDreams);
  window.registrar.set("OmoDappsGrid", OmoDappsGrid);
  window.registrar.set("OmoNext", OmoNext);
  window.registrar.set("OmoCircles", OmoCircles);
  window.registrar.set("OmoCirclesBalance", OmoCirclesBalance);
  window.registrar.set("OmoNavBottom", OmoNavBottom);
  window.registrar.set("OmoNavTop", OmoNavTop);
  window.registrar.set("OmoNavbar", OmoNavbar);
  window.registrar.set("ActionsList", ActionsList);
  window.registrar.set("OmoDialogContent", OmoDialogContent);
  window.registrar.set("OmoDialogSteps", OmoDialogSteps);
  window.registrar.set("OmoSafeLookup", OmoSafeLookup)
  window.registrar.set("OmoStatusResponse", OmoStatusResponse)

  window.flowRegistrar = new Map();
  window.flowRegistrar.set("omo.safe.trustFlow", trustFlow);

  window.sideEffectRegistrar = new Map();
  window.sideEffectRegistrar.set("omo.shell.collectUserValue", collectUserValue);
  window.sideEffectRegistrar.set("omo.safe.giveTrust", giveTrust);
  window.registrar.set("OmoSafeLookup", OmoSafeLookup);
  window.registrar.set("OmoGridVoting", OmoGridVoting);
  window.registrar.set("OmoGridPreOrder", OmoGridPreOrder);
</script>
