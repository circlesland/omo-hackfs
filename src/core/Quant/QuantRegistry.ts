import { Quant } from "../Data/Entities/Quant";
import { Threads } from "../Textile/Threads";
import { Seeder } from "../Data/Seeder";
import { Quant as QuantSchema } from "../../schema/omo/quant";
import { ModelHelper } from "../Data/ModelHelper";
import { SyncedCollection } from "../Textile/SyncedCollection";
import { SyncedThread } from "../Textile/SyncedThread";

export class QuantRegistry {
  quantThread: SyncedThread;
  quantaCollection: SyncedCollection<Quant>;
  modelHelper: ModelHelper;

  private constructor(quantaCollection: SyncedCollection<Quant>, quantThread: SyncedThread, modelHelper: ModelHelper) {
    this.quantaCollection = quantaCollection;
    this.quantThread = quantThread;
    this.modelHelper = modelHelper;
  }

  async resetToDefault() {
    await this.quantaCollection.truncate();
  }

  static async init(threads: Threads, seed: boolean = false): Promise<QuantRegistry> {
    var quantaThread = await threads.getOrCreateThread("QUANTA", process.env.QUANTATHREAD);
    var quantaCollection = await quantaThread.getOrCreateCollection<Quant>("QUANTA", QuantSchema, true);
    await quantaCollection.truncate();
    var modelHelper = await this.getModelHelper(quantaCollection, seed)
    var instance = new QuantRegistry(quantaCollection, quantaThread, modelHelper);
    return instance;
  }

  async getCollection(collectionName) {
    var quant = this.modelHelper.modelQuanta.find(x => x.collectionName == collectionName);
    if (!quant) throw new Error("Quant not registered");
    return this.quantThread.getOrCreateCollection(collectionName, quant.toTextileSchema());
  }

  static async getModelHelper(collection: SyncedCollection<Quant>, seed: boolean): Promise<ModelHelper> {
    var quanta = await collection.all();

    if (seed) {
      var seeder = new Seeder();
      var seedQuanta = await seeder.getSeed("quanta");
      for (let q of seedQuanta) {
        var arr = quanta.filter(x => x.name != q.name);
        var newQuant = quanta.find(x => x.name == q.name) || new Quant();
        newQuant.collectionName = q.name;
        newQuant.jsonSchema = JSON.stringify(q.schema);
        newQuant.name = q.name;
        arr.push(newQuant);
        quanta = arr;
      }
    }

    var modelHelper = new ModelHelper(quanta);

    if (seed)
      quanta = await collection.createOrSaveMany(modelHelper.quanta);

    return modelHelper;
  }
}
