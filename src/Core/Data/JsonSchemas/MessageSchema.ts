import { JSONSchema } from "@textile/threads-database";
import { ModelQuant } from "../ModelQuant";

export const MessageSchema: JSONSchema = {
    $id: "https://example.com/message.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Message",
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
        date: {
            type: "string"
        }
    },
};