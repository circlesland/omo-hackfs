import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export const deploySafe: ISideEffect<IProcessContext, void> = {
    $_schemaId: "sideEffects:omo.safe.giveTrust",
    inputs: [{
        name: "safeOwner",
        type: "schema:omo.safe.safeOwner"
    },{
        name: "safe",
        type: "schema:omo.safe.safe"
    }],
    outputs:[{
        name: "void",
        type: "schema:omo.void"
    }],
    execute: async (context, argument) =>
    {
        async function addTrustLineAsync(
            safeOwner,
            safe
        )
        {
            //  Check if we have enough giveTrust connections
            const trustReturn = await window.o.circlesCore.trust.isTrusted(safeOwner, safe);

            if (!trustReturn.isTrusted) {
                throw new Error("The safe isn't trusted enough to be deployed. Current connections: " + trustReturn.trustConnections + ", required: 3");
            }

            await window.o.circlesCore.safe.deploy(safeOwner, safe);
        }

        await addTrustLineAsync(
            context.inputs["safeOwner"],
            context.inputs["safe"]
        );

        context.outputs["void"] = {};
    },
    canExecute: async context => true
};
