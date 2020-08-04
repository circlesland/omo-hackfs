import {JSONSchema} from "@textile/threads-database";
import {ModelQuant} from "../../../core/Data/ModelQuant";

export const ProductSubscription: JSONSchema = {
  $id: "https://example.com/message.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  _$schemaId: "schema:omo.dreams.productSubscription",
  title: "productSubscription",
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
