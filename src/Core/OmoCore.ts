import { OmoStore } from "./Store/OmoStore";
import { Quantum } from "./Data/Quantum";
import { GraphQL } from "./Data/GraphQL";
import { Omo } from "./Entities/Omo";
import { TextileHub } from "./TextileHub";

export class OmoCore {
    store: OmoStore;
    quantum: Quantum;
    graphql: GraphQL;
    hub: TextileHub;

    private constructor(store, quantum, graphql) {
        this.store = store;
        this.quantum = quantum;
        this.graphql = graphql;
        this.hub = TextileHub.getInstance();
    }

    static async load(): Promise<OmoCore> {
        var store = await OmoStore.getInstance();
        var quantum = await Quantum.initQuantum();
        var graphQL = await GraphQL.init(quantum);
        return new OmoCore(store, quantum, graphQL);
    }
}