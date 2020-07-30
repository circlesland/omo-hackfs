<script>
  import OmoDream from "./quants/omo-elements/2-molecules/OmoDream.svelte";
  import OmoTitleBar from "./quants/omo-elements/2-molecules/OmoTitleBar";
  import ActionsList from "./quants/omo-elements/2-molecules/ActionsList";
  import OmoBanner from "./quants/omo-elements/2-molecules/OmoBanner";
  import OmoLogin from "./quants/omo-elements/2-molecules/OmoLogin";
  import OmoIntro from "./quants/omo-elements/2-molecules/OmoIntro";
  import OmoChat from "./quants/omo-elements/2-molecules/OmoChat";
  import OmoNext from "./quants/omo-elements/2-molecules/OmoNext";
  import OmoHero from "./quants/omo-elements/2-molecules/OmoHero";
  import OmoGridDreams from "./quants/omo-elements/2-molecules/OmoGridDreams";
  import OmoCircles from "./quants/omo-elements/2-molecules/OmoCircles";
  import OmoCirclesBalance from "./quants/omo-elements/2-molecules/OmoCirclesBalance";
  import OmoNavBottom from "./quants/omo-elements/2-molecules/OmoNavBottom";
  import OmoNavTop from "./quants/omo-elements/2-molecules/OmoNavTop";
  import OmoNavbar from "./quants/omo-elements/2-molecules/OmoNavbar";
  import OmoDappsGrid from "./quants/omo-elements/2-molecules/OmoDappsGrid";
  import OmoDapps from "./quants/omo-elements/2-molecules/OmoDapps";
  import OmoDialogSteps from "./quants/omo-elements/2-molecules/OmoDialogSteps";
  import OmoSafeLookup from "./quants/omo-elements/2-molecules/OmoSafeLookup";
  import OmoStatusResponse from "./quants/omo-elements/2-molecules/OmoStatusResponse";
  import {giveTrust as giveTrustFlow} from "./flows/omo/safe/giveTrust";
  import {revokeTrust as revokeTrustFlow} from "./flows/omo/safe/revokeTrust";
  import {transferCircles as transferCirclesFlow} from "./flows/omo/safe/transferCircles";
  import {collectStepResult} from "./sideEffects/omo/shell/collectStepResult";
  import {giveTrust as giveTrustSideEffect} from "./sideEffects/omo/safe/giveTrust";
  import {transferCircles as transferCirclesSideEffect} from "./sideEffects/omo/safe/transferCircles";
  import {revokeTrust as revokeTrustSideEffect} from "./sideEffects/omo/safe/revokeTrust";
  import OmoGridVoting from "./quants/omo-elements/2-molecules/OmoGridVoting";
  import OmoGridPreOrder from "./quants/omo-elements/2-molecules/OmoGridPreOrder";

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
  window.registrar.set("OmoDialogSteps", OmoDialogSteps);
  window.registrar.set("OmoSafeLookup", OmoSafeLookup)
  window.registrar.set("OmoStatusResponse", OmoStatusResponse)
  window.registrar.set("OmoSafeLookup", OmoSafeLookup);
  window.registrar.set("OmoGridVoting", OmoGridVoting);
  window.registrar.set("OmoGridPreOrder", OmoGridPreOrder);

  window.flowRegistrar = new Map();
  window.flowRegistrar.set("flows:omo.safe.giveTrust", giveTrustFlow);
  window.flowRegistrar.set("flows:omo.safe.revokeTrust", revokeTrustFlow);
  window.flowRegistrar.set("flows:omo.safe.transferCircles", transferCirclesFlow);

  window.sideEffectRegistrar = new Map();
  window.sideEffectRegistrar.set("sideEffects:omo.shell.collectStepResult", collectStepResult);
  window.sideEffectRegistrar.set("sideEffects:omo.safe.giveTrust", giveTrustSideEffect);
  window.sideEffectRegistrar.set("sideEffects:omo.safe.revokeTrust", revokeTrustSideEffect);
  window.sideEffectRegistrar.set("sideEffects:omo.safe.transferCircles", transferCirclesSideEffect);
</script>
