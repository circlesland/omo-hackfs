import { Client, KeyInfo, ThreadID } from "@textile/hub";
import { Database, JSONSchema } from "@textile/threads-database";
import { Instance } from "@textile/threads-store";
import { QueryJSON } from "@textile/threads-client";
import { OdentityEntity } from "../Data/Entities/OdentityEntity";
import { threadId } from "worker_threads";
import { Libp2pCryptoIdentity } from "@textile/threads-core";
import { debug } from "svelte/internal";
import { QuantSchema } from "../Data/JsonSchemas/QuantSchema";

export class ThreadDB {
    private localDb: Database;

    private constructor(db: Database) {
        this.localDb = db;
    }

    static async init(): Promise<ThreadDB> {
        // let localAuth: KeyInfo = {
        //     key: process.env.GROUP_API_KEY || '',
        //     secret: process.env.GROUP_API_SECRET || ''
        // };
        let localAuth: KeyInfo = {
            key: process.env.GROUP_API_KEY || '',
            secret: process.env.GROUP_API_SECRET || ''
        };
        let local = await Database.withKeyInfo(localAuth, "odentity", undefined, undefined, true);
        return new ThreadDB(local);
    }

    async getRemoteThread(threadName): Promise<{ thread: ThreadID, isNew: boolean }> {
        let client = await this.getClient();
        let threads = await client.listThreads();
        let response = threads.listList.find(th => th.name == threadName);
        if (response) return { thread: ThreadID.fromString(response.id), isNew: false };
        let id = ThreadID.fromRandom();
        client.newDB(id, threadName);
        return { thread: id, isNew: true };
    }

    private async getClient() {
        let remoteAuth: KeyInfo = {
            key: process.env.USER_API_KEY || '',
            secret: process.env.USER_API_SECRET || ''
        };
        return await Client.withKeyInfo(remoteAuth);
    }

    // private async getGroupClient() {
    //     let remoteAuth: KeyInfo = {
    //         key: process.env.GROUP_API_KEY || '',
    //         secret: process.env.GROUP_API_SECRET || ''
    //     };
    //     return await Client.withKeyInfo(remoteAuth);
    // }

    async findRemote<T extends Instance>(threadId: ThreadID, collectionName: string, query: QueryJSON): Promise<T[]> {
        var client = await this.getClient();
        var response = await client.find<T>(threadId, collectionName, query);
        return response.instancesList;
    }

    async findByIdRemote<T extends Instance>(threadId: ThreadID, collectionName: string, id: string): Promise<T> {
        var client = await this.getClient();
        var response = await client.findByID<T>(threadId, collectionName, id);
        return response.instance;
    }

    async deleteRemoteDBThread(threadId: string, client: Client) {
        if (client == undefined) client = await this.getClient();
        var t = ThreadID.fromString(threadId);
        try {
            await client.deleteDB(t);
            console.log("THREAD DELETED " + threadId);

        } catch (e) {
            console.error(e);
        }
    }

    async deleteRemoteCollection(threadId: ThreadID, collectionName: string) {
        let client = await this.getClient();
        await client.deleteCollection(threadId, collectionName);
    }
    async truncateRemoteCollection(threadId: ThreadID, collectionName: string) {
        let client = await this.getClient();
        var entities = await client.find<Instance>(threadId, collectionName, {});
        await client.delete(threadId, collectionName, entities.instancesList.map(e => e._id));
    }
    async newRemoteCollection(threadId: ThreadID, name: string, schema: JSONSchema) {
        let client = await this.getClient();
        await client.newCollection(threadId, name, schema);
    }

    async createRemote<T extends Instance>(threadId: ThreadID, collectionName: string, value: T) {
        let client = await this.getClient();
        var response = await client.create(threadId, collectionName, [value]);
        value._id = response[0];
        return value;
    }

    async createManyRemote<T extends Instance>(threadId: ThreadID, collectionName: string, values: T[]) {
        let client = await this.getClient();
        var response = await client.create(threadId, collectionName, values);

        return values.map((item, index) => {
            item._id = response[index];
            return item;
        });
    }

    async saveRemote<T extends Instance>(threadId: ThreadID, collectionName: string, value: T) {
        let client = await this.getClient();
        await client.save(threadId, collectionName, [value]);
    }

    async observeUpdate(threadId: ThreadID, collection: string, id: string, callback: any) {
        let client = await this.getClient();
        client.listen(threadId, [{ collectionName: collection, instanceID: id, actionTypes: ['SAVE'] }], callback)
    };

    async createUserDb(odentity: OdentityEntity) {
        debugger;
        let client = await this.getClient();
        await client.newDB(ThreadID.fromString(odentity.threadId), odentity._id);
        await client.newCollection(ThreadID.fromString(odentity.threadId), "dummyCollection", QuantSchema);
        await client.create(ThreadID.fromString(odentity.threadId), "dummyCollection", [{ name: "foo" }]);
        var foo = await client.find(ThreadID.fromString(odentity.threadId), "dummyCollection", {});
        console.log(foo.instancesList);
    }

    async startLocalDb() {
        var odentity = window.o.odentity.current;
        if (odentity == null || odentity.cryptoIdentity == null) throw Error("You are not logged in...");
        var identity = await Libp2pCryptoIdentity.fromString(odentity.cryptoIdentity);
        var client = await this.getClient();
        var dbInfo = await client.getDBInfo(ThreadID.fromString(odentity.threadId));
        debugger;

        let localAuth: KeyInfo = {
            key: process.env.GROUP_API_KEY || '',
            secret: process.env.GROUP_API_SECRET || ''
        };
        this.localDb = await Database.withKeyInfo(localAuth, odentity.threadId + (new Date).toString(), undefined, undefined, true);;
        // await this.localDb.startFromInfo(identity, dbInfo, true, {
        //     threadID: ThreadID.fromString(odentity.threadId)
        // })

        // client = await this.getClient();
        // console.log(await client.getCollectionIndexes(ThreadID.fromString(odentity.threadId), "dummyCollection"));
        // await client.create(ThreadID.fromString(odentity.threadId), "dummyCollection", [{ name: "foo" }]);
        // var foo = await client.find(ThreadID.fromString(odentity.threadId), "dummyCollection", {});
        // console.log(foo.instancesList);
        // debugger;
        // await this.localDb.start(identity, { threadID: ThreadID.fromRandom() });
    }

    async testlocal() {
        await this.localDb.newCollection("FOO", QuantSchema);
    }

}