import { GraphQLSchema, printSchema, graphql, subscribe, parse, ExecutionResult, GraphQLString, GraphQLObjectType, Thunk, GraphQLFieldConfigMap, GraphQLID, GraphQLBoolean } from "graphql";
import { Quant } from "./Entities/Quant";
import { QuantRegistry } from "../Quant/QuantRegistry";
import { ModelHelper } from "./ModelHelper";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SyncedThread } from "../Textile/SyncedThread";
import { JSONSchema } from "@textile/hub";

export class GraphQL {
    private quanta: Quant[];
    private thread: SyncedThread;
    private graphQLSchema: GraphQLSchema;

    private constructor(quanta: Quant[], thread: SyncedThread, schema: GraphQLSchema) {
        this.quanta = quanta;
        this.thread = thread;
        this.graphQLSchema = schema;
    }

    static async init(registry: QuantRegistry): Promise<GraphQL> {
        var quanta = await registry.quantaCollection.all();
        var schema = await this.updateGraphQLSchema(quanta, registry.quantThread);
        var graphql = new GraphQL(quanta, registry.quantThread, schema);

        // await quantum.subscribeChanges(ModelQuant.pubsub, quant);
        // graphql.subscribeQuantaUpdate(quantum);
        return graphql;
    }

    //     // private async subscribeQuantaUpdate(quantum: Quantum) {
    //     //     await quantum.subscribe(async quantArray => {
    //     //         this.quanta = quantArray;
    //     //         this.updateGraphQLSchema();
    //     //         await quantum.subscribeChanges(ModelQuant.pubsub, this.quanta);
    //     //     })
    //     // }

    getSchema(): GraphQLSchema {
        return this.graphQLSchema;
    }

    printSchema(): string {
        return printSchema(this.graphQLSchema);
    }
    async execute(query) {
        return await graphql(this.getSchema(), query);
    }
    /**
     * @param query example await o.graphql.query('Books {_id name}') 
     */
    async query(query) {
        return await graphql(this.getSchema(), `query { ${query}}`);
    }
    /**
    * 
    * @param query example await o.graphql.mutation('addBook(name:"testbuch"){_id name}')
    */
    async mutation(query) {
        return await graphql(this.getSchema(), `mutation { ${query} }`);
    }

    private static async updateGraphQLSchema(quanta: Quant[], thread: SyncedThread): Promise<GraphQLSchema> {
        var modelHelper = new ModelHelper(quanta);
        var typeDefs: any = modelHelper.getGraphQLTypeDefs();
        var resolvers: any = await modelHelper.getGraphQLResolvers(thread);
        return makeExecutableSchema({ typeDefs, resolvers });
    }

    subscribe(query, callback) {
        this.getSubscription(query).then(
            subscription => {
                (async () => {
                    for await (let value of subscription)
                        callback(value.data);
                })();
            }
        )
    }

    private async getSubscription(query) {
        return (await subscribe({
            schema: this.getSchema(),
            document: parse(query),
            rootValue: "data",
        })) as AsyncIterableIterator<ExecutionResult>;
    }

    private getArguments(schema: JSONSchema) {
        var args = {};
        if (schema.properties) {
            for (let key of Object.keys(schema.properties)) {
                args[key] = {
                    type: GraphQLString
                }
            }
        }
        return args;
    }

    private async getMutations(map: Map<Quant, GraphQLObjectType>): Promise<Thunk<GraphQLFieldConfigMap<any, any>>> {
        var mutations: Thunk<GraphQLFieldConfigMap<any, any>> = {};
        for (var [quant, type] of map) {
            let collection = await this.thread.getCollection(quant.collectionName);
            let schema = JSON.parse(quant.jsonSchema);
            let args = this.getArguments(schema);
            mutations[`add${quant.name}`] = {
                args,
                resolve: async (root: any, data: any) => {
                    data = await collection.create(data);
                    return data;
                },
                type
            };
            mutations[`update${quant.name}`] = {
                args,
                resolve: async (root: any, data: any) => {
                    var entity = await collection.findById(data.ID);
                    for (let key of Object.keys(data)) {
                        entity[key] = data[key];
                    }
                    await collection.save(entity);
                    return entity;
                },
                type
            };
            mutations[`addOrUpdate${quant.name}`] = {
                args,
                resolve: async (root: any, data: any) => {
                    var entity;
                    if (data.ID) {
                        entity = await collection.findById(data.ID);
                        for (let key of Object.keys(data)) {
                            entity[key] = data[key];
                        }
                        await collection.save(entity);
                        return entity;
                    } else {
                        entity = await collection.create(data);
                    }
                    return entity;
                },
                type
            };
            mutations[`delete${quant.name}`] = {
                args: { ID: { type: GraphQLID } },
                resolve: async (root: any, data: any) => {
                    try {
                        await collection.delete(data.ID);
                        return true;
                    }
                    catch (e) {
                        return false;
                    }
                },
                type: GraphQLBoolean
            };
        }
        return mutations;
    }
}