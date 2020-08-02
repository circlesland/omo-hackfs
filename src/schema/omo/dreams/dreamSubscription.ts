import {JSONSchema} from "@textile/threads-database";
import {ModelQuant} from "../../../core/Data/ModelQuant";

export const DreamSubscription: JSONSchema = {
    $id: "https://example.com/message.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    _$schemaId: "schema:omo.dreams.dreamSubscription",
    title: "dreamSubscription",
    type: "object",
    required: ["_id"],
    definitions: ModelQuant.definitons,
    properties: {
        _id: {
            type: "string"
        },
        creator: {
            $ref: "#/definitions/oneToOne",
            description: "Omosapien"
        }
    }
};
