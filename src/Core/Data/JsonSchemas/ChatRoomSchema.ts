import { JSONSchema } from "@textile/threads-database";
import { ModelQuant } from "../ModelQuant";

export const ChatRoomSchema: JSONSchema = {
    $id: "https://example.com/ChatRoom.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "ChatRoom",
    type: "object",
    required: ["_id"],
    definitions: ModelQuant.definitons,
    properties: {
        _id: {
            type: "string",
        },
        name: {
            type: "string",
        },
        text: {
            type: "string",
        },
        messages: {
            $ref: "#/definitions/oneToMany",
            description: "Message"
        }
    },
};