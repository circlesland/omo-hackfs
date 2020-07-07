import { Client, ThreadID, createUserAuth, UserAuth } from '@textile/hub';
import { QuantSchema, AuthorSchema, BookSchema, LibrarySchema } from './Helper/JsonSchema';
import * as uuid from "uuid";

/**
 * Interface to Textile Hub
 */
export class TextileHub {
    private auth: UserAuth | null;
    private threadId: ThreadID;

    private static instance: TextileHub;

    private constructor() {
        this.auth = null;
        this.threadId = ThreadID.fromString(process.env.THREADID || '');
    }

    static getInstance(): TextileHub {
        if (this.instance == null)
            this.instance = new TextileHub();
        return this.instance;
    }

    async init(seed: boolean): Promise<TextileHub> {
        // var client = await this.getClient();
        // await this.initDB(client, seed);
        // await this.initSubscription(client);
        return this;
    }

    async initDB(client: Client, seed: boolean) {
        var quantCollectionAvail = await client.has(this.threadId, "Quant", []);
        if (!quantCollectionAvail)
            await this.seedDb(seed, client)
    }

    async initSubscription(client: Client) {
        var quanta = await client.find(this.threadId, "Quant", {});
        quanta.instancesList.forEach(quant => {
            this.createSubscription(client, quant.collectionName, "CREATE", "_added")
            this.createSubscription(client, quant.collectionName, "SAVE", "_updated")
            this.createSubscription(client, quant.collectionName, "DELETE", "_deleted")
            this.createSubscription(client, quant.collectionName, "ALL", "_changed")
        });
    }

    createSubscription(client: Client, collectionName: string, actionType: string, pubsub: string) {
        // client.listen(this.threadId, [
        //     {
        //         collectionName: collectionName,
        //         actionTypes: [actionType]
        //     }
        // ],
        //     (reply, error) => {
        //         if (reply)
        //             pubsub.publish(collectionName + pubsub, reply.instance._id)
        //         if (error)
        //             console.error(error);
        //     }
        // )
    }

    async seedDb(seed: boolean, client: Client) {
        const quanta: any[] = [
            {
                _id: "78a414b4-8557-4790-a863-9e75a89bfbd8",
                name: "Quant",
                icon: "fa-book",
                jsonSchema: JSON.stringify(QuantSchema),
                collectionName: "Quant",
            },
        ];

        if (seed)
            quanta.push(
                {
                    name: "Author",
                    icon: "fa-book",
                    jsonSchema: JSON.stringify(AuthorSchema),
                    collectionName: uuid.v4(),
                },
                {
                    name: "Book",
                    icon: "fa-book",
                    jsonSchema: JSON.stringify(BookSchema),
                    collectionName: uuid.v4(),
                },
                {
                    name: "Library",
                    icon: "fa-book",
                    jsonSchema: JSON.stringify(LibrarySchema),
                    collectionName: uuid.v4(),
                }
            );

        for (let i = 0; i < quanta.length; i++)
            await client.newCollection(this.threadId,
                quanta[i].collectionName,
                JSON.parse(quanta[i].jsonSchema)
            );
        await client.create(this.threadId, "Quant", quanta);
    }

    async getClient(): Promise<Client> {
        if (this.auth == null)
            this.auth = await createUserAuth(process.env.USER_API_KEY || '', process.env.USER_API_SECRET || '');
        return Client.withUserAuth(this.auth);
    }
}