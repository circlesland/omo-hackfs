import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export const requestUbi:ISideEffect<IProcessContext, any> = {
    _$schemaId: "sideEffects:omo.circles.requestUbi",
    inputs: [{
        name: "safeOwner",
        type: "schema:omo.safe.safeOwner"
    },{
        name: "safe",
        type: "schema:omo.safe.safe"
    }],
    outputs: [{
        name: "void",
        type: "schema:omo.void"
    }],
    execute: async (context, argument) => {
        const payout = await window.o.circlesCore.token.requestUBIPayout(
            context.local.inputs["safeOwner"],
            context.local.inputs["safe"]);
        context.local.outputs["void"] = {};
    },
    canExecute: async context => true
};
