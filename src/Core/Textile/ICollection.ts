import { Instance } from "@textile/threads-store";
import { QueryJSON } from "@textile/threads-client";
export interface ICollection<T extends Instance> {
    all(): Promise<T[]>;
    find(query: QueryJSON): Promise<T[]>;
    findById(id: string): Promise<T>;
    deleteCollection(): Promise<void>;
    truncate(): Promise<void>;
    create(value: T): Promise<T>;
    createMany(values: T[]): Promise<T[]>;
    save(value: T): Promise<T>;
    saveMany(values: T[]): Promise<T[]>;
    delete(value: T): Promise<void>;
    deleteMany(values: T[]): Promise<void>;
    deleteById(value: string): Promise<void>;
    deleteManyByIds(values: string[]): Promise<void>;
    observeUpdate(actionTypes: string[], id: string, callback: any): Promise<void>;
}
