import * as uuid from "uuid";
import { Instance } from "@textile/threads-store";

export class IdentityProvider implements Instance {
    _id: string;
    omoid?: string;
    type?: string;
    externalReference?: string;

    constructor() {
        this._id = uuid.v4();
    }
}