import {ProcessBuilder} from "../../../core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export function createDream()
{
    return new ProcessBuilder<IProcessContext>("flows:omo.dreams.createDream")
        .category("Trust someone", build =>
            build
                .step("flows:omo.dreams.createDream:getName")
                    .withSideEffect("sideEffects:omo.shell.collectStepResult")
                    .mapOutput("stepResult", "dreamName")
                    .withQuant("OmoInput")
                    .withPrompt("Name")
                    .withTitle("Give your dream a name")

                .step("flows:omo.dreams.createDream:createdDream")
                    .mapInput("name", "dreamName")
                    .withSideEffect("sideEffects:omo.dreams.createDream")

                .step("flows:omo.dreams.createDream:generatePpk")
                    .withSideEffect("sideEffects:omo.web3.generatePpk")
                    .mapOutput("safeOwner", "safeOwner")

                .step("flows:omo.dreams.createDream:generateSafe")
                    .withSideEffect("sideEffects:omo.circles.generateSafe")
                    .mapInput("safeOwner", "safeOwner")
                    .mapOutput("safe", "safe")

                .step("flows:omo.dreams.createDream:giveInitialTrust")
                    .withSideEffect("sideEffects:omo.circles.giveInitialTrust")
                    .mapInput("safeOwner", "safeOwner")
                    .mapInput("trustReceiverSafe", "safe")

                .step("flows:omo.dreams.createDream:deploySafe")
                    .withSideEffect("sideEffects:omo.safe.deploySafe")
                    .mapInput("safeOwner", "safeOwner")
                    .mapInput("safe", "safe")

                .step("flows:omo.dreams.createDream:deployToken")
                    .withSideEffect("sideEffects:omo.safe.deployToken")
                    .mapInput("safeOwner", "safeOwner")
                    .mapInput("safe", "safe")

                .step("flows:omo.dreams.createDream:revokeInitialTrust")
                    .withSideEffect("sideEffects:omo.circles.revokeInitialTrust")
                    .mapInput("trustReceiverSafe", "safe")
        )
        .end()
        .build();
}
