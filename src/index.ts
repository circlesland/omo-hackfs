import App from "./App.svelte";
import { Quanta } from "./Core/Quanta";
import { ChatRoom } from "./Core/Chat";
import { OmoStore } from "./Core/Store/OmoStore";
import { TextileHub } from "./Core/TextileHub";

var app;

window["ChatRoom"] = new ChatRoom();
OmoStore.getInstance().init().then(() => {
  app = new App({
    target: document.body,
  });
});

window['store'] = OmoStore.getInstance();
window['hub'] = TextileHub.getInstance();
export default app;
