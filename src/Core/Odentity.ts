import { OdentityEntity } from "./Entities/OdentityEntity";
import { ThreadID } from "@textile/hub";
import { TextileHub } from "./TextileHub/TextileHub";
import { OdentityProvider } from "./Entities/OdentityProvider";
import { LoginRequest } from "./Entities/LoginRequest";
import { LoginRequestSchema, OdentitySchema, OdentityProviderSchema } from "../Helper/JsonSchema";
import { QueryJSON } from "@textile/threads-client";
import { EmailProvider } from "../Identity/EmailProvider";
import { Libp2pCryptoIdentity } from "@textile/threads-core";
import { IdentityProviderInterface } from "../Identity/IdentityProviderInterface";
import { navigate } from "../Router";

export class Odentity {
    private static THREADNAME = "ODENTITY3";
    private static STORAGE = "ODENTITY";
    private static _instance: Odentity;
    private _current: OdentityEntity | null;
    private odentityThread: ThreadID;
    private hub: TextileHub;
    private provider = {
        email: EmailProvider
    }

    /**
     * Restores a odentity from BrowserStorage
     */
    private static async restoreOdentity(): Promise<OdentityEntity | null> {
        var restored = localStorage.getItem(Odentity.STORAGE);
        if (restored !== null) return JSON.parse(restored);
        return null;
    }

    static async init(hub: TextileHub): Promise<Odentity> {
        if (this._instance == undefined) {
            var restored = await this.restoreOdentity();
            var thread = await hub.threadDB.getRemoteThread(Odentity.THREADNAME);
            this._instance = new Odentity(restored, thread.thread, hub);
            if (thread.isNew) await this._instance.createOdentityCollections();
        }
        return this._instance;
    }

    async createOdentityCollections() {
        await this.hub.threadDB.newRemoteCollection(this.odentityThread, OdentityEntity.CollectionName, OdentitySchema);
        await this.hub.threadDB.newRemoteCollection(this.odentityThread, OdentityProvider.CollectionName, OdentityProviderSchema);
        await this.hub.threadDB.newRemoteCollection(this.odentityThread, LoginRequest.CollectionName, LoginRequestSchema);
    }

    async resetOdentityToDefault() {
        await this.hub.threadDB.truncateRemoteCollection(this.odentityThread, OdentityEntity.CollectionName);
        await this.hub.threadDB.truncateRemoteCollection(this.odentityThread, OdentityProvider.CollectionName);
        await this.hub.threadDB.truncateRemoteCollection(this.odentityThread, LoginRequest.CollectionName);
        await this.hub.threadDB.deleteRemoteCollection(this.odentityThread, OdentityEntity.CollectionName);
        await this.hub.threadDB.deleteRemoteCollection(this.odentityThread, OdentityProvider.CollectionName);
        await this.hub.threadDB.deleteRemoteCollection(this.odentityThread, LoginRequest.CollectionName);
        await this.hub.threadDB.newRemoteCollection(this.odentityThread, OdentityEntity.CollectionName, OdentitySchema);
        await this.hub.threadDB.newRemoteCollection(this.odentityThread, OdentityProvider.CollectionName, OdentityProviderSchema);
        await this.hub.threadDB.newRemoteCollection(this.odentityThread, LoginRequest.CollectionName, LoginRequestSchema);
    }

    private constructor(odentity: OdentityEntity | null, thread: ThreadID, hub: TextileHub) {
        this._current = odentity;
        this.odentityThread = thread;
        this.hub = hub;
    }

    get current(): OdentityEntity | null {
        return this._current;
    }

    async login(reference: string, type: string, callback: any) {
        var odentityProvider = await this.createOdentityProviderIfNotExist(reference, "email");
        var request = await this.createLoginRequest(odentityProvider);
        var provider: IdentityProviderInterface = new this.provider[type]();
        var odentity = await provider.login(request, odentityProvider);
        if (odentity != null) {
            this._current = odentity;
            localStorage.setItem(Odentity.STORAGE, JSON.stringify(odentity));
            request.verified = true;
            callback(request);
        }
        else {
            this.hub.threadDB.observeUpdate(this.odentityThread, LoginRequest.CollectionName, request._id, async (request: LoginRequest) => {
                if (odentityProvider.odentityId) {
                    var odentity = await this.hub.threadDB.findByIdRemote<OdentityEntity>(this.odentityThread, OdentityEntity.CollectionName, odentityProvider.odentityId);
                    localStorage.setItem(Odentity.STORAGE, JSON.stringify(odentity));
                    this._current = odentity;
                    callback(request);
                }
            });
        }
    }

    logout() {
        this._current = null;
        localStorage.removeItem(Odentity.STORAGE);
        navigate("home", null, "");
    }

    async acceptLoginRequest(id: string) {
        var request = await this.hub.threadDB.findByIdRemote<LoginRequest>(this.odentityThread, LoginRequest.CollectionName, id);
        request.verified = true;
        await this.hub.threadDB.saveRemote<LoginRequest>(this.odentityThread, LoginRequest.CollectionName, request);
    }

    private async createLoginRequest(odentityProvider: OdentityProvider) {
        var request = new LoginRequest();
        request.odentityProviderId = odentityProvider._id;
        request.timestamp = Math.round(+new Date() / 1000).toString();
        return await this.hub.threadDB.createRemote<LoginRequest>(this.odentityThread, LoginRequest.CollectionName, request);
    }

    private async createOdentityProvider(odentity: OdentityEntity, identityReference: string, type: string): Promise<OdentityProvider> {
        var provider = new OdentityProvider();
        provider.externalReference = identityReference;
        provider.type = type;
        provider.odentityId = odentity._id;
        return await this.hub.threadDB.createRemote<OdentityProvider>(this.odentityThread, OdentityProvider.CollectionName, provider);
    }

    private async createOdentity(): Promise<OdentityEntity> {
        var odentity = new OdentityEntity();
        odentity.cryptoIdentity = (await Libp2pCryptoIdentity.fromRandom()).toString();
        odentity = await this.hub.threadDB.createRemote<OdentityEntity>(this.odentityThread, OdentityEntity.CollectionName, odentity);
        await this.hub.threadDB.createUserDb(odentity);
        return odentity;
    }

    private async createOdentityProviderIfNotExist(identityReference: string, type: string): Promise<OdentityProvider> {
        var query: QueryJSON = {
            ands: [
                { fieldPath: "externalReference", value: { string: identityReference } },
                { fieldPath: "type", value: { string: type } }
            ]
        };

        var instances = await this.hub.threadDB.findRemote<OdentityProvider>(this.odentityThread, OdentityProvider.CollectionName, query);
        if (instances.length == 0) {
            var odentity = await this.createOdentity();
            return await this.createOdentityProvider(odentity, identityReference, type);
        }
        return instances[0];
    }
}