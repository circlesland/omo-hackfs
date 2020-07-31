import {ProcessBuilder} from "../../../core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export function transactionFlow() {
  return new ProcessBuilder<IProcessContext>("omo.safe.transactionFlow")
    .category("Transfer Circles", (build) =>
      build

        .step("omo.safe.transferCircles:transferRecipient")
        .withSideEffect("omo.shell.collectUserValue")
        .withQuant("OmoSafeLookup")
        .withTitle("Select Recipient")

        .step("omo.safe.giveTrust:transferAmount")
        .withSideEffect("omo.shell.collectUserValue")
        .withQuant("OmoSafeLookup")
        .withTitle("Choose Amount")

        .step("omo.safe.giveTrust:transactionCheck")
        .withQuant("OmoStatusResponse")
        .withTitle("Check submission")

        .step("omo.safe.giveTrust:transactionSend")
        .withSideEffect("omo.safe.giveTrust")
        .withQuant("OmoStatusResponse")
        .withTitle("Successfully send circles")
    )
    .end()
    .build();
}
