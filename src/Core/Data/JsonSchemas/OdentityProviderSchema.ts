import { JSONSchema } from "@textile/threads-database";
export const OdentityProviderSchema: JSONSchema = {
    $id: "https://example.com/identityprovider.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "OdentityProvider",
    type: "object",
    required: ["_id"],
    properties: {
        _id: {
            type: "string",
        },
        odentityId: {
            type: "string",
        },
        type: {
            type: "string",
        },
        externalReference: {
            type: "string"
        }
    },
};