import {ProcessBuilder} from "../../../../Core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../../Core/Flows/IProcessContext";

export function giveTrustFlow()
{
    return new ProcessBuilder<IProcessContext>("omo.safe.giveTrustFlow")
        .category("Trust someone", build =>
            build

            .step("omo.safe.giveTrustFlow:trustReceivingSafe")
                .withSideEffect("omo.shell.collectUserValue")
                .withQuant("OmoSafeLookup")
                .withTitle("Enter safe address to giveTrust")

            .step("omo.safe.giveTrustFlow:trustPercentage")
                .withSideEffect("omo.shell.collectUserValue")
                .withQuant("OmoSafeLookup")
                .withTitle("Enter giveTrust percentage")

            .step("omo.safe.giveTrustFlow:giveTrust")
                .withSideEffect("omo.safe.giveTrust")
                .withQuant("OmoStatusResponse")
                .withTitle("Review & confirm")
        )
        .end()
        .build();
}
