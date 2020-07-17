// import { Quant } from "../Data/Entities/Quant";
// import { Quantum } from "./QuantumBackup";
// import { GraphQLSchema, printSchema, graphql, subscribe, parse, ExecutionResult } from "graphql";
// import { makeExecutableSchema } from '@graphql-tools/schema';
// import { ModelHelper } from "./ModelHelper";
// import { ModelQuant } from "./ModelQuant";

// export class GraphQL {
//     // private quanta: Quant[];
//     // private quantum: Quantum;
//     // private graphQLSchema: GraphQLSchema;


//     // private constructor(quanta: Quant[], quantum: Quantum) {
//     //     this.quantum = quantum;
//     //     this.quanta = quanta;
//     //     this.graphQLSchema = this.updateGraphQLSchema();
//     // }

//     // private async subscribeQuantaUpdate(quantum: Quantum) {
//     //     await quantum.subscribe(async quantArray => {
//     //         this.quanta = quantArray;
//     //         this.updateGraphQLSchema();
//     //         await quantum.subscribeChanges(ModelQuant.pubsub, this.quanta);
//     //     })
//     // }

//     // getSchema(): GraphQLSchema {
//     //     return this.graphQLSchema;
//     // }

//     // printSchema(): string {
//     //     return printSchema(this.graphQLSchema);
//     // }
//     // async execute(query) {
//     //     return await graphql(this.getSchema(), query);
//     // }
//     // /**
//     //  * @param query example await o.graphql.query('Books {_id name}') 
//     //  */
//     // async query(query) {
//     //     return await graphql(this.getSchema(), `query { ${query}}`);
//     // }
//     // /**
//     // * 
//     // * @param query example await o.graphql.mutation('addBook(name:"testbuch"){_id name}')
//     // */
//     // async mutation(query) {
//     //     return await graphql(this.getSchema(), `mutation { ${query} }`);
//     // }

//     // private updateGraphQLSchema(): GraphQLSchema {
//     //     var modelHelper = new ModelHelper(this.quanta);
//     //     var typeDefs: any = modelHelper.getGraphQLTypeDefs();
//     //     var resolvers: any = modelHelper.getGraphQLResolvers(this.quantum);
//     //     this.graphQLSchema = makeExecutableSchema({ typeDefs, resolvers });
//     //     return this.graphQLSchema;
//     // }

//     // subscribe(query, callback) {
//     //     this.getSubscription(query).then(
//     //         subscription => {
//     //             (async () => {
//     //                 for await (let value of subscription)
//     //                     callback(value.data);
//     //             })();
//     //         }
//     //     )
//     // }

//     // private async getSubscription(query) {
//     //     return (await subscribe({
//     //         schema: this.getSchema(),
//     //         document: parse(query),
//     //         rootValue: "data",
//     //     })) as AsyncIterableIterator<ExecutionResult>;
//     // }

//     // // private getArguments(schema: JSONSchema) {
//     // //     var args = {};
//     // //     if (schema.properties)
//     // //         Object.keys(schema.properties).forEach(key => {
//     // //             args[key] = {
//     // //                 type: GraphQLString
//     // //             }
//     // //         })
//     // //     return args;
//     // // }

//     // // private getMutations(map: Map<Quant, GraphQLObjectType>): Thunk<GraphQLFieldConfigMap<any, any>> {
//     // //     var mutations: Thunk<GraphQLFieldConfigMap<any, any>> = {};
//     // //     map.forEach((type, quant) => {
//     // //         let collection = this.quantum.getCollectionWithoutSchema(quant.collectionName);
//     // //         let schema = JSON.parse(quant.jsonSchema);
//     // //         let args = this.getArguments(schema);
//     // //         mutations[`add${quant.name}`] = {
//     // //             args,
//     // //             resolve: async (root: any, data: any) => {
//     // //                 data = await collection.create(data);
//     // //                 return data;
//     // //             },
//     // //             type
//     // //         };
//     // //         mutations[`update${quant.name}`] = {
//     // //             args,
//     // //             resolve: async (root: any, data: any) => {
//     // //                 var entity = await collection.findById<any>(data.ID);
//     // //                 Object.keys(data).forEach(key => entity[key] = data[key]);
//     // //                 await collection.save(entity);
//     // //                 return entity;
//     // //             },
//     // //             type
//     // //         };
//     // //         mutations[`addOrUpdate${quant.name}`] = {
//     // //             args,
//     // //             resolve: async (root: any, data: any) => {
//     // //                 var entity;
//     // //                 if (data.ID) {
//     // //                     entity = await collection.findById<any>(data.ID);
//     // //                     Object.keys(data).forEach(key => entity[key] = data[key]);
//     // //                     await collection.save(entity);
//     // //                     return entity;
//     // //                 } else {
//     // //                     entity = await collection.create(data);
//     // //                 }
//     // //                 return entity;
//     // //             },
//     // //             type
//     // //         };
//     // //         mutations[`delete${quant.name}`] = {
//     // //             args: { ID: { type: GraphQLID } },
//     // //             resolve: async (root: any, data: any) => {
//     // //                 try {
//     // //                     await collection.delete(data.ID);
//     // //                     return true;
//     // //                 }
//     // //                 catch (e) {
//     // //                     return false;
//     // //                 }
//     // //             },
//     // //             type: GraphQLBoolean
//     // //         };
//     // //     })
//     // //     return mutations;
//     // // }

//     // static async init(quantum: Quantum): Promise<GraphQL> {
//     //     var quant = await quantum.all();
//     //     var graphql = new GraphQL(quant, quantum);
//     //     await quantum.subscribeChanges(ModelQuant.pubsub, quant);
//     //     graphql.subscribeQuantaUpdate(quantum);
//     //     return graphql;
//     // }
// }