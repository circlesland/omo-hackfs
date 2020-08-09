import App from "./App.svelte";
import {init} from "./ComponentRegistrar";
import {Quantum} from "../textile-graphql/src/quantum";

declare global
{
  interface Window
  {
    o: Quantum;
  }
}

var app;

async function start()
{
  window.o = await Quantum.leap();
  init();
  app = new App({
    target: document.body,
  });
}

start();

export default app;
