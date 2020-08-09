import {JSONSchema} from "@textile/threads-database";

export const Safe: JSONSchema = {
  $id: "https://example.com/omo.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  _$schemaId: "schema:omo.safe",
  title: "safe",
  type: "object",
  required: ["_id"],
  properties: {
    _id: {
      type: "string",
    }
  },
};
