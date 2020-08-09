import {Quantum} from "./quantum";

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
}

start();

export default app;
