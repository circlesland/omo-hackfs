import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export const giveTrust: ISideEffect<IProcessContext, void> = {
    _$schemaId: "sideEffects:omo.safe.giveTrust",
    inputs: [{
        name: "trustGivingSafeOwner",
        type: "schema:omo.safe.safeOwner"
    },{
        name: "trustGivingSafe",
        type: "schema:omo.safe.safe"
    },{
        name: "trustReceivingSafe",
        type: "schema:omo.safe.safe"
    }, {
        name: "trustPercentage",
        type: "schema:omo.number"
    }],
    outputs:[{
        name: "void",
        type: "schema:omo.void"
    }],
    execute: async (context, argument) =>
    {
        async function addTrustLineAsync(
            trustGivingSafeOwner,
            trustGivingSafe,
            trustReceivingSafe,
            trustPercentage
        )
        {
            // .. give user the permission to send their Token to you
            const trusted = await window.o.circlesCore.trust.addConnection(trustGivingSafeOwner, {
                canSendTo: trustGivingSafe.safeAddress,
                user: trustReceivingSafe,
                limitPercentage: trustPercentage
            });
            alert(JSON.stringify(trusted));
            return trusted;
        }

        if (!context.o.odentity.current)
        {
            throw new Error("context.o.odentity.current is not set in 'giveTrust' side effect.");
        }

        await addTrustLineAsync(
            context.inputs["trustGivingSafeOwner"],
            context.inputs["trustGivingSafe"],
            context.inputs["trustReceivingSafe"],
            context.inputs["trustPercentage"]
        );

        context.outputs["void"] = {};

    },
    canExecute: async context => true
};
