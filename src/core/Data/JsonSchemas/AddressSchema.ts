import { JSONSchema } from "@textile/threads-database";

export const AddressSchema: JSONSchema = {
    $id: "https://example.com/address.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Address",
    type: "object",
    required: ["_id"],
    // definitions: ModelQuant.definitons,
    properties: {
        _id: {
            type: "string",
        },
        street: {
            type: "string",
        },
        zipcode: {
            type: "string",
        },
        city: {
            type: "string",
        },
    },
};