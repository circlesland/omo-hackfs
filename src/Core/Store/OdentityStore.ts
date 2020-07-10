import { OmoStore } from "./OmoStore";
import { OmoSchema, IdentityProviderSchema, LoginRequestSchema } from "../../Helper/JsonSchema";
import { Omo } from "../Entities/Omo";
import { IdentityProvider } from "../Entities/IdentityProvider";
import { LoginRequest } from "../Entities/LoginRequest";
import { Collection } from "@textile/threads-database";
import { EmailProvider } from "../../Identity/EmailProvider";
import { createUserAuth, Client, ThreadID } from "@textile/hub";
import { DBInfo, QueryJSON } from "@textile/threads-client";
import { TextileHub } from "../TextileHub";
import { Criterion } from "@textile/threads-client/dist/models";
import { Op } from "@textile/threads-store";
import { debug } from "svelte/internal";

export class OdentityStore {
    private _currentOmo: Omo | null;
    private threadId: ThreadID;
    private provider = {
        email: EmailProvider
    }
    private hub: TextileHub;
    private static instance: OdentityStore;
    private static thread: ThreadID;

    static async getInstanceAsync() {
        if (this.instance == null) {
            var threadId = await this.getThreadIdAsync();
            this.instance = new OdentityStore(threadId);
            await this.instance.init();
        }
        return this.instance;
    }

    private constructor(threadId: ThreadID) {
        this.hub = TextileHub.getInstance();
        this._currentOmo = null;
        this.threadId = threadId;
    }

    private static async getThreadIdAsync(): Promise<ThreadID> {
        if (this.thread != undefined) return this.thread;
        let client = await TextileHub.getInstance().getClient();
        var threads = (await client.listThreads()).listList;
        var thread = threads.find(x => x.name == "ODENTITY");
        if (thread) {
            this.thread = ThreadID.fromString(thread.id);
            return this.thread;
        }
        var threadId = ThreadID.fromRandom();
        await client.newDB(threadId, "ODENTITY");
        this.thread = threadId;
        return this.thread;
    }

    async currentOmo(): Promise<Omo | null> {
        if (this._currentOmo != null)
            return this._currentOmo;

        const omoid = localStorage.getItem("loggedInOmo");
        if (omoid != null && omoid != "") {
            try {
                var client = await this.hub.getClient();
                this._currentOmo = (await client.findByID<Omo>(this.threadId, "Omo", omoid)).instance;
                return this._currentOmo;
            }
            catch (e) {
                console.error(e.message);
            }
        }
        return null;
    }

    logout() {
        this._currentOmo = null;
        localStorage.setItem("loggedInOmo", "");
        window.location.href = "/";
    }

    async login(reference: string, type: string, callback: any) {
        var client = await this.hub.getClient();

        var identityProvider = await this.createOmoIfNotExist(reference, "email", client);
        if (identityProvider == null) throw new Error("omo couldn't found or created");
        var request = await this.createLoginRequest(identityProvider);
        var provider = new this.provider[type]();
        var omo = await provider.loginOmo(request, identityProvider);
        if (omo != null) {
            this.currentOmo = omo;
            localStorage.setItem("loggedInOmo", omo._id);
            callback(await this.getLoginRequest(request._id));
        }
        else {
            this.hub.observeUpdate(this.threadId, "LoginRequest", request._id, async (request: LoginRequest) => {
                if (identityProvider != undefined) {
                    debugger;
                    this._currentOmo = (await client.findByID<Omo>(this.threadId, "Omo", identityProvider.omoid || '')).instance;
                    localStorage.setItem("loggedInOmo", this._currentOmo._id);
                    callback(request);
                }
            });
        }
    }

    private async getLoginRequest(id) {
        var client = await this.hub.getClient();
        return (await client.findByID<LoginRequest>(this.threadId, "LoginRequest", id)).instance;
    }

    private async init() {
        var client = await this.hub.getClient();
        if (!await this.hub.hasCollection(this.threadId, "Omo", client))
            await this.hub.newCollection<Omo>(this.threadId, "Omo", OmoSchema, client);
        if (!await this.hub.hasCollection(this.threadId, "IdentityProvider", client))
            await this.hub.newCollection<IdentityProvider>(this.threadId, "IdentityProvider", IdentityProviderSchema, client);
        if (!await this.hub.hasCollection(this.threadId, "LoginRequest", client))
            await this.hub.newCollection<LoginRequest>(this.threadId, "LoginRequest", LoginRequestSchema, client);
    }

    private async createLoginRequest(identityProvider: IdentityProvider) {
        var client = await this.hub.getClient();
        var request = new LoginRequest();
        request.omoProviderId = identityProvider._id;
        request.timestamp = new Date().toISOString();
        var response = await client.create(this.threadId, "LoginRequest", [request]);
        request._id = response[0];
        return request;
    }

    async acceptLoginRequest(id, invite) {
        let client = await this.hub.getClient();
        var request = (await client.findByID(this.threadId, "LoginRequest", id)).instance;
        request.verified = true;
        await client.save(this.threadId, "LoginRequest", [request]);
    }

    private async createIdentityProvider(omo: Omo, identityReference: string, type: string, client: Client): Promise<IdentityProvider> {
        var provider = new IdentityProvider();
        provider.externalReference = identityReference;
        provider.type = type;
        provider.omoid = omo._id;
        var response = await client.create(this.threadId, "IdentityProvider", [provider]);
        provider._id = response[0];
        return provider;
    }

    private async createOmo(client: Client): Promise<Omo> {
        var omo = new Omo();
        var response = await client.create(this.threadId, "Omo", [omo]);
        omo._id = response[0];
        return omo;
    }

    private async createOmoIfNotExist(identityReference: string, type: string, client: Client): Promise<IdentityProvider | undefined> {
        var query: QueryJSON = { ands: [{ fieldPath: "externalReference", value: { string: identityReference } }, { fieldPath: "type", value: { string: type } }] };
        var instances = (await client.find<IdentityProvider>(this.threadId, "IdentityProvider", query)).instancesList;
        if (instances.length == 0) {
            var omo = await this.createOmo(client);
            return await this.createIdentityProvider(omo, identityReference, type, client);
        }
        if (instances.length == 1) {
            return instances[0];
        }
        throw new Error("Duplicate Provider Error")
    }
}