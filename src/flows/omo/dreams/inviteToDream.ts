import { ProcessBuilder } from "../../../core/Flows/ProcessBuilder";
import { IProcessContext } from "../../../core/Flows/IProcessContext";

export function inviteToDream() {
  return new ProcessBuilder<IProcessContext>("flows:omo.dreams.inviteToDream")
    .category("Invite someone to dream with you", (build) =>
      build
        .step("flows:omo.dreams.inviteToDream:getEmail")
        .withSideEffect("sideEffects:omo.shell.collectStepResult")
        .mapOutput("stepResult", "email")
        .withQuant("OmoInput")
        .withPrompt("E-mail address")
        .withTitle("Invite someone by email")

        .step("flows:omo.dreams.inviteToDream:getText")
        .withSideEffect("sideEffects:omo.shell.collectStepResult")
        .mapOutput("stepResult", "text")
        .withQuant("OmoInput")
        .withPrompt("Text")
        .withTitle("Write a short message to send with the invite")

        .step("flows:omo.dreams.inviteToDream:invite")
        .withQuant("OmoLoading")
        .mapInput("email", "email")
        .mapInput("text", "text")
        .isNonInteractive()
        .withSideEffect("sideEffects:omo.dreams.inviteToDream")
    ).end()
    .build();
}
