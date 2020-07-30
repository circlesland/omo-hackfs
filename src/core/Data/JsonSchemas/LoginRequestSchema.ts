import { JSONSchema } from "@textile/threads-database";
export const LoginRequestSchema: JSONSchema = {
    $id: "https://example.com/loginrequest.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "LoginRequest",
    type: "object",
    required: ["_id"],
    properties: {
        _id: {
            type: "string",
        },
        odentityProviderId: {
            type: "string",
        },
        timestamp: {
            type: "string",
        },
        verified: {
            type: "boolean"
        },
    },
};