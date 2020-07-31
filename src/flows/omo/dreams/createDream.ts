import {ProcessBuilder} from "../../../core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export function createDream()
{
    return new ProcessBuilder<IProcessContext>("flows:omo.dreams.createDream")
        .category("Trust someone", build =>
            build
                .step("flows:omo.dreams.createDream:getName")
                    .withQuant("OmoInput")
                    .withPrompt("Name")
                    .withTitle("Give your dream a name")
                    .withSideEffect("sideEffects:omo.shell.collectStepResult")

                .step("flows:omo.dreams.createDream:generatePpk")
                    .withSideEffect("sideEffects:omo.web3.generatePpk")

                .step("flows:omo.dreams.createDream:generateSafe")
                    .withSideEffect("sideEffects:omo.circles.generateSafe")

                .step("flows:omo.dreams.createDream:giveInitialTrust")
                    .withSideEffect("sideEffects:omo.circles.giveInitialTrust")

                .step("flows:omo.dreams.createDream:deploySafe")
                    .withSideEffect("sideEffects:omo.safe.deploySafe")

                .step("flows:omo.dreams.createDream:deployToken")
                    .withSideEffect("sideEffects:omo.safe.deployToken")
        )
        .end()
        .build();
}
