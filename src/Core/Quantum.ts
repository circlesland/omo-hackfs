import { Odentity } from "./Odentity";
import { Threads } from "./Textile/Threads";
import { QuantRegistry } from "./Quant/QuantRegistry";
import { GraphQL } from "./Data/GraphQL";
import { Seeder } from "./Data/Seeder";

export class Quantum {
    odentity: Odentity;
    graphQL: GraphQL;
    quantRegistry: QuantRegistry;
    threads: Threads;

    private constructor(threads: Threads, odentity: Odentity, quantRegistry: QuantRegistry, graphQL: GraphQL) {
        this.odentity = odentity;
        this.threads = threads;
        this.quantRegistry = quantRegistry;
        this.graphQL = graphQL;
    }

    static async leap(): Promise<Quantum> {
        var threads = new Threads();
        var odentity = await Odentity.init(threads);
        var quantRegistry = await QuantRegistry.init(threads);
        var seeder = new Seeder();
        await seeder.createCollections(quantRegistry);
        var graphQL = await GraphQL.init(quantRegistry);
        return new Quantum(threads, odentity, quantRegistry, graphQL);
    }
}