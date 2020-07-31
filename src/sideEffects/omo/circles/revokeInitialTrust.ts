import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";
import {giveTrust} from "../safe/giveTrust";

export const revokeInitialTrust: ISideEffect<IProcessContext, any> = {
    _$schemaId: "sideEffects:omo.circles.revokeInitialTrust",
    inputs: [{
        name: "trustReceiverSafe",
        type: "schema:omo.safe.safe",
        description: ""
    }],
    outputs: [{
        name: "void",
        type: "schema:omo.void"
    }],
    execute: async (context, argument) =>
    {
        console.log("SE: Give initial trust started..");
        const omo1 = {
            safeOwner: {
                privateKey: process.env.OMO1_ACCOUNT_PRIVATEKEY,
                address: process.env.OMO1_ACCOUNT_ADDRESS
            },
            safe: { safeAddress: process.env.OMO1_SAFE_SAFEADDRESS }
        };
        const omo2 = {
            safeOwner: {
                privateKey: process.env.OMO2_ACCOUNT_PRIVATEKEY,
                address: process.env.OMO2_ACCOUNT_ADDRESS
            },
            safe: { safeAddress: process.env.OMO2_SAFE_SAFEADDRESS }
        };
        const omo3 = {
            safeOwner: {
                privateKey: process.env.OMO3_ACCOUNT_PRIVATEKEY,
                address: process.env.OMO3_ACCOUNT_ADDRESS
            },
            safe: { safeAddress: process.env.OMO3_SAFE_SAFEADDRESS }
        };

        console.log("SE: Revoke initial trust initialized..");


        async function removeTrustLineAsync(
            trustGivingSafeOwner,
            trustGivingSafeAddress,
            trustReceivingSafe
        ) {
            // .. give user the permission to send their Token to you
            await window.o.circlesCore.trust.removeConnection(trustGivingSafeOwner, {
                user: trustGivingSafeAddress.safeAddress,
                canSendTo: trustReceivingSafe.safeAddress,
            });

        }

        console.log("'" + omo1.safeOwner.address + "' is untrusting '" + context.local.inputs["trustReceiverSafe"].safeAddress + "'..")
        await removeTrustLineAsync(
            omo1.safeOwner,
            omo1.safe,
            context.local.inputs["trustReceiverSafe"]
        );
        console.log("'" + omo2.safeOwner.address + "' is untrusting '" + context.local.inputs["trustReceiverSafe"].safeAddress + "'..")
        await removeTrustLineAsync(
            omo2.safeOwner,
            omo2.safe,
            context.local.inputs["trustReceiverSafe"]
        );
        console.log("'" + omo3.safeOwner.address + "' is untrusting '" + context.local.inputs["trustReceiverSafe"].safeAddress + "'..")
        await removeTrustLineAsync(
            omo3.safeOwner,
            omo3.safe,
            context.local.inputs["trustReceiverSafe"]
        );

        console.log("SE: Initial trust removed");

        context.local.outputs["void"] = {};
    },
    canExecute: async context => true
};
