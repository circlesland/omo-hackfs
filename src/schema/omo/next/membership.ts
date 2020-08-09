import {JSONSchema} from "@textile/threads-database";

export const Membership: JSONSchema = {
  $id: "https://example.com/omo.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  _$schemaId: "schema:omo.membership",
  title: "membership",
  type: "object",
  required: ["_id"],
  properties: {
    _id: {
      type: "string",
    },
    member: {
      $ref: "#/definitions/oneToOne",
      description: "Odentity"
    },
    group: {
      $ref: "#/definitions/manyToOne",
      description: "Group"
    },
    type: {
      type: "string",
      enum: ["owner"]
    }
  },
};
