import {Instance} from "@textile/threads-store";
import {SyncedCollection} from "./SyncedCollection";
import {RemoteThread} from "./RemoteThread";
import {LocalThread} from "./LocalThread";
import {JSONSchema} from "@textile/hub";

export class SyncedThread
{
  private remoteThread: Promise<RemoteThread>;
  private localThread: LocalThread;

  private constructor(localThread, remoteThread: Promise<RemoteThread>)
  {
    this.localThread = localThread;
    this.remoteThread = remoteThread;
  }

  static async init(threadName): Promise<SyncedThread>
  {
    var localThread = await LocalThread.init(threadName);
    var remoteThread = RemoteThread.init(threadName);
    return new SyncedThread(localThread, remoteThread);
  }

  async getOrCreateCollection<T extends Instance>(collectionName: string, schema: JSONSchema): Promise<SyncedCollection<T>>
  {
    if (!await this.localThread.hasCollection(collectionName))
      await this.localThread.createCollection(collectionName, schema);

    this.remoteThread.then(thread =>
    {
      thread.hasCollection(collectionName).then(async (result) =>
      {
        if (!result)
          await thread.createCollection(collectionName, schema)
      });
    });

    return await this.getCollection(collectionName);
  }

  async getCollection<T extends Instance>(collectionName: string): Promise<SyncedCollection<T>>
  {
    return await SyncedCollection.init<T>(collectionName, this.localThread, this.remoteThread);
  }
}
