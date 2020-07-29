import {ProcessBuilder} from "../../ProcessBuilder";
import {giveTrust} from "./sideEffects/giveTrust";
import {collectUserValue} from "./sideEffects/collectUserValue";
import {IProcessContext} from "../../IProcessContext";
import {Quantum} from "../../../Quantum";

export class TrustContext implements IProcessContext
{
    readonly o: Quantum;
    readonly stepId: string;

    get trustGivingSafeOwner():{ address: string, privateKey: string }|undefined {
        if (!this.o.odentity.current)
            throw new Error("Fuckup!")
        return this.o.odentity.current.circleSafeOwner;
    };
    get trustGivingSafe(): string|undefined {
        if (!this.o.odentity.current)
            throw new Error("Fuckup!")
        if (!this.o.odentity.current.circleSafe)
            throw new Error("Fuckup2!")
        return this.o.odentity.current.circleSafe.safeAddress;
    };
    get trustReceivingSafe():string|undefined {
        return this["omo.safe.giveTrust:collectTrustReceivingSave"];
    };
    get trustPercentage():string|undefined {
        return this["omo.safe.giveTrust:collectTrustReceivingSave"];
    };

    constructor(o: Quantum, stepId:string)
    {
        this.o = o ;
        this.stepId = stepId;
    }
}

export function trust()
{
    return new ProcessBuilder<TrustContext>("omo.safe.giveTrust")
        .category("Trust someone", cat => cat
            .step("omo.safe.giveTrust:collectTrustReceivingSave")
                .withTitle("Enter safe address to giveTrust")
                .withQuant("OmoSafeLookup")
                .withSideEffect(collectUserValue)
            .step("omo.safe.giveTrust:collectTrustPercentage")
                .withTitle("Enter giveTrust percentage")
                .withQuant("OmoSafeLookup")
                .withSideEffect(collectUserValue)
            .step("omo.safe.giveTrust:giveTrust")
                .withTitle("Review & confirm")
                .withQuant("OmoSafeLookup")
                .withSideEffect(giveTrust)
        )
        .build();
}
