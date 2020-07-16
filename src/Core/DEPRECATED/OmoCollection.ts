import { JSONSchema } from "@textile/threads-database";

import { ThreadID } from "@textile/hub";


import { TextileHub } from "../TextileHub/TextileHub";

import Client, { QueryJSON } from "@textile/threads-client";

import { Quant } from "../Data/Entities/Quant";
import { Instance } from "@textile/threads-store";

export class OmoCollection<T extends Instance> {
    // private jsonSchema?: JSONSchema;
    // private collectionName: string;
    // private threadId: ThreadID;

    // private constructor(collectionName: string, threadId: ThreadID, jsonSchema?: JSONSchema) {
    //     this.collectionName = collectionName;
    //     this.jsonSchema = jsonSchema;
    //     this.threadId = threadId;
    // }

    // private async createCollectionIfNotExist(client: Client) {
    //     try {
    //         // @TODO remove after testing
    //         try {
    //             await client.deleteCollection(this.threadId, this.collectionName);
    //         }
    //         catch (e) { }
    //         // @TODO check whether collection is existing first
    //         if (this.jsonSchema == undefined || this.jsonSchema.properties == undefined) return;
    //         var properties: any = this.jsonSchema.properties;
    //         Object.keys(properties).forEach((prop) => {
    //             if (properties[prop].type.toLowerCase() == "1TON") {

    //                 properties[prop].type = "string";
    //             }
    //             if (properties[prop].type.toLowerCase() == "NTOM") {

    //                 properties[prop].type = "string";
    //             }
    //             if (properties[prop].type.toLowerCase() == "1TO1") {

    //                 properties[prop].type = "string";
    //             }
    //             if (properties[prop].type.toLowerCase() == "NTO1") {

    //                 properties[prop].type = "string";
    //             }
    //         });
    //         this.jsonSchema.properties = properties;
    //         await client.newCollection(this.threadId, this.collectionName, this.jsonSchema);
    //     }
    //     catch (e) {
    //         if (e.message != "collection already registered")
    //             throw e;
    //     }
    // }

    // static async createOmoCollection<T>(collectionName: string, jsonSchema: JSONSchema, threadId: ThreadID, client: Client) {
    //     var collection = new OmoCollection<T>(collectionName, threadId, jsonSchema);
    //     await collection.createCollectionIfNotExist(client);
    //     return collection;
    // }

    // static byName<T>(collectionName: string, threadId: ThreadID, jsonSchema?: JSONSchema): OmoCollection<T> {
    //     return new OmoCollection<T>(collectionName, threadId, jsonSchema);
    // }

    // async all(externalClient?: Client): Promise<T[]> {
    //     return await window.o.hub.threadDB.findRemote<T>(this.threadId, this.collectionName, {});
    // }

    // async subscribe(changes: string[], callback: Function, externalClient?: Client) {
    //     var client = externalClient ? externalClient : await TextileHub.init().getClient();
    //     client.listen(this.threadId, [{ collectionName: this.collectionName, actionTypes: changes }], async (reply, err) => {
    //         callback(await this.all());
    //     })
    // }

    // async find<T>(query: QueryJSON): Promise<T[]> {
    //     var client = await TextileHub.getInstance().getClient();
    //     var result = await client.find<T>(this.threadId, this.collectionName, query);
    //     return result.instancesList;
    // }

    // async findById<T>(id: string): Promise<T | null> {
    //     var client = await TextileHub.getInstance().getClient();
    //     var result = await client.findByID<T>(this.threadId, this.collectionName, id);
    //     if (result.instance)
    //         return result.instance;
    //     return null
    // }

    // async create(value: any): Promise<any> {
    //     var client = await TextileHub.getInstance().getClient();
    //     var result = await client.create(this.threadId, this.collectionName, [value]);
    //     if (result.length) {
    //         value._id = result[0];
    //         return value;
    //     }
    //     throw new Error("Item couldn't created");
    // }

