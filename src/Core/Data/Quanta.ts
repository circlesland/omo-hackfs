import { OmoCollection } from "./OmoCollection";
import { QuantSchema, LibrarySchema, AuthorSchema, BookSchema } from "../../Helper/JsonSchema";
import { TextileHub } from "../TextileHub";
import { ThreadID, Client } from "@textile/hub";
import { Quant } from "../Entities/Quant";
import { threadId } from "worker_threads";
import { QueryJSON } from "@textile/threads-client";
import { InstanceList } from "@textile/threads-client/dist/models";
import { PubSub } from "graphql-subscriptions";

export class Quanta {
    private quantaCollection: OmoCollection<Quant>;
    private static thread: ThreadID;
    private threadId: ThreadID;
    private listened: string[];

    private constructor(quantaCollection: OmoCollection<Quant>, threadId: ThreadID) {
        this.quantaCollection = quantaCollection;
        this.threadId = threadId;
        this.listened = [];
    }

    static async initQuanta(): Promise<Quanta> {
        var client = await TextileHub.getInstance().getClient();
        var threadId = await this.getThreadIdAsync();
        var quantaCollection = await OmoCollection.createOmoCollection<Quant>("QUANTA", QuantSchema, threadId, client);
        return new Quanta(quantaCollection, threadId);
    }

    private static async getThreadIdAsync(): Promise<ThreadID> {
        if (this.thread != undefined) return this.thread;
        let client = await TextileHub.getInstance().getClient();
        var threads = (await client.listThreads()).listList;
        var thread = threads.find(x => x.name == "QUANTA");
        if (thread) {
            this.thread = ThreadID.fromString(thread.id);
            return this.thread;
        }
        var threadId = ThreadID.fromRandom();
        await client.newDB(threadId, "QUANTA");
        this.thread = threadId;
        return this.thread;
    }

    async seedDb() {
        let client = await TextileHub.getInstance().getClient();
        var seed: Quant[] = [{
            _id: '',
            name: "Author",
            icon: "fa-book",
            jsonSchema: JSON.stringify(AuthorSchema),
            collectionName: 'Author',
        },
        {
            _id: '',
            name: "Book",
            icon: "fa-book",
            jsonSchema: JSON.stringify(BookSchema),
            collectionName: 'Book',
        },
        {
            _id: '',
            name: "Library",
            icon: "fa-book",
            jsonSchema: JSON.stringify(LibrarySchema),
            collectionName: 'Librarie',
        }];
        seed.forEach(async quant => {
            await OmoCollection.createOmoCollection(quant.collectionName, JSON.parse(quant.jsonSchema), this.threadId, client);

        })
        this.quantaCollection.createMany("QUANTA", seed)
    }

    async  all(): Promise<Quant[]> {
        return await this.quantaCollection.all();
    }

    async subscribe(callback: Function) {
        await this.quantaCollection.subscribe(["ALL"], callback);
    }
    getCollection<T>(collectionName: string): OmoCollection<T> {
        return OmoCollection.byName<T>(collectionName, this.threadId);
    }

    async subscribeChanges(pubsub: PubSub, quanta: Quant[]) {
        var client = await TextileHub.getInstance().getClient();
        quanta.forEach(quant => {
            // this.createSubscription(client, quant.collectionName, "CREATE", "_added", pubsub)
            // this.createSubscription(client, quant.collectionName, "SAVE", "_updated", pubsub)
            // this.createSubscription(client, quant.collectionName, "DELETE", "_deleted", pubsub)
            this.createSubscription(client, quant.collectionName, "ALL", "_changed", pubsub)
        });
    }

    private createSubscription(client: Client, collectionName: string, actionType: string, postfix: string, pubsub: PubSub) {
        if (this.listened.some(x => x == collectionName))
            return;
        client.listen(this.threadId, [
            {
                collectionName: collectionName,
                actionTypes: [actionType]
            }
        ],
            (reply, error) => {
                console.log("LISTENED: " + collectionName + postfix, reply, pubsub);
                if (reply)
                    pubsub.publish(collectionName + postfix, reply.instance._id)
                if (error)
                    console.error(error);
            }
        );
        this.listened.push(collectionName);
    }
}