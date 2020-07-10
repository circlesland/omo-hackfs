import { OmoStore } from "./Store/OmoStore";
import { Quanta } from "./Data/Quanta";
import { GraphQL } from "./Data/GraphQL";
import { Omo } from "./Entities/Omo";

export class OmoCore {
    store: OmoStore;
    quanta: Quanta;
    graphql: GraphQL;

    private constructor(store, quanta, graphql) {
        this.store = store;
        this.quanta = quanta;
        this.graphql = graphql;
    }

    static async load(): Promise<OmoCore> {
        var store = await OmoStore.getInstance();
        var quanta = await Quanta.initQuanta();
        var graphQL = await GraphQL.init(quanta);
        return new OmoCore(store, quanta, graphQL);
    }
}