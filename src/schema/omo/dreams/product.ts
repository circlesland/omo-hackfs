import {JSONSchema} from "@textile/threads-database";
import {ModelQuant} from "../../../core/Data/ModelQuant";

export const Product: JSONSchema = {
  $id: "https://example.com/message.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  _$schemaId: "schema:omo.product",
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
    category: {
      type: "string"
    },
    description: {
      type: "string"
    },
    creatorId: {
      type: "string"
    },
    city: {
      type: "string"
    },
    /**
     * The following properties are only valid when the dream's state is 'product'
     */
    price: {
      type: "string"
    },
    pictureHash: {
      type: "string"
    }
  }
};
