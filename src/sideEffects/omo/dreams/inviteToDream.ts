import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export const inviteToDream: ISideEffect<IProcessContext, any> = {
  _$schemaId: "sideEffects:omo.dreams.inviteToDream",
  inputs: [{
    name: "email",
    type: "schema:omo.string"
  },{
    name: "text",
    type: "schema:omo.any"
  }],
  outputs: [{
    name: "void",
    type: "schema:omo.void"
  }],
  execute: async (context, argument) =>
  {
    const email = context.local.inputs["email"];
    const text = context.local.inputs["text"];

    context.local.outputs["void"] = {};
  },
  canExecute: async context => true
};
