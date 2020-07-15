import { JSONSchema7 } from "json-schema";
import { ModelQuant } from "../Core/Data/ModelQuant";


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
            description: "name for displaying in views"
        },
        icon: {
            type: "string",
            description: "icon for displaying in views"
        },
        jsonSchema: {
            type: "string",
            description: "json-schema as string registering in textile"
        },
        collectionName: {
            type: "string",
            description: "name for register schema in threadDB"
        }
    }
};

export const LibrarySchema: JSONSchema7 = {
    $id: "https://example.com/person.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Library",
    type: "object",
    required: ["_id"],
    // definitions: ModelQuant.definitons,
    properties: {
        _id: {
            type: "string",
            description: "The instance's id.",
        },
        name: {
            type: "string",
            description: "Branch Name",
        }
    },
};

export const BookSchema = {
    $id: "https://example.com/person.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Book",
    type: "object",
    required: ["_id"],
    // definitions: ModelQuant.definitons,
    properties: {
        _id: {
            type: "string",
            description: "The instance's id.",
        },
        name: {
            type: "string",
            description: "The book title",
        }
    },
};

export const AuthorSchema = {
    $id: "https://example.com/person.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Author",
    type: "object",
    required: ["_id"],
    // definitions: ModelQuant.definitons,
    properties: {
        _id: {
            type: "string",
            description: "The instance's id.",
        },
        name: {
            type: "string",
            description: "The book title",
        },
        books: {
            $ref: "#/definitions/oneToMany",
            description: "Book"
        }
    }
};
export const AddressSchema: JSONSchema7 = {
    $id: "https://example.com/address.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Address",
    type: "object",
    required: ["_id"],
    // definitions: ModelQuant.definitons,
    properties: {
        _id: {
            type: "string",
        },
        street: {
            type: "string",
        },
        zipcode: {
            type: "string",
        },
        city: {
            type: "string",
        },
    },
};

export const ProcessSchema: JSONSchema7 = {
    $id: "https://example.com/address.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Process",
    type: "object",
    required: ["_id"],
    // definitions: ModelQuant.definitons,
    properties: {
        _id: {
            type: "string",
        },
        name: {
            type: "string",
        },
        steps: {
            $ref: "#/definitions/oneToMany",
            description: "Step"
        }
    },
};
export const StepSchema: JSONSchema7 = {
    $id: "https://example.com/address.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Step",
    type: "object",
    required: ["_id"],
    // definitions: ModelQuant.definitons,
    properties: {
        _id: {
            type: "string",
        },
        name: {
            type: "string",
        }
    },
};
export const DreamSchema: JSONSchema7 = {
    $id: "https://example.com/address.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Dream",
    type: "object",
    required: ["_id"],
    // definitions: ModelQuant.definitons,
    properties: {
        _id: {
            type: "string",
        },
        first: {
            type: "string",
        },
        last: {
            type: "string",
        },
        city: {
            type: "string",
        },
        image: {
            type: "string",
        },
        profile: {
            type: "string",
        },
        dream: {
            type: "string",
        },
        link: {
            type: "string",
        },
        follower: {
            type: "string",
        },
    },
};
export const OdentitySchema: JSONSchema7 = {
    $id: "https://example.com/omo.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Odentity",
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
export const OdentityProviderSchema: JSONSchema7 = {
    $id: "https://example.com/identityprovider.schema.json",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "OdentityProvider",
    type: "object",
    required: ["_id"],
    properties: {
        _id: {
            type: "string",
        },
        odentityId: {
            type: "string",
        },
        type: {
            type: "string",
        },
        externalReference: {
            type: "string"
        }
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
        odentityProviderId: {
            type: "string",
        },
        timestamp: {
            type: "string",
        },
        verified: {
            type: "boolean"
        },
    },
};