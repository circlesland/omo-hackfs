import { Instance } from "@textile/threads-store";
import { ICollection } from "./ICollection";
import { RemoteCollection } from "./RemoteCollection";
import { LocalCollection } from "./LocalCollection";
import { FilterQuery } from "@textile/hub";
import { LocalThread } from "./LocalThread";
import { RemoteThread } from "./RemoteThread";

export class SyncedCollection<T extends Instance> implements ICollection<T>
{
  collectionName: string;
  localCollection: LocalCollection<T>;
  remoteCollection: RemoteCollection<T>;
  static syncedCollections: string[] = [];

  private constructor(localCollection: LocalCollection<T>, remoteCollection: RemoteCollection<T>, collectionName: string) {
    this.localCollection = localCollection;
    this.remoteCollection = remoteCollection;
    this.collectionName = collectionName;
  }


  static async init<T extends Instance>(collectionName: string, localThread: LocalThread, remoteThread: RemoteThread): Promise<SyncedCollection<T>> {
    let localCollection = await localThread.getCollection<T>(collectionName);
    let remoteCollection = await remoteThread.getCollection<T>(collectionName);
    let instance = new SyncedCollection<T>(localCollection, remoteCollection, collectionName);
    if (!this.syncedCollections.some(x => x == collectionName)) {
      this.syncedCollections.push(collectionName);
      this.fakeSyncCollections<T>(localCollection, remoteCollection, collectionName);
    }
    return instance;
  }

  private static async fakeSyncCollections<T extends Instance>(localCollection: LocalCollection<T>, remoteCollection: RemoteCollection<T>, collectionName: string) {
    console.log(`start sync with ${collectionName}`)
    let foo = await remoteCollection.all();
    await localCollection.saveMany(foo);
    remoteCollection.observeUpdate(["CREATE"], "", async (instance) => {
      console.log("SYNC CREATE", instance);
      await localCollection.createOrSave(instance);
    }),
      remoteCollection.observeUpdate(["SAVE"], "", async (instance) => {
        console.log("SYNC SAVE", instance);
        await localCollection.createOrSave(instance);
      })
    // remoteCollection.observeUpdate(["DELETE"], "", async (instance) => {
    //     console.log("DELETE", instance);
    //     await localCollection.save(instance);
    // })
  }

  async all(): Promise<T[]> {
    return await this.localCollection.all();
  }

  async find(query: FilterQuery<T>): Promise<T[]> {
    // return await this.localCollection.find(query);
    return await this.localCollection.find(query);
  }

  async findById(id: string): Promise<T> {
    return await this.localCollection.findById(id);
  }

  async deleteCollection(): Promise<void> {
    this.remoteCollection.deleteCollection();
    return await this.localCollection.deleteCollection();
  }

  async truncate(): Promise<void> {
    this.remoteCollection.truncate();
    return await this.localCollection.truncate();
  }

  async create(value: T): Promise<T> {
    value = await this.localCollection.create(value);
    this.remoteCollection.create(value);
    return value;
  }

  async createMany(values: T[]): Promise<T[]> {
    values = await this.localCollection.createMany(values);
    this.remoteCollection.createMany(values);
    return values;
  }

  async save(value: T): Promise<T> {
    value = await this.localCollection.save(value);
    if (this.remoteCollection)
      this.remoteCollection.save(value);
    return value;
  }

  async saveMany(values: T[]): Promise<T[]> {
    values = await this.localCollection.saveMany(values);
    this.remoteCollection.saveMany(values);
    return values;
  }

  async createOrSave(value: T): Promise<T> {
    value = await this.localCollection.createOrSave(value);
    this.remoteCollection.createOrSave(value);
    return value;
  }
  async createOrSaveMany(values: T[]): Promise<T[]> {
    values = await this.localCollection.createOrSaveMany(values);
    this.remoteCollection.createOrSaveMany(values);
    return values;
  }

  async delete(value: T): Promise<void> {
    this.remoteCollection.delete(value);
    return this.localCollection.delete(value);
  }

  async deleteMany(values: T[]): Promise<void> {
    this.remoteCollection.deleteMany(values);
    return this.localCollection.deleteMany(values);
  }

  async deleteById(value: string): Promise<void> {
    this.remoteCollection.deleteById(value);
    return await this.localCollection.deleteById(value);
  }

  async deleteManyByIds(values: string[]): Promise<void> {
    this.remoteCollection.deleteManyByIds(values);
    return this.localCollection.deleteManyByIds(values);
  }

  async observeUpdate(actionTypes: string[], id: string, callback: any): Promise<void> {
    await this.localCollection.observeUpdate(actionTypes, id, callback);
  }
}
