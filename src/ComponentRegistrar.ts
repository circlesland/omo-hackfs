//
// Quanta
//
import OmoDream from "./quants/2-molecules/OmoDream.svelte";
import OmoTitleBar from "./quants/2-molecules/OmoTitleBar.svelte";
import ActionsList from "./quants/2-molecules/ActionsList.svelte";
import OmoBanner from "./quants/2-molecules/OmoBanner.svelte";
import OmoLogin from "./quants/2-molecules/OmoLogin.svelte";
import OmoIntro from "./quants/2-molecules/OmoIntro.svelte";
import OmoChat from "./quants/2-molecules/OmoChat.svelte";
import OmoNext from "./quants/2-molecules/OmoNext.svelte";
import OmoHero from "./quants/2-molecules/OmoHero.svelte";
import OmoGridDreams from "./quants/2-molecules/OmoGridDreams.svelte";
import OmoCircles from "./quants/2-molecules/OmoCircles.svelte";
import OmoCirclesBalance from "./quants/2-molecules/OmoCirclesBalance.svelte";
import OmoNavBottom from "./quants/2-molecules/OmoNavBottom.svelte";
import OmoNavTop from "./quants/2-molecules/OmoNavTop.svelte";
import OmoNavbar from "./quants/2-molecules/OmoNavbar.svelte";
import OmoDappsGrid from "./quants/2-molecules/OmoDappsGrid.svelte";
import OmoDapps from "./quants/2-molecules/OmoDapps.svelte";
import OmoDialogSteps from "./quants/2-molecules/OmoDialogSteps.svelte";
import OmoInput from "./quants/2-molecules/OmoInput.svelte";
import OmoStatusResponse from "./quants/2-molecules/OmoStatusResponse.svelte";
import OmoSelect from "./quants/2-molecules/OmoSelect.svelte";
import OmoGridVoting from "./quants/2-molecules/OmoGridVoting.svelte";
import OmoGridPreOrder from "./quants/2-molecules/OmoGridPreOrder.svelte";
import OmoNextButton from "./quants/2-molecules/OmoNextButton.svelte";
import OmoLoading from "./quants/2-molecules/OmoLoading.svelte";

//
// Flows
//
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
import {createDream as createDreamFlow} from "./flows/omo/dreams/createDream";

//
// SideEffects
//
import {collectStepResult} from "./sideEffects/omo/shell/collectStepResult";
import {giveTrust as giveTrustSideEffect} from "./sideEffects/omo/safe/giveTrust";
import {transferCircles as transferCirclesSideEffect} from "./sideEffects/omo/safe/transferCircles";
import {revokeTrust as revokeTrustSideEffect} from "./sideEffects/omo/safe/revokeTrust";
import {generatePpk as generatePpkSideEffect} from "./sideEffects/omo/web3/generatePpk";
import {generateSafe as generateSafeSideEffect} from "./sideEffects/omo/circles/generateSafe";
import {giveInitialTrust as giveInitialTrustSideEffect} from "./sideEffects/omo/circles/giveInitialTrust";
import {deployToken as deployTokenSideEffect} from "./sideEffects/omo/safe/deployToken";
import {deploySafe as deploySafeSideEffect} from "./sideEffects/omo/safe/deploySafe";
import {createDream as createDreamSideEffect} from "./sideEffects/omo/dreams/createDream";
import {revokeInitialTrust as revokeInitialTrustSideEffect} from "./sideEffects/omo/circles/revokeInitialTrust";


//
// Schema
//
import {ChatRoom} from "./schema/omo/chatRoom";
import {Event} from "./schema/omo/event";
import {LoginRequest} from "./schema/omo/loginRequest";
import {Message} from "./schema/omo/message";
import {Odentity} from "./schema/omo/odentity";
import {OdentityProvider} from "./schema/omo/odentityProvider";
import {Quant} from "./schema/omo/quant";
import {Safe} from "./schema/omo/safe/safe";
import {Number} from "./schema/omo/number";
import {Void} from "./schema/omo/void";
import {Any} from "./schema/omo/any";

