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

  private constructor(
    threads: Threads,
    odentity: Odentity,
    quantRegistry: QuantRegistry,
    graphQL: GraphQL
  ) {
    this.odentity = odentity;
    this.threads = threads;
    this.quantRegistry = quantRegistry;
    this.graphQL = graphQL;
  }

  static async leap(): Promise<Quantum> {
    let start = performance.now();
    var threads = new Threads();
    let end = performance.now();
    console.log(`threads takes ${end - start}ms`);

    start = end;
    var odentity = await Odentity.init(threads);
    end = performance.now();
    console.log(`odentity takes ${end - start}ms`);

    start = end;
    var quantRegistry = await QuantRegistry.init(threads);
    end = performance.now();
    console.log(`registry takes ${end - start}ms`);

    var seeder = new Seeder();
    await seeder.createCollections(quantRegistry);

    start = end;
    var graphQL = await GraphQL.init(quantRegistry);
    end = performance.now();
    console.log(`graphql takes ${end - start}ms`);

    return new Quantum(threads, odentity, quantRegistry, graphQL);
  }
}
