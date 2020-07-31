import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export const generateSafe:ISideEffect<IProcessContext, any> = {
    _$schemaId: "sideEffects:omo.circles.generateSafe",
    inputs: [{
        name: "safeOwner",
        type: "schema:omo.safe.safeOwner"
    }],
    outputs:[{
        name: "void",
        type: "schema:omo.void"
    }],
  execute: async (context, argument) => {
      const ppk = context.inputs["safeOwner"]
      // Generate a nonce to predict Safe address
      const nonce = new Date().getTime();
      // Prepare Safe deployment and receive a predicted safeAddress
      const safeAddress = await window.o.circlesCore.safe.prepareDeploy(ppk, { nonce });
      const safe = { safeAddress: safeAddress };
      context[context.stepId] = safe;
      context.outputs["void"] = {};
  },
  canExecute: async context => true
};
