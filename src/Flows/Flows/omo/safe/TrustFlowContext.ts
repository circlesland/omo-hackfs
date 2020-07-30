import {IProcessContext} from "../../../../Core/Flows/IProcessContext";
import {Quantum} from "../../../../Core/Quantum";

export class TrustFlowContext implements IProcessContext
{
    readonly o: Quantum;
    readonly stepId: string;

    get trustGivingSafeOwner():{ address: string, privateKey: string }|undefined {
        if (!this.o.odentity.current)
            throw new Error("No current odentity!")
        return this.o.odentity.current.circleSafeOwner;
    };
    get trustGivingSafe(): string|undefined {
        if (!this.o.odentity.current)
            throw new Error("No current odentity!")
        if (!this.o.odentity.current.circleSafe)
            throw new Error("No circleSafe on the current odentity!")
        return this.o.odentity.current.circleSafe.safeAddress;
    };
    get trustReceivingSafe():string|undefined {
        return this["omo.safe.giveTrust:trustReceivingSafe"];
    };
    get trustPercentage():string|undefined {
        return this["omo.safe.giveTrust:trustPercentage"];
    };

    constructor(o: Quantum, stepId:string)
    {
        this.o = o ;
        this.stepId = stepId;
    }
}
