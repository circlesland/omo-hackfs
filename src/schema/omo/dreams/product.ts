import {JSONSchema} from "@textile/threads-database";
import {ModelQuant} from "../../../core/Data/ModelQuant";

export const Product: JSONSchema = {
  $id: "https://example.com/message.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  _$schemaId: "schema:omo.dreams.product",
  title: "product",
  type: "object",
  required: ["_id"],
  definitions: ModelQuant.definitons,
  properties: {
    _id: {
      type: "string"
    },
    name: {
      type: "string"
    },
    description: {
      type: "string"
    },
    creator: {
      $ref: "#/definitions/oneToOne",
      description: "Omosapien"
    },
    dream: {
      $ref: "#/definitions/oneToOne",
      description: "Dream"
    },
    price: {
      type: "string"
    },
    safeAddress: {
      type: "string"
    },
    subscriptions: {
      $ref: "#/definitions/oneToMany",
      description: "ProductSubscription"
    }
  }
};
