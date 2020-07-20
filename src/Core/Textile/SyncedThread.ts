import { Instance } from "@textile/threads-store";
import { SyncedCollection } from "./SyncedCollection";
import { RemoteThread } from "./RemoteThread";
import { LocalThread } from "./LocalThread";
import { JSONSchema } from "@textile/hub";

export class SyncedThread {
    private remoteThread: RemoteThread;
    private localThread: LocalThread;

    private constructor(localThread, remoteThread) {
        this.localThread = localThread;
        this.remoteThread = remoteThread;
    }

    static async init(threadName): Promise<SyncedThread> {
        var localThread = await LocalThread.init(threadName);
        var remoteThread = await RemoteThread.init(threadName);
        return new SyncedThread(localThread, remoteThread);
    }

    async getOrCreateCollection<T extends Instance>(collectionName: string, schema: JSONSchema): Promise<SyncedCollection<T>> {
        if (!await this.localThread.hasCollection(collectionName))
            await this.localThread.createCollection(collectionName, schema);
        if (!await this.remoteThread.hasCollection(collectionName))
            await this.remoteThread.createCollection(collectionName, schema);
        return await this.getCollection(collectionName);
    }

    async getCollection<T extends Instance>(collectionName: string): Promise<SyncedCollection<T>> {
        var localCollection = await this.localThread.getCollection<T>(collectionName);
        var remoteCollection = await this.remoteThread.getCollection<T>(collectionName);
        return new SyncedCollection<T>(localCollection, remoteCollection);
    }
}