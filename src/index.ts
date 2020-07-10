import App from "./App.svelte";
import { Quanta } from "./Core/Quanta";
import { ChatRoom } from "./Core/Chat";
import { OmoStore } from "./Core/Store/OmoStore";
import { TextileHub } from "./Core/TextileHub";

var app;

window["ChatRoom"] = new ChatRoom();
OmoStore.getInstance().then(async (store) => {

  window['store'] = store;
  window['hub'] = TextileHub.getInstance();
  app = new App({
    target: document.body,
    props: {
      omo: await store.odentity.currentOmo()
    }
  });
});


export default app;
