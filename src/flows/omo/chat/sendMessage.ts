import {ProcessBuilder} from "../../../core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export function sendMessageFlow() {
    return new ProcessBuilder<IProcessContext>("omo.chat.sendMessageFlow")
        .category("Add new message", (build) =>
            build

                .step("omo.chat.sendMessage")
                .withSideEffect("omo.shell.collectUserValue")
                .withQuant("OmoSafeLookup")
                .withTitle("Send message")
        )
        .end()
        .build();
}
