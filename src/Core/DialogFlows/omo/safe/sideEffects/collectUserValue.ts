import {ISideEffect} from "../../../ISideEffect";
import {TrustContext} from "../Trust";

export const collectUserValue:ISideEffect<TrustContext, any> = {
  execute: async (context, argument) => {
      context[context.stepId] = argument;
  },
  canExecute: async context => true
};
