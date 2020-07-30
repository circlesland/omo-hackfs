import {ISideEffect} from "../../../../Core/Flows/ISideEffect";
import {IProcessContext} from "../../../../Core/Flows/IProcessContext";

export const revokeTrust:ISideEffect<IProcessContext, void> = {
  execute: async (context, argument) => {
      async function removeTrustLineAsync(
          trustGivingSafeOwner,
          trustGivingSafeAddress,
          trustReceivingSafe
      ) {
          // .. give user the permission to send their Token to you
          await window.o.circlesCore.trust.removeConnection(trustGivingSafeOwner, {
              user: trustGivingSafeAddress,
              canSendTo: trustReceivingSafe,
          });
          alert("Untrusted: " + trustReceivingSafe);
      }
      if (!context.o.odentity.current) {
          throw new Error("context.o.odentity.current is not set in 'giveTrust' side effect.");
      }

      await removeTrustLineAsync(
          context.o.odentity.current.circleSafeOwner,
          context.o.odentity.current.circleSafe,
          context["sideEffects:omo.safe.giveTrust:trustReceivingSafe"]
      );
  },
  canExecute: async context => true
};
