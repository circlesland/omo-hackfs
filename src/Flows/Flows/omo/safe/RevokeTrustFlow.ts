import {ProcessBuilder} from "../../../../Core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../../Core/Flows/IProcessContext";

export function revokeTrustFlow()
{
    return new ProcessBuilder<IProcessContext>("omo.safe.revokeTrustFlow")
        .category("Trust someone", build =>
            build

            .step("omo.safe.giveTrust:trustReceivingSafe")
                .withSideEffect("omo.shell.collectUserValue")
                .withQuant("OmoSafeLookup")
                .withTitle("Enter safe address to un-trust")

            .step("omo.safe.giveTrust:revokeTrust")
                .withSideEffect("omo.safe.revokeTrust")
                .withQuant("OmoStatusResponse")
                .withTitle("Review & confirm")
        )
        .end()
        .build();
}
