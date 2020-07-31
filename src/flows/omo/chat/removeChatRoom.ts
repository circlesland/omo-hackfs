import {ProcessBuilder} from "../../../core/Flows/ProcessBuilder";
import {IProcessContext} from "../../../core/Flows/IProcessContext";

export function removeChatRoomFlow() {
    return new ProcessBuilder<IProcessContext>("omo.chat.removeChatRoomFlow")
        .category("Remove Chat Room", (build) =>
            build

                .step("omo.chat.removeChatRoom")
                .withSideEffect("omo.shell.collectUserValue")
                .withQuant("OmoSelect")
                .withTitle("Select chat room you want to remove")

                .step("omo.chat.removeChatRoom")
                .withSideEffect("omo.safe.giveTrust")
                .withQuant("OmoStatusResponse")
                .withTitle("Removed Chat Room")
        )
        .end()
        .build();
}
