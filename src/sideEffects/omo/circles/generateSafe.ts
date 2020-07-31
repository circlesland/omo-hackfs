import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export const generateSafe:ISideEffect<IProcessContext, any> = {
    _$schemaId: "sideEffects:omo.circles.generateSafe",
    inputs: [{
        name: "safeOwner",
        type: "schema:omo.safe.safeOwner"
    }],
    outputs:[{
        name: "safe",
        type: "schema:omo.safe.safe"
    }],
  execute: async (context, argument) => {
      const ppk = context.local.inputs["safeOwner"]
      // Generate a nonce to predict Safe address
      const nonce = new Date().getTime();
      // Prepare Safe deployment and receive a predicted safeAddress
      const safeAddress = await window.o.circlesCore.safe.prepareDeploy(ppk, { nonce });
      const safe = { safeAddress: safeAddress };
      context.local.outputs["safe"] = safe;

      console.log("SE: Generated safe:" ,context.local.outputs["safe"]);
      console.log("Generated safe: ", context.local.outputs["safe"])
  },
  canExecute: async context => true
};
