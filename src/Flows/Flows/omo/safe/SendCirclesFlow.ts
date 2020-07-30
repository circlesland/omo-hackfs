import {ProcessBuilder} from "../../../../Core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../../Core/Flows/IProcessContext";

export function sendCirclesFlow()
{
    return new ProcessBuilder<IProcessContext>("omo.safe.sendCirclesFlow")
        .category("Trust someone", build =>
            build

            .step("omo.safe.sendCirclesFlow:receivingSafe")
                .withSideEffect("omo.shell.collectUserValue")
                .withQuant("OmoSafeLookup")
                .withTitle("Enter the address of the safe you want to send Circles to.")

            .step("omo.safe.sendCirclesFlow:amount")
                .withSideEffect("omo.shell.collectUserValue")
                .withQuant("OmoSafeLookup")
                .withTitle("How much?")

            .step("omo.safe.sendCirclesFlow:sendCircles")
                .withSideEffect("omo.safe.sendCircles")
                .withQuant("OmoStatusResponse")
                .withTitle("Review & confirm")
        )
        .end()
        .build();
}
