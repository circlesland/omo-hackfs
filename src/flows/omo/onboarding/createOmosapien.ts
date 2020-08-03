import { ProcessBuilder } from "../../../core/Flows/ProcessBuilder";
import { IProcessContext } from "../../../core/Flows/IProcessContext";

export function createOmosapien() {
    return new ProcessBuilder<IProcessContext>("flows:omo.onboarding.createOmosapien")
        .category("Welcome", (b) =>
        {
            b.step("flows:omo.onboarding.createOmosapien:intro1")
                .withQuant("OmoIntro", {
                    slide: {
                        title: "Welcome to Omo!"
                    }
                })
                .withTitle("Welcome to Omo!")

                .step("flows:omo.onboarding.createOmosapien:intro2")
                .withQuant("OmoIntro", {
                    slide: {
                        title: "This is the next page"
                    }
                })
                .withTitle("Welcome to Omo 2")
        }
        ).end()
        .category("Create Omosapien", b => {
                b
                .step("flows:omo.onboarding.createOmosapien:getName")
                    .withSideEffect("sideEffects:omo.shell.collectStepResult")
                    .mapOutput("stepResult", "name")
                    .withQuant("OmoInput")
                    .withPrompt("Name")
                    .withTitle("Give your dream a name")

                .step("flows:omo.onboarding.createOmosapien:generatePpk")
                .withSideEffect("sideEffects:omo.web3.generatePpk")
                .mapOutput("safeOwner", "safeOwner")
                .withTitle("Generate PPK")

                .step("flows:omo.onboarding.createOmosapien:generateSafe")
                .withSideEffect("sideEffects:omo.circles.generateSafe")
                .mapInput("safeOwner", "safeOwner")
                .mapOutput("safe", "safe")
                .withTitle("Generate Gnosis Safe")

                .step("flows:omo.onboarding.createOmosapien:giveInitialTrust")
                .withSideEffect("sideEffects:omo.circles.giveInitialTrust")
                .mapInput("safeOwner", "safeOwner")
                .mapInput("trustReceiverSafe", "safe")
                .withTitle("Give initial trust")

                .step("flows:omo.onboarding.createOmosapien:deploySafe")
                .withSideEffect("sideEffects:omo.safe.deploySafe")
                .mapInput("safeOwner", "safeOwner")
                .mapInput("safe", "safe")
                .withTitle("Deploy Safe")

                .step("flows:omo.onboarding.createOmosapien:deployToken")
                .withSideEffect("sideEffects:omo.safe.deployToken")
                .mapInput("safeOwner", "safeOwner")
                .mapInput("safe", "safe")
                .withTitle("Deploy Safe Token")

                .step("flows:omo.onboarding.createOmosapien:revokeInitialTrust")
                .withSideEffect("sideEffects:omo.circles.revokeInitialTrust")
                .mapInput("trustReceiverSafe", "safe")
                .withTitle("Revoke Trust")
        })
        .end()
        .build();
}
