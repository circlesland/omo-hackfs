import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export const revokeTrust:ISideEffect<IProcessContext, void> = {
    _$schemaId: "sideEffects:omo.safe.revokeTrust",
    inputs: [{
        name: "trustGivingSafeOwner",
        type: "schema:omo.safe.safeOwner"
    },{
        name: "trustGivingSafe",
        type: "schema:omo.safe.safe"
    },{
        name: "trustReceivingSafe",
        type: "schema:omo.safe.safe"
    }],
    outputs:[{
        name: "void",
        type: "schema:omo.void"
    }],
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
          context.local.inputs["trustGivingSafeOwner"],
          context.local.inputs["trustGivingSafe"],
          context.local.inputs["trustReceivingSafe"]
      );
      context.local.outputs["void"] = {};
      console.log("SE: revoked trust");
  },
  canExecute: async context => true
};
