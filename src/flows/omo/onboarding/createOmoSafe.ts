import {ProcessBuilder} from "../../../core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export function createOmoSafe()
{
    return new ProcessBuilder<IProcessContext>("flows:omo.onboarding.createOmoSafe")
        .category("Trust someone", build =>
            build

                .step("flows:omo.onboarding.createOmoSafe:generatePpk")
                    .withSideEffect("sideEffects:omo.web3.generatePpk")

                .step("flows:omo.onboarding.createOmoSafe:generateSafe")
                    .withSideEffect("sideEffects:omo.circles.generateSafe")

                .step("flows:omo.onboarding.createOmoSafe:giveInitialTrust")
                    .withSideEffect("sideEffects:omo.circles.giveInitialTrust")
        )
        .withQuant("OmoIntro")
        .end()
        .build();
}
