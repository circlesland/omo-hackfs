import {JSONSchema} from "@textile/threads-database";
import {ModelQuant} from "../../../../textile-graphql/src/data/modelQuant";

export const Safe: JSONSchema = {
  $id: "https://example.com/message.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  _$schemaId: "schema:omo.safe.safe",
  title: "safe",
  type: "object",
  required: ["_id"],
  definitions: ModelQuant.definitons,
  properties: {
    _id: {
      type: "string",
    },
    address: {
      type: "string",
    }
  },
};
