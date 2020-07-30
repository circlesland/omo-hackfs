import { Instance } from "@textile/threads-store";
import { ICollection } from "./ICollection";
import { RemoteCollection } from "./RemoteCollection";
import { LocalCollection } from "./LocalCollection";
import { FilterQuery } from "@textile/hub";
import { LocalThread } from "./LocalThread";
import { RemoteThread } from "./RemoteThread";

export class SyncedCollection<T extends Instance> implements ICollection<T> {

    localCollection: LocalCollection<T>;
    remoteCollection: Promise<RemoteCollection<T>> | undefined;

    private constructor(localCollection: LocalCollection<T>) {
        this.localCollection = localCollection;
    }

    static async init<T extends Instance>(collectionName: string, localThread: LocalThread, remoteThread: Promise<RemoteThread>): Promise<SyncedCollection<T>> {
        let localCollection = await localThread.getCollection<T>(collectionName);
        let instance = new SyncedCollection<T>(localCollection);
        remoteThread.then((thread) => {
            instance.remoteCollection = thread.getCollection<T>(collectionName);
            instance.remoteCollection.then(rc =>
                this.fakeSyncCollections<T>(localCollection, rc))
        });
        return instance;
    }

    private static async fakeSyncCollections<T extends Instance>(localCollection: LocalCollection<T>, remoteCollection: RemoteCollection<T>) {
        await localCollection.saveMany(await remoteCollection.all());
        // remoteCollection.observeUpdate(["CREATE"], "", async (instance) => {
        //     console.log("CREATE", instance);
        //     await localCollection.save(instance);
        // })
        // remoteCollection.observeUpdate(["SAVE"], "", async (instance) => {
        //     console.log("SAVE", instance);
        //     await localCollection.save(instance);
        // })
        // remoteCollection.observeUpdate(["DELETE"], "", async (instance) => {
        //     console.log("DELETE", instance);
        //     await localCollection.save(instance);
        // })
    }

    async all(): Promise<T[]> {
        return await this.localCollection.all();
    }

    async find(query: FilterQuery<T>): Promise<T[]> {
        return await this.localCollection.find(query);
    }

    async findById(id: string): Promise<T> {
        return await this.localCollection.findById(id);
    }

    async deleteCollection(): Promise<void> {
        if (this.remoteCollection)
            this.remoteCollection.then(rc => rc.deleteCollection());
        return await this.localCollection.deleteCollection();
    }

    async truncate(): Promise<void> {
        if (this.remoteCollection)
            this.remoteCollection.then(rc => rc.truncate());
        return await this.localCollection.truncate();
    }

    async create(value: T): Promise<T> {
        value = await this.localCollection.create(value);
        if (this.remoteCollection)
            this.remoteCollection.then(rc => rc.create(value));
        return value;
    }

    async createMany(values: T[]): Promise<T[]> {
        values = await this.localCollection.createMany(values);
        if (this.remoteCollection)
            this.remoteCollection.then(rc => rc.createMany(values));
        return values;
    }

    async save(value: T): Promise<T> {
        value = await this.localCollection.save(value);
        if (this.remoteCollection)
            this.remoteCollection.then(rc => rc.save(value));
        return value;
    }

    async saveMany(values: T[]): Promise<T[]> {
        values = await this.localCollection.saveMany(values);
        if (this.remoteCollection)
            this.remoteCollection.then(rc => rc.saveMany(values));
        return values;
    }

    async delete(value: T): Promise<void> {
        if (this.remoteCollection)
            this.remoteCollection.then(rc => rc.delete(value));
        return this.localCollection.delete(value);
    }

    async deleteMany(values: T[]): Promise<void> {
        if (this.remoteCollection)
            this.remoteCollection.then(rc => rc.deleteMany(values));
        return this.localCollection.deleteMany(values);
    }

    async deleteById(value: string): Promise<void> {
        if (this.remoteCollection)
            this.remoteCollection.then(rc => rc.deleteById(value));
        return await this.localCollection.deleteById(value);
    }

    async deleteManyByIds(values: string[]): Promise<void> {
        if (this.remoteCollection)
            this.remoteCollection.then(rc => rc.deleteManyByIds(values));
        return this.localCollection.deleteManyByIds(values);
    }

    async observeUpdate(actionTypes: string[], id: string, callback: any): Promise<void> {
        await this.localCollection.observeUpdate(actionTypes, id, callback);
    }
}