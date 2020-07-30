import {ProcessBuilder} from "../../../Core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../Core/Flows/IProcessContext";

export function giveTrust()
{
    return new ProcessBuilder<IProcessContext>("flows:omo.safe.giveTrust")
        .category("Trust someone", build =>
            build

            .step("flows:omo.safe.giveTrust:trustReceivingSafe")
                .withSideEffect("sideEffects:omo.shell.collectStepResult")
                .withQuant("OmoSafeLookup")
                .withTitle("Enter safe address to giveTrust")

            .step("flows:omo.safe.giveTrust:trustPercentage")
                .withSideEffect("sideEffects:omo.shell.collectStepResult")
                .withQuant("OmoSafeLookup")
                .withTitle("Enter giveTrust percentage")

            .step("flows:omo.safe.giveTrust:giveTrust")
                .withSideEffect("sideEffects:omo.safe.giveTrust")
                .withQuant("OmoStatusResponse")
                .withTitle("Review & confirm")
        )
        .end()
        .build();
}
