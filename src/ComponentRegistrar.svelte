<script>
  import OmoDream from "./quants/2-molecules/OmoDream.svelte";
  import OmoTitleBar from "./quants/2-molecules/OmoTitleBar";
  import ActionsList from "./quants/2-molecules/ActionsList";
  import OmoBanner from "./quants/2-molecules/OmoBanner";
  import OmoLogin from "./quants/2-molecules/OmoLogin";
  import OmoIntro from "./quants/2-molecules/OmoIntro";
  import OmoChat from "./quants/2-molecules/OmoChat";
  import OmoNext from "./quants/2-molecules/OmoNext";
  import OmoHero from "./quants/2-molecules/OmoHero";
  import OmoGridDreams from "./quants/2-molecules/OmoGridDreams";
  import OmoCircles from "./quants/2-molecules/OmoCircles";
  import OmoCirclesBalance from "./quants/2-molecules/OmoCirclesBalance";
  import OmoNavBottom from "./quants/2-molecules/OmoNavBottom";
  import OmoNavTop from "./quants/2-molecules/OmoNavTop";
  import OmoNavbar from "./quants/2-molecules/OmoNavbar";
  import OmoDappsGrid from "./quants/2-molecules/OmoDappsGrid";
  import OmoDapps from "./quants/2-molecules/OmoDapps";
  import OmoDialogSteps from "./quants/2-molecules/OmoDialogSteps";
  import OmoSafeLookup from "./quants/2-molecules/OmoSafeLookup";
  import OmoStatusResponse from "./quants/2-molecules/OmoStatusResponse";
  import OmoSelect from "./quants/2-molecules/OmoSelect";
  import OmoGridVoting from "./quants/2-molecules/OmoGridVoting";
  import OmoGridPreOrder from "./quants/2-molecules/OmoGridPreOrder";

  import {giveTrust as giveTrustFlow} from "./flows/omo/safe/giveTrust";
  import {revokeTrust as revokeTrustFlow} from "./flows/omo/safe/revokeTrust";
  import {transferCircles as transferCirclesFlow} from "./flows/omo/safe/transferCircles";
  import {addChatRoom as addChatRoomFlow} from "./flows/omo/chat/addChatRoom";
  import {removeChatRoom as removeChatRoomFlow} from "./flows/omo/chat/removeChatRoom";
  import {sendMessage as sendMessageFlow} from "./flows/omo/chat/sendMessage";
  import {addOwnerDevice as addOwnerDeviceFlow} from "./flows/omo/odentity/addOwnerDevice";
  import {removeOwnerDevice as removeOwnerDeviceFlow} from "./flows/omo/odentity/removeOwnerDevice";
  import {addAuthProviderMail as addAuthProviderMailFlow} from "./flows/omo/odentity/addAuthProviderMail";
  import {removeAuthProviderMail as removeAuthProviderMailFlow} from "./flows/omo/odentity/removeAuthProviderMail";
  import {addAuthProviderSeedPhrase as addAuthProviderSeedPhraseFlow} from "./flows/omo/odentity/addAuthProviderSeedPhrase";
  import {removeAuthProviderSeedPhrase as removeAuthProviderSeedPhraseFlow} from "./flows/omo/odentity/removeAuthProviderSeedPhraseFlow";

  import {collectStepResult} from "./sideEffects/omo/shell/collectStepResult";
  import {giveTrust as giveTrustSideEffect} from "./sideEffects/omo/safe/giveTrust";
  import {transferCircles as transferCirclesSideEffect} from "./sideEffects/omo/safe/transferCircles";
  import {revokeTrust as revokeTrustSideEffect} from "./sideEffects/omo/safe/revokeTrust";


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
  window.registrar.set("OmoSelect", OmoSelect);

  window.flowRegistrar = new Map();
  window.flowRegistrar.set("flows:omo.safe.giveTrust", giveTrustFlow);
  window.flowRegistrar.set("flows:omo.safe.revokeTrust", revokeTrustFlow);
  window.flowRegistrar.set("flows:omo.safe.transferCircles", transferCirclesFlow);
  window.flowRegistrar.set("flows:omo.chat.addChatRoom", addChatRoomFlow);
  window.flowRegistrar.set("flows:omo.chat.removeChatRoom", removeChatRoomFlow);
  window.flowRegistrar.set("flows:omo.chat.sendMessage", sendMessageFlow);
  window.flowRegistrar.set(
          "flows:omo.odentity.addOwnerDevice",
          addOwnerDeviceFlow
  );
  window.flowRegistrar.set(
          "flows:omo.odentity.removeOwnerDevice",
          removeOwnerDeviceFlow
  );
  window.flowRegistrar.set(
          "flows:omo.odentity.addAuthProviderMail",
          addAuthProviderMailFlow
  );
  window.flowRegistrar.set(
          "flows:omo.odentity.removeAuthProviderMail",
          removeAuthProviderMailFlow
  );
  window.flowRegistrar.set(
          "flows:omo.odentity.addAuthProviderSeedPhrase",
          addAuthProviderSeedPhraseFlow
  );
  window.flowRegistrar.set(
          "flows:omo.odentity.removeAuthProviderSeedPhrase",
          removeAuthProviderSeedPhraseFlow
  );

  window.sideEffectRegistrar = new Map();
  window.sideEffectRegistrar.set("sideEffects:omo.shell.collectStepResult", collectStepResult);
  window.sideEffectRegistrar.set("sideEffects:omo.safe.giveTrust", giveTrustSideEffect);
  window.sideEffectRegistrar.set("sideEffects:omo.safe.revokeTrust", revokeTrustSideEffect);
  window.sideEffectRegistrar.set("sideEffects:omo.safe.transferCircles", transferCirclesSideEffect);
</script>