    // async createMany(values: any[]): Promise<any> {
    //     var client = await TextileHub.getInstance().getClient();
    //     var result = await client.create(this.threadId, this.collectionName, values);
    //     if (result.length) {
    //         result.forEach((value, index) => {
    //             values[index]._id = value;
    //         });
    //         return values;
    //     }
    //     throw new Error("Item couldn't created");
    // }

    // async save(value: any): Promise<void> {
    //     var client = await TextileHub.getInstance().getClient();
    //     var result = await client.save(this.threadId, this.collectionName, [value]);
    //     return result;
    // }

    // async saveMany(values: any[]): Promise<void> {
    //     var client = await TextileHub.getInstance().getClient();
    //     var result = await client.save(this.threadId, this.collectionName, values);
    //     return result;
    // }

    // async delete(id: string): Promise<void> {
    //     try {
    //         var client = await TextileHub.getInstance().getClient();
    //         await client.delete(this.threadId, this.collectionName, [id]);
    //     }
    //     catch (e) {
    //         console.log(e.message);
    //     }
    // }

    // async deleteMany(ids: string[]): Promise<void> {
    //     try {
    //         var client = await TextileHub.getInstance().getClient();
    //         await client.delete(this.threadId, this.collectionName, ids);
    //     }
    //     catch (e) {
    //         console.log(e.message);
    //     }
    // }

    // async truncate(): Promise<void> {
    //     var all = await this.find<any>({});
    //     var toDelete = all.map(x => x._id);
    //     await this.deleteMany(toDelete);
    // }

    // async addColumn(name: string, type: string) {
    //     type = type.toLowerCase();
    //     if (this.jsonSchema == null) throw new Error("jsonSchema not loaded");
    //     if (name == null || name == "") throw new Error("Column name cannot be empty");
    //     if (type != "string") throw new Error("Sorrrry in this stage only strings are allowed. We are working on it.");
    //     if (this.jsonSchema.properties) {
    //         if (Object.values(this.jsonSchema.properties).some(x => x == name)) throw new Error("Column is already existing");
    //         this.jsonSchema.properties[name] = { type: "string" };
    //         var client = await TextileHub.getInstance().getClient();
    //         await client.updateCollection(this.threadId, this.collectionName, this.jsonSchema);
    //         var quantCollection: OmoCollection<Quant> = window['o'].quanta.quantaCollection;
    //         var quantResponse = await quantCollection.find<any>({ ands: [{ fieldPath: "collectionName", value: { string: this.collectionName } }] });
    //         var quant = quantResponse[0];
    //         quant.jsonSchema = JSON.stringify(this.jsonSchema);
    //         await quantCollection.save(quant);
    //     }
    // }


    // async deleteColumn(name: string) {
    //     if (this.jsonSchema == null) throw new Error("jsonSchema not loaded");
    //     if (name == null || name == "") throw new Error("Column name cannot be empty");
    //     if (this.jsonSchema.properties) {
    //         if (this.jsonSchema.properties[name] == undefined) throw new Error("Column does not exist");
    //         var client = await TextileHub.getInstance().getClient();

    //         var temp = await client.find(this.threadId, this.collectionName, {});
    //         await client.deleteCollection(this.threadId, this.collectionName);

    //         delete this.jsonSchema.properties[name];
    //         await client.newCollection(this.threadId, this.collectionName, this.jsonSchema);
    //         // await client.create(this.threadId, this.collectionName, temp.instancesList);
    //         // await client.updateCollection(this.threadId, this.collectionName, this.jsonSchema);
    //         var quantCollection: OmoCollection<Quant> = window['o'].quanta.quantaCollection;
    //         var quantResponse = await quantCollection.find<any>({ ands: [{ fieldPath: "collectionName", value: { string: this.collectionName } }] });
    //         var quant = quantResponse[0];
    //         quant.jsonSchema = JSON.stringify(this.jsonSchema);
    //         await quantCollection.save(quant);
    //     }
    // }


}