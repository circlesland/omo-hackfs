import {ProcessBuilder} from "../../../core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export function addOwnerDeviceFlow() {
    return new ProcessBuilder<IProcessContext>("omo.odentity.addOwnerDeviceFlow")
        .category("Add new owner device", (build) =>
            build

                .step("omo.odentity.addOwnerDevice:createPPK")
                .withSideEffect("omo.shell.collectUserValue")
                .withQuant("OmoSafeLookup")
                .withTitle("Name the device you want to add")

                .step("omo.odentity.addOwnerDevice:createPPK")
                .withSideEffect("omo.shell.collectUserValue")
                .withQuant("OmoSafeLookup")
                .withTitle("Scan QR-Code with 2nd Device")

                .step("omo.odentity.addOwnerDevice")
                .withSideEffect("omo.safe.giveTrust")
                .withQuant("OmoStatusResponse")
                .withTitle("Added new Owner Device")
        )
        .end()
        .build();
}
