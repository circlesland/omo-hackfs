import {JSONSchema} from "@textile/threads-database";

export const Group: JSONSchema = {
  $id: "https://example.com/omo.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  _$schemaId: "schema:omo.group",
  title: "group",
  type: "object",
  required: ["_id"],
  properties: {
    _id: {
      type: "string",
    },
    creator: {
      $ref: "#/definitions/oneToOne",
      description: "Odentity"
    },
    members: {
      $ref: "#/definitions/oneToMany",
      description: "Membership"
    },
    safe: {
      $ref: "#/definitions/oneToOne",
      description: "Safe"
    },
    city: {
      type: "string"
    },
    name: {
      type: "string"
    },
    description: {
      type: "string"
    }
  },
};
