import {ISideEffect} from "../../../ISideEffect";
import {TrustContext} from "../Trust";

export const giveTrust:ISideEffect<TrustContext, void> = {
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
              user: trustReceivingSafe.safeAddress,
              limitPercentage: trustPercentage
          });
          alert(JSON.stringify(trusted));
          return trusted;
      }
      await addTrustLineAsync(
          context.trustGivingSafeOwner,
          context.trustGivingSafe,
          context.trustReceivingSafe,
          context.trustPercentage
      );
  },
  canExecute: async context => true
};