export function init()
{
    const w = <any>window;
    w.registrar = new Map();
    w.registrar.set("OmoHero", OmoHero);
    w.registrar.set("OmoTitleBar", OmoTitleBar);
    w.registrar.set("OmoDapps", OmoDapps);
    w.registrar.set("OmoBanner", OmoBanner);
    w.registrar.set("OmoLogin", OmoLogin);
    w.registrar.set("OmoIntro", OmoIntro);
    w.registrar.set("OmoChat", OmoChat);
    w.registrar.set("OmoDream", OmoDream);
    w.registrar.set("OmoGridDreams", OmoGridDreams);
    w.registrar.set("OmoDappsGrid", OmoDappsGrid);
    w.registrar.set("OmoNext", OmoNext);
    w.registrar.set("OmoCircles", OmoCircles);
    w.registrar.set("OmoCirclesBalance", OmoCirclesBalance);
    w.registrar.set("OmoNavBottom", OmoNavBottom);
    w.registrar.set("OmoNavTop", OmoNavTop);
    w.registrar.set("OmoNavbar", OmoNavbar);
    w.registrar.set("ActionsList", ActionsList);
    w.registrar.set("OmoDialogSteps", OmoDialogSteps);
    w.registrar.set("OmoInput", OmoInput)
    w.registrar.set("OmoStatusResponse", OmoStatusResponse)
    w.registrar.set("OmoGridVoting", OmoGridVoting);
    w.registrar.set("OmoGridPreOrder", OmoGridPreOrder);
    w.registrar.set("OmoSelect", OmoSelect);
    w.registrar.set("OmoNextButton", OmoNextButton);
    w.registrar.set("OmoLoading", OmoLoading);

    w.flowRegistrar = new Map();
    w.flowRegistrar.set("flows:omo.safe.giveTrust", giveTrustFlow);
    w.flowRegistrar.set("flows:omo.safe.revokeTrust", revokeTrustFlow);
    w.flowRegistrar.set("flows:omo.safe.transferCircles", transferCirclesFlow);
    w.flowRegistrar.set("flows:omo.chat.addChatRoom", addChatRoomFlow);
    w.flowRegistrar.set("flows:omo.chat.removeChatRoom", removeChatRoomFlow);
    w.flowRegistrar.set("flows:omo.chat.sendMessage", sendMessageFlow);
    w.flowRegistrar.set(
        "flows:omo.odentity.addOwnerDevice",
        addOwnerDeviceFlow
    );
    w.flowRegistrar.set(
        "flows:omo.odentity.removeOwnerDevice",
        removeOwnerDeviceFlow
    );
    w.flowRegistrar.set(
        "flows:omo.odentity.addAuthProviderMail",
        addAuthProviderMailFlow
    );
    w.flowRegistrar.set(
        "flows:omo.odentity.removeAuthProviderMail",
        removeAuthProviderMailFlow
    );
    w.flowRegistrar.set(
        "flows:omo.odentity.addAuthProviderSeedPhrase",
        addAuthProviderSeedPhraseFlow
    );
    w.flowRegistrar.set(
        "flows:omo.odentity.removeAuthProviderSeedPhrase",
        removeAuthProviderSeedPhraseFlow
    );
    w.flowRegistrar.set(
        "flows:omo.dreams.createDream",
        createDreamFlow
    );

    w.sideEffectRegistrar = new Map();
    [
        collectStepResult,
        giveTrustSideEffect,
        revokeTrustSideEffect,
        transferCirclesSideEffect,
        generatePpkSideEffect,
        generateSafeSideEffect,
        giveInitialTrustSideEffect,
        deployTokenSideEffect,
        deploySafeSideEffect,
        createDreamSideEffect,
        revokeInitialTrustSideEffect
    ].forEach(o =>
    {
        w.sideEffectRegistrar.set(o["_$schemaId"], o);
    });

    w.schemaRegistrar = new Map();
    [
        ChatRoom,
        Event,
        LoginRequest,
        Message,
        Odentity,
        OdentityProvider,
        Quant,
        Safe,
        Number,
        Void,
        Any
    ].forEach(o =>
    {
        w.schemaRegistrar.set(o["_$schemaId"], o);
    });
}
