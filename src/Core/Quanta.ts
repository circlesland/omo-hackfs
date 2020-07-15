import { TextileHub } from "./TextileHub/TextileHub";
import { ThreadID, Client } from "@textile/hub";
import { QuantSchema, AuthorSchema, BookSchema, LibrarySchema } from "../Helper/JsonSchema";
import * as uuid from "uuid";
import { Quant } from "./Entities/Quant";
import { Database } from "@textile/threads-database";

export class Quanta {
    // private textileHub: TextileHub;
    // private threadId: ThreadID;
    // private static instance: Quanta;
    // private quanta: Quant[];

    // private constructor() {
    //     this.quanta = [];
    //     this.textileHub = TextileHub.getInstance();
    //     this.threadId = ThreadID.fromString(process.env.QUANTATHREAD || '');
    // }

    // static getInstance(): Quanta {
    //     if (this.instance == null)
    //         this.instance = new Quanta;
    //     return this.instance;
    // }

    // async init(seed?: boolean): Promise<Quanta> {
    //     var client = await this.textileHub.getClient();
    //     this.initDB(client, seed)
    //     await this.loadQuanta();
    //     await this.subscribeQuanta();
    //     return this;
    // }

    // private async loadQuanta() {
    //     const client = await this.textileHub.getClient();
    //     var quanta = await client.find(this.threadId, "Quant", {});
    //     quanta.instancesList;
    //     throw new Error("Method not implemented.");
    // }

    // private async subscribeQuanta() {
    //     throw new Error("Method not implemented.");
    // }

    // get all(): Quant[] {
    //     return this.quanta;
    // }

    // private async initDB(client: Client, seed?: boolean) {
    //     var quantCollectionAvail = await client.has(this.threadId, "Quant", []);
    //     if (!quantCollectionAvail)
    //         await this.seedDb(client, seed)
    // }

    // // private async initSubscription(client: Client) {
    // //     var quanta = await client.find(this.threadId, "Quant", {});
    // //     quanta.instancesList.forEach(quant => {
    // //         this.createSubscription(client, quant.collectionName, "CREATE", "_added")
    // //         this.createSubscription(client, quant.collectionName, "SAVE", "_updated")
    // //         this.createSubscription(client, quant.collectionName, "DELETE", "_deleted")
    // //         this.createSubscription(client, quant.collectionName, "ALL", "_changed")
    // //     });
    // // }


    // createSubscription(client: Client, collectionName: string, actionType: string, pubsub: string) {
    //     // client.listen(this.threadId, [
    //     //     {
    //     //         collectionName: collectionName,
    //     //         actionTypes: [actionType]
    //     //     }
    //     // ],
    //     //     (reply, error) => {
    //     //         if (reply)
    //     //             pubsub.publish(collectionName + pubsub, reply.instance._id)
    //     //         if (error)
    //     //             console.error(error);
    //     //     }
    //     // )
    // }

    // async seedDb(client: Client, seed?: boolean) {
    //     const quanta: Quant[] = [
    //         {
    //             _id: "78a414b4-8557-4790-a863-9e75a89bfbd8",
    //             name: "Quant",
    //             icon: "fa-book",
    //             jsonSchema: JSON.stringify(QuantSchema),
    //             collectionName: "Quant",
    //         },
    //     ];

    //     if (seed) {
    //         quanta.push(
    //             {
    //                 _id: '',
    //                 name: "Author",
    //                 icon: "fa-book",
    //                 jsonSchema: JSON.stringify(AuthorSchema),
    //                 collectionName: uuid.v4(),
    //             },
    //             {
    //                 _id: '',
    //                 name: "Book",
    //                 icon: "fa-book",
    //                 jsonSchema: JSON.stringify(BookSchema),
    //                 collectionName: uuid.v4(),
    //             },
    //             {
    //                 _id: '',
    //                 name: "Library",
    //                 icon: "fa-book",
    //                 jsonSchema: JSON.stringify(LibrarySchema),
    //                 collectionName: uuid.v4(),
    //             }
    //         );
    //     }

    //     for (let i = 0; i < quanta.length; i++)
    //         await client.newCollection(this.threadId,
    //             quanta[i].collectionName,
    //             JSON.parse(quanta[i].jsonSchema)
    //         );
    //     await client.create(this.threadId, "Quant", quanta);
    // }
}