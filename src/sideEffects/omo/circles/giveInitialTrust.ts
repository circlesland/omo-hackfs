import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";
import {giveTrust} from "../safe/giveTrust";

export const giveInitialTrust: ISideEffect<IProcessContext, any> = {
    $_schemaId: "sideEffects:omo.circles.giveInitialTrust",
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

        async function addTrustLineAsync(
            trustGivingSafeOwner,
            trustGivingSafe,
            trustReceivingSafe,
            trustPercentage
        )
        {
            // .. give user the permission to send their Token to you
            await window.o.circlesCore.trust.addConnection(trustGivingSafeOwner, {
                canSendTo: trustGivingSafe.safeAddress,
                user: trustReceivingSafe,
                limitPercentage: trustPercentage
            });
        }

        await addTrustLineAsync(
            omo1.safeOwner,
            omo1.safe,
            context.inputs["trustReceiverSafe"],
            1,
        );
        await addTrustLineAsync(
            omo2.safeOwner,
            omo2.safe,
            context.inputs["trustReceiverSafe"],
            1,
        );
        await addTrustLineAsync(
            omo3.safeOwner,
            omo3.safe,
            context.inputs["trustReceiverSafe"],
            1,
        );

        context.outputs["void"] = {};
    },
    canExecute: async context => true
};
