import App from "./App.svelte";
import { Quanta } from "./Core/Quanta";
import { ChatRoom } from "./Core/Chat";

var app;

window["ChatRoom"] = new ChatRoom();

// Quanta.getInstance().init(true).then(quanta => {
app = new App({
  target: document.body,
});
// });

export default app;
