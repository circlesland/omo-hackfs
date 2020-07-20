import { Instance } from "@textile/threads-store";
import { KeyInfo, Database, Collection, JSONSchema } from "@textile/hub";
import Client, { QueryJSON } from "@textile/threads-client";
import { ICollection } from "./ICollection";

export class LocalCollection<T extends Instance> implements ICollection<T> {
    private collection: Collection<any>;
    collectionName: string;


    constructor(collectionName: string, database: Database) {
        this.collectionName = collectionName;
        if (!database.collections.has(collectionName)) throw new Error(`Collection "${collectionName}" not found in database`);
        this.collection = database.collections.get(collectionName) as Collection<any>;
    }

    async all(): Promise<T[]> {
        throw new Error("Method not implemented.");
    }

    async find(query: QueryJSON): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
    async     deleteCollection(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async     truncate(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async     create(value: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    async     createMany(values: T[]): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    async     save(value: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    async     saveMany(values: T[]): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    async     delete(value: T): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async     deleteMany(values: T[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async     deleteById(value: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async     deleteManyByIds(values: string[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async     observeUpdate(actionTypes: string[], id: string, callback: any): Promise<void> {
        throw new Error("Method not implemented.");
    }


}
