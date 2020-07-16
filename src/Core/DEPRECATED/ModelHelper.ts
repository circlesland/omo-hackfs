import { Quant } from "../Data/Entities/Quant";
import { ModelQuant } from "./ModelQuant";
import { Quantum } from "./QuantumBackup";
import { PubSub } from "graphql-subscriptions";

export class ModelHelper {
    // getGraphQLResolvers(quantum: Quantum): any {
    //     var query: any = {};
    //     var subscription: any = {};
    //     var mutation: any = {};
    //     var typeResolvers: any = {};

    //     this.modelQuanta.forEach(modelQuant => {
    //         modelQuant.addQueryResolver(query, quantum);
    //         modelQuant.addMutationResolver(mutation, quantum);
    //         modelQuant.addSubscriptionResolver(subscription, quantum);
    //         modelQuant.addTypeResolver(typeResolvers, quantum);
    //     });

    //     var resolvers = {
    //         Query: query,
    //         Subscription: subscription,
    //         Mutation: mutation

    //     }

    //     Object.keys(typeResolvers).forEach(key => resolvers[key] = typeResolvers[key]);
    //     return resolvers;
    // }
    // modelQuanta: ModelQuant[];
    // quanta: Quant[];

    // constructor(quanta: Quant[]) {
    //     this.modelQuanta = [];
    //     quanta.forEach(quant => this.modelQuanta.push(ModelQuant.byQuant(quant)));
    //     this.modelQuanta.forEach(modelQuant => modelQuant.UpdateRelations(this.modelQuanta))
    //     this.quanta = quanta.map(
    //         x => {
    //             var schema = (this.modelQuanta.find(m => m.collectionName == x.collectionName) as ModelQuant).toJsonSchema();
    //             x.jsonSchema = JSON.stringify(schema);
    //             return x;
    //         })
    // }

    // getGraphQLTypeDefs() {
    //     var typedef = "";
    //     var query = "";
    //     var mutation = "";
    //     var subscription = "";

    //     this.modelQuanta.forEach(modelQuant => {
    //         typedef += modelQuant.toGraphQlTypeDefs();
    //         query += modelQuant.getGraphQlQuery();
    //         mutation += modelQuant.getGraphQlMutation();
    //         subscription += modelQuant.getGraphQlSubscription();
    //     });

    //     return `
    //     ${typedef}
    //     type Query {
    //         ${query}
    //     }
    //     type Mutation {
    //         ${mutation}
    //     }
    //     type Subscription {
    //         ${subscription}
    //     }`;
    // }
}