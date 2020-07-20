import { QuantRegistry } from "../Quant/QuantRegistry";
import { JSONSchema } from "@textile/hub";
import { LibrarySchema } from "./JsonSchemas/LibrarySchema";
import { BookSchema } from "./JsonSchemas/BookSchema";
import { AuthorSchema } from "./JsonSchemas/AuthorSchema";
export interface SeedQuant {
    name: string,
    schema: JSONSchema,
    data: any[]
}
interface Seed {
    thread: {
        name: string,
        quanta: SeedQuant[]
    }
}

const seeds: Seed[] = [{
    thread: {
        name: "quanta", quanta: [
            {
                name: "Library",
                schema: LibrarySchema,
                data: []
            },
            {
                name: "Book",
                schema: BookSchema,
                data: []
            },
            {
                name: "Author",
                schema: AuthorSchema,
                data: []
            },
        ]
    }
}];

export class Seeder {
    async createCollections(registry: QuantRegistry) {
        console.log("create collections");

        for (let seed of seeds) {
            await registry.RegisterSeedQuanta(seed.thread.quanta);
        }

        console.log("end create collections");
    }
}