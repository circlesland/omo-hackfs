import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export const collectStepResult:ISideEffect<IProcessContext, any> = {
    _$schemaId: "sideEffects:omo.shell.collectStepResult",
    inputs: [],
    outputs: [{
        name: "void",
        type: "schema:omo.void"
    }],
  execute: async (context, argument) => {
      context[context.stepId] = argument;
      context.outputs["void"] = {};
  },
  canExecute: async context => true
};
