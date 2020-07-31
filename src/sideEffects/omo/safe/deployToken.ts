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
        console.log("SE: deploy token..");
        console.log("Finished! safe: ", context.local.inputs["safe"])
        console.log("Finished! safeOwner: ", context.local.inputs["safeOwner"])
        async function addTrustLineAsync(
            safeOwner,
            safe
        )
        {
            let success = false;
            let triesLeft = 6;
            while (!success && triesLeft-- >= 0)
            {
                await new Promise(async (r) => {
                    setTimeout(async () => {
                        try
                        {
                            await window.o.circlesCore.token.deploy(safeOwner, safe);
                            success = true;
                            r();
                        }
                        catch (e)
                        {
                            success = false;
                            console.log("Deploying safe failed. Tries left:", e);
                            if (triesLeft <= 0) {
                                throw e;
                            }
                            r();
                        }
                    }, 10000);
                });
            }
        }

        await addTrustLineAsync(
            context.local.inputs["safeOwner"],
            context.local.inputs["safe"]
        );

        context.local.outputs["void"] = {};
        console.log("SE: deployed token");
        console.log("Finished! Safe: ", context.local.inputs["safe"]);
    },
    canExecute: async context => true
};
