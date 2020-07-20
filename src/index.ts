import App from "./App.svelte";
import { Quantum } from "./Core/Quantum";
import { Threads } from "./Core/Textile/Threads";

declare global {
  interface Window { o: Quantum; }
}

var app;

async function start() {
  window["threads"] = new Threads();
  let start = performance.now();
  window.o = await Quantum.leap();
  let end = performance.now();
  console.log(`quantumleap takes ${end - start}ms`);

  app = new App({
    target: document.body
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