import {ProcessBuilder} from "../../../core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export function revokeTrust()
{
    return new ProcessBuilder<IProcessContext>("flows:omo.safe.revokeTrust")
        .category("Trust someone", build =>
            build

            .step("flows:omo.safe.revokeTrust:trustReceivingSafe")
                .withSideEffect("sideEffects:omo.shell.collectStepResult")
                .withQuant("OmoSafeLookup")
                .withTitle("Enter safe address to un-trust")

            .step("flows:omo.safe.revokeTrust:revokeTrust")
                .withSideEffect("sideEffects:omo.safe.revokeTrust")
                .withQuant("OmoStatusResponse")
                .withTitle("Review & confirm")
        )
        .end()
        .build();
}
