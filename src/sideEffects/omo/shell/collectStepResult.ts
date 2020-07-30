import {ISideEffect} from "../../../Core/Flows/ISideEffect";
import {IProcessContext} from "../../../Core/Flows/IProcessContext";

export const collectStepResult:ISideEffect<IProcessContext, any> = {
  execute: async (context, argument) => {
      context[context.stepId] = argument;
  },
  canExecute: async context => true
};
