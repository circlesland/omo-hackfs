import { JSONSchema7 } from "json-schema";

export const QuantSchema: JSONSchema7 = {
  $id: "https://example.com/quant.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Library",
  type: "object",
  required: ["_id"],
  properties: {
    _id: {
      type: "string",
      description: "The instance's id.",
    },
    name: {
      type: "string",
      description: "name for displaying in views",
    },
    icon: {
      type: "string",
      description: "icon for displaying in views",
    },
    jsonSchema: {
      type: "string",
      description: "json-schema as string registering in textile",
    },
    collectionName: {
      type: "string",
      description: "name for register schema in threadDB",
    },
  },
};

export const LibrarySchema: JSONSchema7 = {
  $id: "https://example.com/person.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Library",
  type: "object",
  required: ["_id"],
  properties: {
    _id: {
      type: "string",
      description: "The instance's id.",
    },
    name: {
      type: "string",
      description: "Branch Name",
    },
    dummy1: {
      type: "string",
      description: "Branch Name",
    },
    dumm2: {
      type: "string",
      description: "Branch Name",
    },
  },
};

export const BookSchema: JSONSchema7 = {
  $id: "https://example.com/person.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Book",
  type: "object",
  required: ["_id"],
  properties: {
    _id: {
      type: "string",
      description: "The instance's id.",
    },
    name: {
      type: "string",
      description: "The book title",
    },
  },
};

export const AuthorSchema: JSONSchema7 = {
  $id: "https://example.com/person.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Author",
  type: "object",
  required: ["_id"],
  properties: {
    _id: {
      type: "string",
      description: "The instance's id.",
    },
    name: {
      type: "string",
      description: "The book title",
    },
  },
};

export const OmoSchema: JSONSchema7 = {
  $id: "https://example.com/omo.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Omo",
  type: "object",
  required: ["_id"],
  properties: {
    _id: {
      type: "string",
    },
    firstname: {
      type: "string",
    },
    lastname: {
      type: "string",
    },
    profileImage: {
      type: "string",
    },
  },
};
export const IdentityProviderSchema: JSONSchema7 = {
  $id: "https://example.com/identityprovider.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "IdentityProvider",
  type: "object",
  required: ["_id"],
  properties: {
    _id: {
      type: "string",
    },
    omoid: {
      type: "string",
    },
    type: {
      type: "string",
    },
    externalReference: {
      type: "string",
    },
  },
};

export const LoginRequestSchema: JSONSchema7 = {
  $id: "https://example.com/loginrequest.schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "LoginRequest",
  type: "object",
  required: ["_id"],
  properties: {
    _id: {
      type: "string",
    },
    omoProviderId: {
      type: "string",
    },
    timestamp: {
      type: "string",
    },
    verified: {
      type: "boolean",
    },
  },
};
