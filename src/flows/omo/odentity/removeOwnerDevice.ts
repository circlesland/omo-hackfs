import {ProcessBuilder} from "../../../core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export function removeOwnerDeviceFlow() {
    return new ProcessBuilder<IProcessContext>("omo.safe.removeOwnerDeviceFlow")
        .category("Remove owner device", (build) =>
            build

                .step("omo.odentity.removeOwnerDevice")
                .withSideEffect("omo.shell.collectUserValue")
                .withQuant("OmoSelect")
                .withTitle("Select device you want to remove")

                .step("omo.odentity.addOwnerDevice")
                .withSideEffect("omo.safe.giveTrust")
                .withQuant("OmoStatusResponse")
                .withTitle("Removed Owner Device")
        )
        .end()
        .build();
}
