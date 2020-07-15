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

  window["restore"] = function (key) {
    return JSON.parse(localStorage.getItem(key) || "{}");
  };
  window["store"] = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  };

  app = new App({
    target: document.body
  });
});
// });

export default app;
