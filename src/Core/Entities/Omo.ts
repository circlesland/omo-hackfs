import { Instance } from "@textile/threads-store";

export class Omo implements Instance {
  _id: string;
  firstname?: string;
  lastname?: string;
  profileImage?: string;

  constructor() {
    this._id = "";
  }
}
