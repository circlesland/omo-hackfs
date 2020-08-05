import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";
import {Rooms} from "../../../mutations/omo/chat/rooms";

export const createChatRoom: ISideEffect<IProcessContext, any> = {
  _$schemaId: "sideEffects:omo.chat.createChatRoom",
  inputs: [{
    name: "name",
    type: "schema:omo.string"
  }],
  outputs: [{
    name: "void",
    type: "schema:omo.void"
  }],
  execute: async (context, argument) =>
  {
    const chatRoomName = context.local.inputs["name"];
    await Rooms.createNewRoom(chatRoomName);
    context.local.outputs["void"] = {};
  },
  canExecute: async context => true
};
