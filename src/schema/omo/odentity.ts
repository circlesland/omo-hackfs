import {JSONSchema} from "@textile/threads-database";

export const Odentity: JSONSchema = {
  $id: "https://example.com/omo.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  _$schemaId: "schema:omo.odentity",
  title: "odentity",
  type: "object",
  required: ["_id"],
  properties: {
    _id: {
      type: "string",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    threadId: {
      type: "string",
    },
    profileImage: {
      type: "string"
    },
    cryptoIdentity: {
      type: "string"
    }
  },
};
