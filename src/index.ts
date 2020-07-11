import App from "./App.svelte";
import { ChatRoom } from "./Core/Chat";
import { OmoCore } from "./Core/OmoCore";
import { subscribe, parse, ExecutionResult } from "graphql";

var app;

window["ChatRoom"] = new ChatRoom();
OmoCore.load().then(async (o) => {
  window['omo'] = o;
  window['o'] = o;
  window["subscribe"] = async (query) =>
    (await subscribe({
      schema: o.graphql.getSchema(),
      document: parse(query),
      rootValue: "data",
    })) as AsyncIterableIterator<ExecutionResult>;
  app = new App({
    target: document.body,
    props: {
      omo: await o.store.odentity.currentOmo()
    }
  });
});


export default app;
