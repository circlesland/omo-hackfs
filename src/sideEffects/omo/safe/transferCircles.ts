import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export const transferCircles:ISideEffect<IProcessContext, void> = {
    _$schemaId: "sideEffects:omo.safe.transferCircles",
    inputs: [{
        name: "sendingSafeOwner",
        type: "schema:omo.safe.safeOwner"
    },{
        name: "sendingSafeAddress",
        type: "schema:omo.safe.safe"
    },{
        name: "receivingSafeAddress",
        type: "schema:omo.safe.safe"
    }, {
        name: "amount",
        type: "schema:omo.number"
    }],
    outputs:[{
        name: "void",
        type: "schema:omo.void"
    }],
  execute: async (context, argument) => {
      async function sendCirclesAsync(
          sendingSafeOwner,
          sendingSafeAddress,
          receivingSafeAddress,
          amount
      ) {
          let receivingSafeAddressC = window.o.web3.utils.toChecksumAddress(receivingSafeAddress.safeAddress);
          let sendingSafeAddressC = window.o.web3.utils.toChecksumAddress(sendingSafeAddress.safeAddress);
          // .. give user the permission to send their Token to you
          await window.o.circlesCore.token.transfer(sendingSafeOwner, {
              from: sendingSafeAddressC,
              to: receivingSafeAddressC,
              value: amount,
          });
          alert("Sent " + amount + " Circles to: " + receivingSafeAddress);
      }
      if (!context.o.odentity.current) {
          throw new Error("context.o.odentity.current is not set in 'giveTrust' side effect.");
      }

      await sendCirclesAsync(
          context.inputs["sendingSafeOwner"],
          context.inputs["sendingSafeAddress"],
          context.inputs["receivingSafeAddress"],
          context.inputs["amount"]
      );
      context.outputs["void"] = {};
  },
  canExecute: async context => true
};
