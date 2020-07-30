import App from "./App.svelte";
import { Quantum } from "./core/Quantum";
import { Threads } from "./core/Textile/Threads";
import { RemoteThread } from "./core/Textile/RemoteThread";
import { async } from "rxjs";

declare global {
  interface Window {
    o: Quantum;
  }
}

var app;

async function start() {
  window.o = await Quantum.leap();
  app = new App({
    target: document.body,
  });
}
start();

export default app;

window["restore"] = function (key) {
  return JSON.parse(localStorage.getItem(key) || "{}");
};
window["store"] = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};
