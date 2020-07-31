import {ProcessBuilder} from "../../../core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export function addAuthProviderMailFlow() {
  return new ProcessBuilder<IProcessContext>("omo.safe.addAuthProviderMailFlow")
    .category("Connect email authentication", (build) =>
      build

        .step("omo.odentity.addAuthProviderMail")
        .withSideEffect("omo.shell.collectUserValue")
        .withQuant("OmoSafeLookup")
        .withTitle("Set email you want to connect")

        .step("omo.odentity.addAuthProviderMail")
        .withSideEffect("omo.shell.collectUserValue")
        .withQuant("MagicLogin")
        .withTitle("Wait for magic link")

        .step("omo.odentity.addAuthProviderMail")
        .withQuant("OmoStatusResponse")
        .withTitle("Welcome you are logged in")
    )
    .end()
    .build();
}

export function removeAuthProviderMailFlow() {
  return new ProcessBuilder<IProcessContext>("omo.safe.removeAuthProviderMailFlow")
    .category("Remove email authentication", (build) =>
      build

        .step("omo.odentity.removeAuthProviderMail")
        .withQuant("OmoSelect")
        .withTitle("Select email you want to remove")

        .step("omo.odentity.removeAuthProviderMail")
        .withQuant("OmoStatusResponse")
        .withTitle("Removed Email Successfully")
    )
    .end()
    .build();
}

export function addAuthProviderSeedPhraseFlow() {
  return new ProcessBuilder<IProcessContext>(
    "omo.safe.addAuthProviderSeedPhraseFlow"
  )
    .category("Add seedphrase authentication", (build) =>
      build

        .step("omo.odentity.addAuthProviderSeed")
        .withQuant("OmoSafeLookup")
        .withTitle("Connect (Circles) Seedphrase")

        .step("omo.odentity.addAuthProviderSeed")
        .withQuant("OmoStatusResponse")
        .withTitle("Added Seed successfully")
    )
    .end()
    .build();
}

export function removeAuthProviderSeedPhraseFlow() {
  return new ProcessBuilder<IProcessContext>(
    "omo.safe.removeAuthProviderSeedPhraseFlow"
  )
    .category("Remove email authentication", (build) =>
      build

        .step("omo.odentity.removeAuthProviderSeed")
        .withQuant("OmoSelect")
        .withTitle("Select Seed you want to remove")

        .step("omo.odentity.removeAuthProviderSeed")
        .withQuant("OmoStatusResponse")
        .withTitle("Removed Email Successfully")
    )
    .end()
    .build();
}
