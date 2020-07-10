import { Instance } from "@textile/threads-store";

export class Omo implements Instance {
    _id: string;
    name?: string;
    profileImage?: string;

    constructor() {
        this._id = '';
    }
}