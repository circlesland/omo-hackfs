import {ISideEffect} from "../../../../Core/Flows/ISideEffect";
import {IProcessContext} from "../../../../Core/Flows/IProcessContext";

export const sendCircles:ISideEffect<IProcessContext, void> = {
  execute: async (context, argument) => {
      async function sendCirclesAsync(
          sendingSafeOwner,
          sendingSafeAddress,
          receivingSafeAddress,
          amount
      ) {
          // .. give user the permission to send their Token to you
          await window.o.circlesCore.token.transfer(sendingSafeOwner, {
              from: sendingSafeAddress,
              to: receivingSafeAddress,
              value: amount,
          });
          alert("Sent " + amount + " Circles to: " + receivingSafeAddress);
      }
      if (!context.o.odentity.current) {
          throw new Error("context.o.odentity.current is not set in 'giveTrust' side effect.");
      }

      await sendCirclesAsync(
          context.o.odentity.current.circleSafeOwner,
          context.o.odentity.current.circleSafe,
          context["omo.safe.sendCirclesFlow:receivingSafe"],
          context["omo.safe.sendCirclesFlow:amount"]
      );
  },
  canExecute: async context => true
};
