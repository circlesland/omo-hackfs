import { Instance } from "@textile/threads-store";

export class LoginRequest implements Instance {
    _id: string;
    omoProviderId?: string;
    timestamp?: string;
    verified: boolean;

    constructor() {
        this._id = '';
        this.verified = false;
    }
}