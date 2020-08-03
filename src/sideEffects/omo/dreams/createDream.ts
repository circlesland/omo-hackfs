import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";
import {Dreams as DreamsMutations} from "../../../mutations/omo/dreams/dreams";

export const createDream: ISideEffect<IProcessContext, any> = {
  _$schemaId: "sideEffects:omo.dreams.createDream",
  inputs: [{
    name: "name",
    type: "schema:omo.string"
  },{
    name: "safe",
    type: "schema:omo.any"
  }],
  outputs: [{
    name: "void",
    type: "schema:omo.void"
  }],
  execute: async (context, argument) =>
  {
    const dreamName = context.local.inputs["name"];
    const safeAddress = context.local.inputs["safe"].safeAddress;

    const newDream = await DreamsMutations.createNewDream(dreamName, "", safeAddress);
    console.log("Created new dream:", newDream);

    context.local.outputs["void"] = {};
  },
  canExecute: async context => true
};
