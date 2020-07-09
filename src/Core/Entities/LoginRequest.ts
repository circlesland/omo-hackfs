import * as uuid from "uuid";
import { Instance } from "@textile/threads-store";

export class LoginRequest implements Instance {
    _id: string;
    omoProviderId?: string;
    timestamp?: string;
    verified: boolean;

    constructor() {
        this._id = uuid.v4();
        this.verified = false;
    }
}