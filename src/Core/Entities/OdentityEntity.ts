import { Instance } from "@textile/threads-store";
import { ThreadID } from "@textile/hub";

export class OdentityEntity implements Instance {
  static CollectionName: string = "OdentityEntity";
  _id: string;
  threadId: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  cryptoIdentity?: string;

  constructor() {
    this._id = "";
    this.threadId = (ThreadID.fromRandom()).toString();
  }
}
