import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export const giveTrust:ISideEffect<IProcessContext, void> = {
  execute: async (context, argument) => {
      async function addTrustLineAsync(
          trustGivingSafeOwner,
          trustGivingSafe,
          trustReceivingSafe,
          trustPercentage
      ) {
          // .. give user the permission to send their Token to you
          const trusted = await window.o.circlesCore.trust.addConnection(trustGivingSafeOwner, {
              canSendTo: trustGivingSafe.safeAddress,
              user: trustReceivingSafe,
              limitPercentage: trustPercentage
          });
          alert(JSON.stringify(trusted));
          return trusted;
      }
      if (!context.o.odentity.current) {
          throw new Error("context.o.odentity.current is not set in 'giveTrust' side effect.");
      }

      await addTrustLineAsync(
          context.o.odentity.current.circleSafeOwner,
          context.o.odentity.current.circleSafe,
          context["flows:omo.safe.giveTrust:trustReceivingSafe"],
          context["flows:omo.safe.giveTrust:trustPercentage"]
      );
  },
  canExecute: async context => true
};
