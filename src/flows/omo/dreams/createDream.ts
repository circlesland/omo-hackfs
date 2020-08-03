import {ProcessBuilder} from "../../../core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export function createDream()
{
  return new ProcessBuilder<IProcessContext>("flows:omo.dreams.createDream")
    .category("Create dream", (build) =>
      build
        .step("flows:omo.dreams.createDream:getName")
        .withSideEffect("sideEffects:omo.shell.collectStepResult")
        .mapOutput("stepResult", "dreamName")
        .withQuant("OmoInput")
        .withPrompt("Name")
        .withTitle("Give your dream a name")
    )
    .end()
    .category("Show Details", (b) =>
    {
      b

        /*
        .step("flows:omo.dreams.createDream:generatePpk")
        .withSideEffect("sideEffects:omo.web3.generatePpk")
        .mapOutput("safeOwner", "safeOwner")
        .withTitle("Generate PPK")
        */

        .step("flows:omo.dreams.createDream:generateSafe")
        .withSideEffect("sideEffects:omo.circles.generateSafe")
        .mapInput("safeOwner", "currentSafeOwner")
        .mapOutput("safe", "safe")
        .withTitle("Generate Gnosis Safe")

        .step("flows:omo.dreams.createDream:createDream")
        .withQuant("OmoLoading")
        .mapInput("name", "dreamName")
        .mapInput("safe", "safe")
        .isNonInteractive()
        .withSideEffect("sideEffects:omo.dreams.createDream")
        .withTitle("Save dream to database")

        .step("flows:omo.dreams.createDream:giveInitialTrust")
        .withSideEffect("sideEffects:omo.circles.giveInitialTrust")
        .mapInput("safeOwner", "currentSafeOwner")
        .mapInput("trustReceiverSafe", "safe")
        .withTitle("Give initial trust")

        .step("flows:omo.dreams.createDream:deploySafe")
        .withSideEffect("sideEffects:omo.safe.deploySafe")
        .mapInput("safeOwner", "currentSafeOwner")
        .mapInput("safe", "safe")
        .withTitle("Deploy Safe")

        .step("flows:omo.dreams.createDream:deployToken")
        .withSideEffect("sideEffects:omo.safe.deployToken")
        .mapInput("safeOwner", "currentSafeOwner")
        .mapInput("safe", "safe")
        .withTitle("Deploy Safe Token")

        .step("flows:omo.dreams.createDream:revokeInitialTrust")
        .withSideEffect("sideEffects:omo.circles.revokeInitialTrust")
        .mapInput("trustReceiverSafe", "safe")
        .withTitle("Revoke Trust");


    })
    .end()
    .build();
}
