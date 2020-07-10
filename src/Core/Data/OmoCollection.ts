import { JSONSchema } from "@textile/threads-database";
import { Client, ThreadID } from "@textile/hub";
import { TextileHub } from "../TextileHub";
import { QueryJSON } from "@textile/threads-client";

export class OmoCollection<T> {
    private jsonSchema?: JSONSchema;
    private collectionName: string;
    private threadId: ThreadID;

    private constructor(collectionName: string, threadId: ThreadID, jsonSchema?: JSONSchema) {
        this.collectionName = collectionName;
        this.jsonSchema = jsonSchema;
        this.threadId = threadId;
    }

    private async createCollectionIfNotExist(client: Client) {
        try {
            await client.newCollection(this.threadId, this.collectionName, this.jsonSchema);
        }
        catch (e) {
            if (e.message != "collection already registered")
                throw e;
        }
    }

    static async createOmoCollection<T>(collectionName: string, jsonSchema: JSONSchema, threadId: ThreadID, client: Client) {
        var collection = new OmoCollection<T>(collectionName, threadId, jsonSchema);
        await collection.createCollectionIfNotExist(client);
        return collection;
    }

    static byName<T>(collectionName: string, threadId: ThreadID): OmoCollection<T> {
        return new OmoCollection<T>(collectionName, threadId);
    }

    async all(externalClient?: Client): Promise<T[]> {
        var client = externalClient ? externalClient : await TextileHub.getInstance().getClient();
        var result = await client.find<T>(this.threadId, this.collectionName, {});
        return result.instancesList;
    }

    async subscribe(changes: string[], callback: Function, externalClient?: Client) {
        var client = externalClient ? externalClient : await TextileHub.getInstance().getClient();
        client.listen(this.threadId, [{ collectionName: this.collectionName, actionTypes: changes }], async (reply, err) => {
            callback(await this.all());
        })
    }

    async find<T>(query: QueryJSON): Promise<T[]> {
        var client = await TextileHub.getInstance().getClient();
        var result = await client.find<T>(this.threadId, this.collectionName, query);
        return result.instancesList;
    }

    async findById<T>(id: string): Promise<T> {
        var client = await TextileHub.getInstance().getClient();
        var result = await client.findByID<T>(this.threadId, this.collectionName, id);
        return result.instance;
    }

    async create(value: any): Promise<any> {
        var client = await TextileHub.getInstance().getClient();
        var result = await client.create(this.threadId, this.collectionName, [value]);
        if (result.length) {
            value._id = result[0];
            return value;
        }
        throw new Error("Item couldn't created");
    }

    async createMany(string, values: any[]): Promise<any> {
        var client = await TextileHub.getInstance().getClient();
        var result = await client.create(this.threadId, this.collectionName, values);
        if (result.length) {
            result.forEach((value, index) => {
                values[index]._id = value;
            });
            return values;
        }
        throw new Error("Item couldn't created");
    }

    async save(value: any): Promise<void> {
        var client = await TextileHub.getInstance().getClient();
        var result = await client.save(this.threadId, this.collectionName, [value]);
        return result;
    }

    async saveMany(values: any[]): Promise<void> {
        var client = await TextileHub.getInstance().getClient();
        var result = await client.save(this.threadId, this.collectionName, values);
        return result;
    }

    async delete(id: string): Promise<void> {
        try {
            var client = await TextileHub.getInstance().getClient();
            await client.delete(this.threadId, this.collectionName, [id]);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    async deleteMany(ids: string[]): Promise<void> {
        try {
            var client = await TextileHub.getInstance().getClient();
            await client.delete(this.threadId, this.collectionName, ids);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    async truncate(): Promise<void> {
        var all = await this.find<any>({});
        var toDelete = all.map(x => x._id);
        await this.deleteMany(toDelete);
    }
}