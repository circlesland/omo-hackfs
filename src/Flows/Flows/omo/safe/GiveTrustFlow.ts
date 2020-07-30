import {ProcessBuilder} from "../../../../Core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../../Core/Flows/IProcessContext";

export function giveTrustFlow()
{
    return new ProcessBuilder<IProcessContext>("omo.safe.giveTrustFlow")
        .category("Trust someone", build =>
            build

            .step("omo.safe.giveTrust:trustReceivingSafe")
                .withSideEffect("omo.shell.collectUserValue")
                .withQuant("OmoSafeLookup")
                .withTitle("Enter safe address to giveTrust")

            .step("omo.safe.giveTrust:trustPercentage")
                .withSideEffect("omo.shell.collectUserValue")
                .withQuant("OmoSafeLookup")
                .withTitle("Enter giveTrust percentage")

            .step("omo.safe.giveTrust:giveTrust")
                .withSideEffect("omo.safe.giveTrust")
                .withQuant("OmoStatusResponse")
                .withTitle("Review & confirm")
        )
        .end()
        .build();
}
