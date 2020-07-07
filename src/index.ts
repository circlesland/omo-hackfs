import App from "./App.svelte";
import { TextileHub } from "./TextileHub";

var app;

var textileHub = TextileHub.getInstance();
textileHub.init(true).then(() => {
  app = new App({
    target: document.body,
  });
});

export default app;
