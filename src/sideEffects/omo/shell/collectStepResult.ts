import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export const collectStepResult:ISideEffect<IProcessContext, any> = {
  execute: async (context, argument) => {
      context[context.stepId] = argument;
  },
  canExecute: async context => true
};
