import {JSONSchema} from "@textile/threads-database";

export const Transaction: JSONSchema = {
  $id: "https://example.com/omo.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  _$schemaId: "schema:omo.transaction",
  title: "transaction",
  type: "object",
  required: ["_id"],
  properties: {
    _id: {
      type: "string",
    }
  },
};
