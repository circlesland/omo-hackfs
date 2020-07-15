import { Odentity } from "./Odentity";
import { TextileHub } from "./TextileHub/TextileHub";

export class OmoCore {
    // store: OmoStore;
    // quantum: Quantum;
    // graphql: GraphQL;
    hub: TextileHub;
    odentity: Odentity;

    private constructor(odentity: Odentity, hub: TextileHub) {
        this.odentity = odentity;
        this.hub = hub;
        // this.store = store;
        // this.quantum = quantum;
        // this.graphql = graphql;
    }

    static async start(): Promise<OmoCore> {
        var hub = await TextileHub.init();
        var odentity = await Odentity.init(hub);
        // var store = await OmoStore.getInstance();
        // var quantum = await Quantum.initQuantum();
        // var graphQL = await GraphQL.init(quantum);
        return new OmoCore(odentity, hub);
    }
}