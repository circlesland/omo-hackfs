import { Odentity } from "./Odentity";
import { Threads } from "./Textile/Threads";
import { QuantRegistry } from "./Quant/QuantRegistry";
import { GraphQL } from "./Data/GraphQL";
import { Seeder } from "./Data/Seeder";
import { LocalThread } from "./Textile/LocalThread";
import { throwError } from "rxjs";
import { RemoteThread } from "./Textile/RemoteThread";
import { StopWatch } from "./StopWatch";

export class Quantum {
    odentity: Odentity;
    graphQL: GraphQL;
    quantRegistry: QuantRegistry;
    threads: Threads;
    // localDB: LocalThread;
    // remoteDB: RemoteThread;

    // private constructor(threads: Threads, odentity: Odentity, quantRegistry: QuantRegistry, graphQL: GraphQL) {
    //     this.odentity = odentity;
    //     this.threads = threads;
    //     this.quantRegistry = quantRegistry;
    //     this.graphQL = graphQL;
    // }
    private constructor(threads: Threads, odentity: Odentity, quantRegistry: QuantRegistry, graphQL: GraphQL) {
        this.threads = threads;

        this.odentity = odentity;
        // this.localDB = thread;
        // this.remoteDB = thread2;
        this.quantRegistry = quantRegistry;
        this.graphQL = graphQL;
    }
    static async leap(): Promise<Quantum> {
        StopWatch.start("threads");
        var threads = new Threads();
        StopWatch.stop("threads");
        StopWatch.start("Odentity");
        var odentity = await Odentity.init(threads);
        StopWatch.stop("Odentity");

        var quantRegistry = await QuantRegistry.init(threads);
        var seeder = new Seeder();
        await seeder.createCollections(quantRegistry);
        var graphQL = await GraphQL.init(quantRegistry);
        // return new Quantum(threads, odentity, uantRegistry, graphQL);
        // var local = await LocalThread.init("omodb");
        // var remote = await RemoteThread.init("omoooooodb");
        return new Quantum(threads, odentity, quantRegistry, graphQL);
    }
}
