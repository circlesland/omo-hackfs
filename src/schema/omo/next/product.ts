import {JSONSchema} from "@textile/threads-database";

export const Product: JSONSchema = {
  $id: "https://example.com/omo.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  _$schemaId: "schema:omo.product",
  title: "product",
  type: "object",
  required: ["_id"],
  properties: {
    _id: {
      type: "string",
    },
    name: {
      type: "string"
    },
    description: {
      type: "string"
    },
    vendor: {
      $ref: "#/definitions/manyToOne",
      description: "Group"
    },
    phase: {
      type: "string",
      enum: ["reservation", "preorder", "available", "endoflife"]
    }
  },
};
