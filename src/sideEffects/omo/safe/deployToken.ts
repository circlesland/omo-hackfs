import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export const deployToken: ISideEffect<IProcessContext, void> = {
    _$schemaId: "sideEffects:omo.safe.deployToken",
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
            await window.o.circlesCore.token.deploy(safeOwner, safe);
        }

        await addTrustLineAsync(
            context.inputs["safeOwner"],
            context.inputs["safe"]
        );

        context.outputs["void"] = {};
    },
    canExecute: async context => true
};
