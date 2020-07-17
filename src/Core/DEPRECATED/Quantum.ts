// export class Quantum {
//   // private static threadName = "QUANTA2"
//   // private quantaCollection: OmoCollection<Quant>;
//   // private static thread: ThreadID;
//   // private threadId: ThreadID;
//   // private listened: string[];

//   // private constructor(quantaCollection: OmoCollection<Quant>, threadId: ThreadID) {
//   //     this.quantaCollection = quantaCollection;
//   //     this.threadId = threadId;
//   //     this.listened = [];
//   // }

//   private constructor() {

//   }

//   static async leap(): Promise<Quantum> {
//     return new Quantum();
//   }
//   // static async initQuantum(): Promise<Quantum> {
//   //     var client = await TextileHub.getInstance().getClient();
//   //     var threadId = await this.getThreadIdAsync();
//   //     var quantaCollection = await OmoCollection.createOmoCollection<Quant>(Quantum.threadName, QuantSchema, threadId, client);
//   //     var quantum = new Quantum(quantaCollection, threadId);
//   //     await quantum.seedDb();
//   //     return quantum;
//   // }

//   // private static async getThreadIdAsync(): Promise<ThreadID> {
//   //     if (this.thread != undefined) return this.thread;
//   //     let client = await TextileHub.getInstance().getClient();
//   //     var threads = (await client.listThreads()).listList;
//   //     var thread = threads.find(x => x.name == Quantum.threadName);
//   //     if (thread) {
//   //         this.thread = ThreadID.fromString(thread.id);
//   //         return this.thread;
//   //     }
//   //     var threadId = ThreadID.fromRandom();
//   //     await client.newDB(threadId, Quantum.threadName);
//   //     this.thread = threadId;
//   //     return this.thread;
//   // }

//   // async seedDb() {
//   //     let client = await TextileHub.getInstance().getClient();
//   //     var seed: Quant[] = [{
//   //         _id: "01ed151phv26t2k09prqag02n4",
//   //         name: "Author",
//   //         icon: "fa-book",
//   //         jsonSchema: JSON.stringify(AuthorSchema),
//   //         collectionName: 'Author',
//   //     },
//   //     {
//   //         _id: "01ed153daxfm6bqxxvz9s14tqm",
//   //         name: "Book",
//   //         icon: "fa-book",
//   //         jsonSchema: JSON.stringify(BookSchema),
//   //         collectionName: 'Book',
//   //     },
//   //     {
//   //         _id: "01ed151phx9528t04np8f7cahn",
//   //         name: "Library",
//   //         icon: "fa-book",
//   //         jsonSchema: JSON.stringify(LibrarySchema),
//   //         collectionName: 'Library',
//   //     }, {
//   //         _id: "01ed151phxfx5gq9a2za77vd3q",
//   //         name: "Address",
//   //         icon: "fa-book",
//   //         jsonSchema: JSON.stringify(AddressSchema),
//   //         collectionName: 'Address',
//   //     },
//   //     {
//   //         _id: "01ed151phxfx5gq9a2za77vd4q",
//   //         name: "Process",
//   //         icon: "fa-book",
//   //         jsonSchema: JSON.stringify(ProcessSchema),
//   //         collectionName: 'Process',
//   //     },
//   //     {
//   //         _id: "01ed151phxfx5gq9a2za78vd4q",
//   //         name: "Step",
//   //         icon: "fa-book",
//   //         jsonSchema: JSON.stringify(StepSchema),
//   //         collectionName: 'Step',
//   //     },
//   //     {
//   //         _id: "02ed151phxfx5gq9a2za78vd4q",
//   //         name: "Dream",
//   //         icon: "fa-book",
//   //         jsonSchema: JSON.stringify(DreamSchema),
//   //         collectionName: 'Dream',
//   //     }
//   //     ];
//   //     var modelHelper = new ModelHelper(seed);

//   //     modelHelper.modelQuanta.forEach(async quant => {
//   //         await OmoCollection.createOmoCollection(quant.collectionName, quant.toTextileSchema(), this.threadId, client);
//   //     })

//   //     await this.quantaCollection.deleteMany(seed.map(x => x._id));
//   //     // todo remove that truncate
//   //     await this.quantaCollection.truncate();
//   //     await this.quantaCollection.createMany(modelHelper.quanta);
//   // }

//   // async  all(): Promise<Quant[]> {
//   //     return await this.quantaCollection.all();
//   // }

//   // async subscribe(callback: Function) {
//   //     await this.quantaCollection.subscribe(["ALL"], callback);
//   // }

//   // async getCollection<T>(collectionName: string): Promise<OmoCollection<T>> {
//   //     var collection = await this.quantaCollection.find<any>({ ands: [{ fieldPath: "collectionName", value: { string: collectionName } }] });
//   //     if (collection.length != 1)
//   //         throw new Error("No ore multiple collection found");
//   //     return OmoCollection.byName<T>(collectionName, this.threadId, JSON.parse(collection[0].jsonSchema));
//   // }


//   // getCollectionWithoutSchema(collectionName: string) {
//   //     return OmoCollection.byName(collectionName, this.threadId);

//   // }

//   // async subscribeChanges(pubsub: PubSub, quanta: Quant[]) {
//   //     var client = await TextileHub.getInstance().getClient();
//   //     quanta.forEach(quant => {
//   //         this.createSubscription(client, quant.collectionName, "CREATE", "_added", pubsub)
//   //         this.createSubscription(client, quant.collectionName, "SAVE", "_updated", pubsub)
//   //         this.createSubscription(client, quant.collectionName, "DELETE", "_deleted", pubsub)
//   //         this.createSubscription(client, quant.collectionName, "ALL", "_changed", pubsub)
//   //     });
//   // }

//   // private createSubscription(client: Client, collectionName: string, actionType: string, postfix: string, pubsub: PubSub) {
//   //     if (this.listened.some(x => x == collectionName))
//   //         return;
//   //     client.listen(this.threadId, [
//   //         {
//   //             collectionName: collectionName,
//   //             actionTypes: [actionType]
//   //         }
//   //     ],
//   //         (reply, error) => {
//   //             console.log("LISTENED: " + collectionName + postfix, reply, pubsub);
//   //             if (reply) {
//   //                 pubsub.publish(collectionName + postfix, reply.instance._id)
//   //                 pubsub.publish(reply.instance._id + postfix, reply.instance._id)
//   //             }
//   //             if (error)
//   //                 console.error(error);
//   //         }
//   //     );
//   //     this.listened.push(collectionName);
//   // }
// }
