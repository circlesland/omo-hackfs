import { JSONSchema } from "@textile/threads-database";

export const EventSchema: JSONSchema = {
    $id: "https://example.com/address.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Notification",
    type: "object",
    required: ["_id"],
    // definitions: ModelQuant.definitons,
    properties: {
        _id: {
            type: "string"
        },
        timestamp: {
            type: "string"
        },
        data: {
            type: "any"
        }
    },
};
