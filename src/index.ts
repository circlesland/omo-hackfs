import App from "./App.svelte";
import { OmoCore } from "./Core/OmoCore";

declare global {
  interface Window { o: OmoCore; }
  interface Window { omo: OmoCore; }
}

var app;

OmoCore.start().then(async (o) => {
  window.o = o;
  window.omo = o;

  app = new App({
    target: document.body
  });
});



export default app;
