import { Instance } from "@textile/threads-store";
import { Collection, FilterQuery } from "@textile/hub";
import { ICollection } from "./ICollection";
import { Result, Database } from "@textile/threads-database";

export class LocalCollection<T extends Instance> implements ICollection<T>
{
  private collection: Collection<T>;
  private database: Database;
  collectionName: string;

  constructor(collectionName: string, database: Database) {
    this.collectionName = collectionName;
    this.database = database;
    if (!database.collections.has(collectionName)) throw new Error(`Collection "${collectionName}" not found in database`);
    this.collection = database.collections.get(collectionName) as Collection<T>;
  }

  private async toArray<T>(iterator: AsyncIterable<Result<T>>): Promise<T[]> {
    const arr = Array<T>();
    for await (const entry of iterator) {
      arr.push(entry.value);
    }
    return arr;
  }

  async all(): Promise<T[]> {
    return await this.find({});
  }

  async find(query: FilterQuery<T>): Promise<T[]> {
    var result = this.collection.find(query);
    return await this.toArray<T>(result);
  }

  async findById(id: string): Promise<T> {
    return await this.collection.findById(id);
  }

  async deleteCollection(): Promise<void> {
    throw new Error("NotSupported");
  }

  async truncate(): Promise<void> {
    var ids = (await this.find({})).map(x => x._id);
    this.collection.delete(...ids);
  }

  async create(value: T): Promise<T> {
    await this.collection.insert(value);
    return value;
  }

  async createMany(values: T[]): Promise<T[]> {
    await this.collection.insert(...values);
    return values;
  }

  async save(value: T): Promise<T> {
    await this.collection.save(value);
    return value;
  }

  async saveMany(values: T[]): Promise<T[]> {
    await this.collection.save(...values);
    return values;
  }

  async delete(value: T): Promise<void> {
    await this.collection.delete(value._id);
  }

  async deleteMany(values: T[]): Promise<void> {
    await this.collection.delete(...values.map(x => x._id));
  }

  async deleteById(value: string): Promise<void> {
    await this.collection.delete(value);
  }

  async deleteManyByIds(values: string[]): Promise<void> {
    await this.collection.delete(...values);
  }

  async observeUpdate(actionTypes: string[], id: string, callback: any): Promise<void> {
    this.database.emitter.on(`${this.collectionName}.*.*`,
      async (update) => {
        console.log("UPDATE", update);
        callback(update);
      });
  }

  observeAction(actionTypes: Map<string, Function>, id: string | null) {
    actionTypes.forEach((callback, actionType, map) => {
      let observeType = '*'; // default listen to all

      switch (actionType.toLowerCase()) {
        case "create": observeType = '0'; break;
        case "save": observeType = '1'; break;
        case "delete": observeType = '2'; break;
      };

      this.database.emitter.on(`${this.collectionName}.*.${observeType}`,
        async (update) => {
          console.log("UPDATE", update);
          callback(update);
        });
    })
  }
}

export type Update = {
  Collection: string;
  Type: UpdateType;
  Id: string;
}

export enum UpdateType {
  CREATE,
  SAVE,
  DELETE,
  ALL
}
