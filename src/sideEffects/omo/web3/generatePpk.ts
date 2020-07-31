import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export const generatePpk:ISideEffect<IProcessContext, any> = {
    _$schemaId: "sideEffects:omo.web3.generatePpk",
    inputs: [],
    outputs: [{
        name: "safeOwner",
        type: "schema:omo.safe.safeOwner"
    }],
  execute: async (context, argument) => {
      const ppk = window.o.web3.eth.accounts.create();
      context.outputs["safeOwner"] = ppk;
  },
  canExecute: async context => true
};
