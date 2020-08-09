import { Threads } from "./textile/Threads";
import { QuantRegistry } from "./quant/QuantRegistry";
import { GraphQL } from "./data/GraphQL";
import { StopWatch } from "./StopWatch";

export class Quantum {
  readonly graphQL: GraphQL;
  readonly quantRegistry: QuantRegistry;
  readonly threads: Threads;

  private constructor(threads: Threads, quantRegistry: QuantRegistry, graphQL: GraphQL) {
    this.threads = threads;
    this.quantRegistry = quantRegistry;
    this.graphQL = graphQL;
  }

  static async leap(): Promise<Quantum> {
    StopWatch.start("threads");
    var threads = new Threads();
    StopWatch.stop("threads");

    StopWatch.start("registry");
    var quantRegistry = await QuantRegistry.init(threads, true);
    StopWatch.stop("registry");

    StopWatch.start("graphQL");
    var graphQL = await GraphQL.init(quantRegistry);
    StopWatch.stop("graphQL");


    quantRegistry.syncAllCollections();

    return new Quantum(threads, quantRegistry, graphQL);
  }
}
