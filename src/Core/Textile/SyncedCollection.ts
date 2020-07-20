import { Instance } from "@textile/threads-store";
import { ICollection } from "./ICollection";
import { RemoteCollection } from "./RemoteCollection";
import { LocalCollection } from "./LocalCollection";
import { QueryJSON } from "@textile/threads-client";

export class SyncedCollection<T extends Instance> implements ICollection<T> {
    localCollection: LocalCollection<T>;
    remoteCollection: RemoteCollection<T>;

    constructor(localCollection: LocalCollection<T>, remoteCollection: RemoteCollection<T>) {
        this.localCollection = localCollection;
        this.remoteCollection = remoteCollection;
    }
    async all(): Promise<T[]> {
        // return await this.localCollection.all();
        return await this.remoteCollection.all();
    }
    async find(query: QueryJSON): Promise<T[]> {
        // return await this.localCollection.find(query);
        return await this.remoteCollection.find(query);
    }
    async findById(id: string): Promise<T> {
        // return await this.localCollection.findById(id);
        return await this.remoteCollection.findById(id);
    }
    async deleteCollection(): Promise<void> {
        return await this.remoteCollection.deleteCollection();
        // return await this.localCollection.deleteCollection();
    }
    async truncate(): Promise<void> {
        return await this.remoteCollection.truncate();
        // return await this.localCollection.truncate();
    }
    async     create(value: T): Promise<T> {
        // value = await this.localCollection.create(value);
        // this.remoteCollection.create(value);
        // return value;
        return await this.remoteCollection.create(value);
    }
    async     createMany(values: T[]): Promise<T[]> {
        // values = await this.localCollection.createMany(values);
        // this.remoteCollection.createMany(values);
        // return values;
        return await this.remoteCollection.createMany(values);
    }
    async     save(value: T): Promise<T> {
        // value = await this.localCollection.save(value);
        // this.remoteCollection.save(value);
        // return value;
        return await this.remoteCollection.save(value);
    }

    async saveMany(values: T[]): Promise<T[]> {
        // values = await this.localCollection.saveMany(values);
        // this.remoteCollection.saveMany(values);
        // return values;
        return await this.remoteCollection.saveMany(values);
    }

    async     delete(value: T): Promise<void> {
        // this.remoteCollection.delete(value);
        // return this.localCollection.delete(value);
        return await this.remoteCollection.delete(value);
    }

    async deleteMany(values: T[]): Promise<void> {
        // this.remoteCollection.deleteMany(values);
        // return this.localCollection.deleteMany(values);
        return await this.remoteCollection.deleteMany(values);
    }
    async     deleteById(value: string): Promise<void> {
        // this.remoteCollection.deleteById(value);
        // return this.localCollection.deleteById(value);
        return await this.remoteCollection.deleteById(value);
    }
    async     deleteManyByIds(values: string[]): Promise<void> {
        // this.remoteCollection.deleteManyByIds(values);
        // return this.localCollection.deleteManyByIds(values);
        return await this.remoteCollection.deleteManyByIds(values);
    }
    async     observeUpdate(actionTypes: string[], id: string, callback: any): Promise<void> {
        // this.localCollection.observeUpdate(actionTypes, id, callback);
        this.remoteCollection.observeUpdate(actionTypes, id, callback);
    }
}