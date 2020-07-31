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
