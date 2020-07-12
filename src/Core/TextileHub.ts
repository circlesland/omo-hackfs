import { Client, ThreadID, createUserAuth, UserAuth, KeyInfo, createAPISig } from '@textile/hub';
import { QuantSchema, AuthorSchema, BookSchema, LibrarySchema } from '../Helper/JsonSchema';
import * as uuid from "uuid";
import { JSONSchema } from '@textile/threads-database';
import { Instance } from '@textile/threads-store';

/**
 * Interface to Textile Hub
 */
export class TextileHub {
    private static instance: TextileHub;

    private constructor() {
    }

    static getInstance(): TextileHub {
        if (this.instance == null)
            this.instance = new TextileHub();
        return this.instance;
    }

    async getClient(): Promise<Client> {
        const auth: KeyInfo = {
            key: process.env.USER_API_KEY || '',
            secret: process.env.USER_API_SECRET || ''
        }
        return Client.withKeyInfo(auth);
    }

    async deleteThread(thread, client) {
        if (client == undefined) client = await this.getClient();
        var t = ThreadID.fromString(thread);
        try {

            await client.deleteDB(t);
            console.log("THREAD DELETED " + thread);

        } catch (e) {
            try {

                await client.newDB(t);
                await client.deleteDB(t);
                console.log("THREAD DELETED " + thread);

            }
            catch (e2) {
                console.error(e2);
            }
        }
    }

    async getAPISig(seconds: number = 300) {
        const expiration = new Date(Date.now() + 1000 * seconds)
        return await createAPISig(process.env.USER_API_SECRET || '', expiration)
    }

    async hasCollection(threadId: ThreadID, collectionName, extClient?: Client): Promise<boolean> {
        let client = extClient ? extClient : await this.getClient();
        try {
            console.log(threadId.toString() + " " + collectionName)
            return await client.has(threadId, collectionName, []);
        }
        catch (e) {
            if (e.message = "collection not found") {
                return false;
            }
            throw e;
        }
        return false;
    }

    async newCollection<T extends Instance>(threadId: ThreadID, name: string, schema: JSONSchema, extClient?: Client) {
        let client = extClient ? extClient : await this.getClient();
        await client.newCollection(threadId, name, schema);
    }

    async observeUpdate(threadId: ThreadID, collection: string, id: string, callback: any, extClient?: Client) {
        let client = extClient ? extClient : await this.getClient();
        client.listen(threadId, [{ collectionName: collection, instanceID: id, actionTypes: [''] }], callback)
    };
}