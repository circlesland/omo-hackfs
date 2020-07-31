import {ProcessBuilder} from "../../../core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export function addAuthProviderSeedPhrase() {
    return new ProcessBuilder<IProcessContext>(
        "omo.safe.addAuthProviderSeedPhrase"
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
