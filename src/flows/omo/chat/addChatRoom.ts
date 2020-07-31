import {ProcessBuilder} from "../../../core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export function addChatRoomFlow() {
    return new ProcessBuilder<IProcessContext>("omo.chat.addChatRoomFlow")
        .category("Add new chat room", (build) =>
            build

                .step("omo.chat.addChatRoomFlow")
                .withSideEffect("omo.shell.collectUserValue")
                .withQuant("OmoSafeLookup")
                .withTitle("Name the chat room")
        )
        .end()
        .build();
}
