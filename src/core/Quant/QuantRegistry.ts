import { Quant } from "../Data/Entities/Quant";
import { Threads } from "../Textile/Threads";
import { SeedQuant } from "../Data/Seeder";
import { Quant as QuantSchema } from "../../schema/omo/quant";
import { ModelHelper } from "../Data/ModelHelper";
import { SyncedCollection } from "../Textile/SyncedCollection";
import { SyncedThread } from "../Textile/SyncedThread";

export class QuantRegistry {
  private threads: Threads;
  quantThread: SyncedThread;
  quantaCollection: SyncedCollection<Quant>;

  private constructor(threads: Threads, quantaCollection: SyncedCollection<Quant>, quantThread: SyncedThread) {
    this.threads = threads;
    this.quantaCollection = quantaCollection;
    this.quantThread = quantThread;
  }

  static async init(threads: Threads): Promise<QuantRegistry> {
    var quantaThread = await threads.getOrCreateThread("QUANTA");
    var quantaCollection = await quantaThread.getOrCreateCollection<Quant>("QUANTA", QuantSchema);
    await quantaCollection.truncate();
    var instance = new QuantRegistry(threads, quantaCollection, quantaThread);
    return instance;
  }

  async RegisterSeedQuanta(seedQuanta: SeedQuant[]) {
    var quanta = await this.quantaCollection.all();
    for (let q of seedQuanta) {
      var arr = quanta.filter(x => x.name != q.name);

      var newQuant = quanta.find(x => x.name == q.name) || new Quant();
      newQuant.collectionName = q.name;
      newQuant.jsonSchema = JSON.stringify(q.schema);
      newQuant.name = q.name;
      arr.push(newQuant);
      quanta = arr;
    }
    //debugger;
    var modelHelper = new ModelHelper(quanta);
    // await this.quantaCollection.truncate();
    await this.quantaCollection.createOrSaveMany(modelHelper.quanta);
    for (let quant of modelHelper.modelQuanta) {
      await this.quantThread.getOrCreateCollection(quant.collectionName, quant.toJsonSchema());
      console.log("seed");
    }
  }
}
