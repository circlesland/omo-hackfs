import { Quant } from "../Entities/Quant";
import { Quanta } from "./Quanta";
import { GraphQLObjectType, GraphQLString, Thunk, GraphQLFieldConfigMap, GraphQLSchema, GraphQLID, printSchema, GraphQLList, GraphQLBoolean, graphql, subscribe, parse, ExecutionResult } from "graphql";
import { PubSub } from 'graphql-subscriptions';
import { JSONSchema } from "@textile/threads-database";
let pluralize = require('pluralize');


export class GraphQL {
    private quanta: Quant[];
    private Quanta: Quanta;
    private graphQLSchema: GraphQLSchema;
    private static pubsub = new PubSub();


    private constructor(quanta: Quant[], Quanta: Quanta) {
        this.Quanta = Quanta;
        this.quanta = quanta;
        this.graphQLSchema = this.updateGraphQLSchema();
    }

    private async subscribeQuantaUpdate(quanta: Quanta) {
        await quanta.subscribe(async quantArray => {
            this.quanta = quantArray;
            this.updateGraphQLSchema();
            await quanta.subscribeChanges(GraphQL.pubsub, this.quanta);
        })
    }

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
    /**
     * example call 
     * o.graphql.subscription("{Books {name }}").then(
        subscription => {
          (async () => {
            for await (let value of subscription) {
              console.log(value.data);
            }
          })();
        }
      );
     */
    async subscription(query) {
        return (await subscribe({
            schema: this.getSchema(),
            document: parse("subscription " + query),
            rootValue: "data",
        })) as AsyncIterableIterator<ExecutionResult>;
    }

    private updateGraphQLSchema(): GraphQLSchema {
        let map = this.getQuantTypeMap(this.quanta);
        this.graphQLSchema = new GraphQLSchema({
            query: new GraphQLObjectType({
                fields: this.getQueries(map),
                name: "query",
            }),
            mutation: new GraphQLObjectType({
                fields: this.getMutations(map),
                name: "mutation"
            }),
            subscription: new GraphQLObjectType({
                fields: this.getSubscriptions(map),
                name: "subscription"
            })
        });
        return this.graphQLSchema;
    }

    private getSubscriptions(map: Map<Quant, GraphQLObjectType>): Thunk<GraphQLFieldConfigMap<any, any>> {
        var subscriptions: Thunk<GraphQLFieldConfigMap<any, any>> = {};
        map.forEach((type, quant) => {
            let collection = this.Quanta.getCollection(quant.collectionName);

            subscriptions[pluralize(quant.name)] = {
                type: GraphQLList(type),
                subscribe: async () => GraphQL.pubsub.asyncIterator(quant.collectionName + "_changed"),
                resolve: async () => await collection.find({})
            };
            subscriptions[`${quant.name}ById`] = {
                args: { ID: { type: GraphQLID } },
                type: type,
                subscribe: async (root: any, data: any) => GraphQL.pubsub.asyncIterator(data.ID + "_changed"),
                resolve: async (payload: any) => { console.log(JSON.stringify(payload)); return await collection.findById(payload.id); }
            };
            subscriptions[quant.name + "Added"] = {
                type: type,
                subscribe: async () => GraphQL.pubsub.asyncIterator(quant.collectionName + "_added"),
                resolve: async (id: string) => await collection.findById(id)
            };
            subscriptions[quant.name + "Updated"] = {
                type: type,
                subscribe: async () => GraphQL.pubsub.asyncIterator(quant.collectionName + "_updated"),
                resolve: async (id: string) => await collection.findById(id)
            };
            subscriptions[quant.name + "Deleted"] = {
                type: GraphQLID,
                subscribe: async () => GraphQL.pubsub.asyncIterator(quant.collectionName + "_deleted"),
                resolve: async (id: string) => id
            };
        })
        return subscriptions;
    }

    private getQueries(map: Map<Quant, GraphQLObjectType>): Thunk<GraphQLFieldConfigMap<any, any>> {
        var queries: Thunk<GraphQLFieldConfigMap<any, any>> = {};
        map.forEach((type, quant) => {
            var collection = this.Quanta.getCollection(quant.name);
            queries[pluralize(quant.name)] = {
                type: GraphQLList(type),
                resolve: async () => {
                    return await collection.find({})
                }
            };

            queries[quant.name + 'ById'] = {
                type,
                args: { ID: { type: GraphQLID } },
                resolve: async (root: any, payload: any) => await collection.findById(payload.ID)
            };
        })
        return queries;
    }

    private getArguments(schema: JSONSchema) {
        var args = {};
        if (schema.properties)
            Object.keys(schema.properties).forEach(key => {
                args[key] = {
                    type: GraphQLString
                }
            })
        return args;
    }

    private getMutations(map: Map<Quant, GraphQLObjectType>): Thunk<GraphQLFieldConfigMap<any, any>> {
        var mutations: Thunk<GraphQLFieldConfigMap<any, any>> = {};
        map.forEach((type, quant) => {
            let collection = this.Quanta.getCollection(quant.collectionName);
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
                    var entity = await collection.findById<any>(data.ID);
                    Object.keys(data).forEach(key => entity[key] = data[key]);
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
                        entity = await collection.findById<any>(data.ID);
                        Object.keys(data).forEach(key => entity[key] = data[key]);
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
        })
        return mutations;
    }

    private getQuantTypeMap(quanta: Quant[]): Map<Quant, GraphQLObjectType<any, any>> {
        var map: Map<Quant, GraphQLObjectType<any, any>> = new Map();
        quanta.forEach(quant => {
            map.set(quant, new GraphQLObjectType({
                fields: this.getFields(quant),
                name: quant.name
            }));
        })
        return map;
    }

    private getFields(quant: Quant): Thunk<GraphQLFieldConfigMap<any, any>> {
        var schema: JSONSchema = JSON.parse(quant.jsonSchema);
        var fields: Thunk<GraphQLFieldConfigMap<any, any>> = {};

        if (schema.properties) {
            let properties = Object.keys(schema.properties);
            properties.forEach(property => {
                fields[property] = { type: GraphQLString }
            });
        }
        return fields;
    }

    static async init(quanta: Quanta): Promise<GraphQL> {
        var quant = await quanta.all();
        var graphql = new GraphQL(quant, quanta);
        await quanta.subscribeChanges(this.pubsub, quant);
        graphql.subscribeQuantaUpdate(quanta);
        return graphql;
    }
}