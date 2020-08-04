import {JSONSchema} from "@textile/threads-database";
import {ModelQuant} from "../../../core/Data/ModelQuant";

export const Dream: JSONSchema = {
  $id: "https://example.com/message.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  _$schemaId: "schema:omo.dreams.dream",
  title: "dream",
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
    safeAddress: {
      type: "string"
    },
    /**
     *
     */
    leap: {
      type: "string"
    },
    timeCommitments: {
      $ref: "#/definitions/oneToMany",
      description: "TimeCommitment"
    },
    subscriptions: {
      $ref: "#/definitions/oneToMany",
      description: "DreamSubscription"
    },
    reservations: {
      $ref: "#/definitions/oneToMany",
      description: "Reservation"
    }
  }
};
