import { JSONSchema } from "@textile/threads-database";

export const AuthorSchema: JSONSchema = {
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
