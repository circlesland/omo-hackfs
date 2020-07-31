import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export const createDream:ISideEffect<IProcessContext, any> = {
    _$schemaId: "sideEffects:omo.dreams.createDream",
    inputs: [{
        name: "name",
        type: "schema:omo.string"
    }],
    outputs:[{
        name: "void",
        type: "schema:omo.void"
    }],
  execute: async (context, argument) => {
      const dreamName = context.local.inputs["name"];
      context.local.outputs["void"] = {};
  },
  canExecute: async context => true
};
