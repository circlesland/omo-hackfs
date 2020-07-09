import LevelDatastore from "datastore-level";
import { Collection, Database, JSONSchema } from "@textile/threads-database";
import { BookSchema } from "../../Helper/JsonSchema";
import { ThreadID, KeyInfo, createUserAuth } from "@textile/hub";
import { Instance, Op, Update } from "@textile/threads-store";
import { IdentityStore } from "./IdentityStore";
import Client, { DBInfo } from "@textile/threads-client";
import { TextileHub } from "../TextileHub";

/**
 * OmoStore is a localfirst Database which is connected to global Store of omo.earth
 */
export class OmoStore {
    private static instance: OmoStore;
    hub: TextileHub;
    threadId: ThreadID;
    // private localDb: Database;
    identity: IdentityStore;

    private constructor() {
        // const localStore = new LevelDatastore("localDB");
        // this.localDb = new Database(localStore);
        // window['localDB'] = this.localDb;
        this.hub = TextileHub.getInstance();
        this.threadId = ThreadID.fromString(process.env.THREADID || '');
        window['thread'] = this.threadId;
        this.identity = new IdentityStore(this, this.threadId);
    }

    async init() {
        // await this.initDB();
        // await this.localDb.start(await Database.randomIdentity())
        await this.identity.init();
        // window['omo'] = this.localDb.collections.get("Omo");
    }

    // private async initDB(thread?) {
    //     var keyInfo: KeyInfo = {
    //         key: process.env.USER_API_KEY || '',
    //         secret: process.env.USER_API_SECRET || ''
    //     }
    //     var
    //     var auth = await createUserAuth(process.env.USER_API_KEY || '', process.env.USER_API_SECRET || '');
    //     this.localDb = await Database.withUserAuth(auth, threadId);
    //     Database.
    // }

    // private async initDBInvite(thread, invite) {
    //     // const localStore = new LevelDatastore("localDB2");
    //     // // this.localDb = new Database(localStore);
    //     // var keyInfo: KeyInfo = {
    //     //     key: "brreaumjeitkauue2e2ka7yvqoi",
    //     //     secret: "byjftlzsuzpxuiteuavfofnm7kw455uev3b5v43q"
    //     // }
    //     // // //  thread || process.env.THREADID || '';
    //     // // // new Database()
    //     // this.localDb = await Database.withKeyInfo(keyInfo, localStore);
    // }

    // async initFromInvite(invite: DBInfo) {
    //     // var threadId = ThreadID.fromRandom();
    //     // await this.initDBInvite(threadId, invite);
    //     // // await this.localDb.start(await Database.randomIdentity())
    //     // console.log(invite);
    //     // await this.localDb.startFromInfo(await Database.randomIdentity(), invite);
    // }

    // async getBase64Invite() {
    //     var dbinfo = await this.localDb.getDBInfo() as DBInfo;
    //     var thread = dbinfo.key.toString();
    //     var addrs: any[] = [];
    //     dbinfo.addrs.forEach((addr: any) => {
    //         addrs.push(addr.toJSON())
    //     });
    //     var obj = { thread, addrs };
    //     return btoa(JSON.stringify(obj));
    // }

    static getInstance() {
        if (this.instance == null)
            this.instance = new OmoStore();
        return this.instance;
    }

    async hasCollection(collectionName, extClient?: Client): Promise<boolean> {
        // let client = extClient ? extClient : await this.hub.getClient();
        // try {
        //     console.log(this.threadId.toString() + " " + collectionName)
        //     return await client.has(this.threadId, collectionName, []);
        // }
        // catch (e) {
        //     if (e.message = "collection not found") {
        //         return false;
        //     }
        //     throw e;
        // }
        return false;
    }

    async newCollection<T extends Instance>(name: string, schema: JSONSchema, extClient?: Client) {
        let client = extClient ? extClient : await this.hub.getClient();
        await client.newCollection(this.threadId, name, schema);
    }

    //     getLocalCollection<T extends Instance>(collectionName: string): Collection<T> {
    //         let client = await this.hub.getClient();
    // client.
    //         return this.localDb.collections.get(collectionName) as Collection<T>;
    //     }

    async observeUpdate(collection: string, id: string, callback: any) {
        let client = await this.hub.getClient();
        client.listen(this.threadId, [{ collectionName: collection, instanceID: id, actionTypes: [''] }], callback)
        // const filter = `${collection}.*.*`
        // this.localDb.emitter.on(filter, async (values: any, type: any) => {
        //     let coll = this.localDb.collections.get(collection) as Collection;
        //     let item = await coll.findById(id);
        //     callback(item);
        // })
    };
}