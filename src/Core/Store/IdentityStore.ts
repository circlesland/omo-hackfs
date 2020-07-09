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

export class IdentityStore {
    private store: OmoStore;
    private _currentOmo: Omo | null;
    private threadId: ThreadID;
    private provider = {
        email: EmailProvider
    }
    private hub: TextileHub;

    constructor(store: OmoStore, threadId: ThreadID) {
        this.store = store;
        this.hub = TextileHub.getInstance();
        this._currentOmo = null;
        this.threadId = threadId;
    }

    async currentOmo(): Promise<Omo | null> {
        if (this.currentOmo != null)
            return this._currentOmo;

        const omoid = localStorage.getItem("loggedInOmo");
        if (omoid != null) {
            var client = await this.hub.getClient();
            this._currentOmo = (await client.findByID<Omo>(this.threadId, "Omo", omoid)).instance;
            return this._currentOmo;
        }
        return null;
    }

    async login(reference: string, type: string, callback: any) {
        debugger;
        var client = await this.hub.getClient();

        var identityProvider = await this.createOmoIfNotExist(reference, "email", client);
        var request = await this.store.identity.createLoginRequest(reference, "email");
        var provider = new this.provider[type]();
        var omo = await provider.loginOmo(request, identityProvider);
        if (omo != null) {
            this.currentOmo = omo;
            callback(await this.getLoginRequest(request._id));
        }
        else {
            console.log("requestid", request._id);
            this.store.observeUpdate("LoginRequest", request._id, async (request: LoginRequest) => {
                this._currentOmo = (await client.findByID<Omo>(this.threadId, "Omo", identityProvider.omoid || '')).instance;
                callback(request);
            });
        }
    }

    private async getLoginRequest(id) {
        var client = await this.hub.getClient();
        return (await client.findByID<LoginRequest>(this.threadId, "LoginRequest", id)).instance;
    }

    async init() {
        var client = await this.hub.getClient();
        debugger;

        if (!this.store.hasCollection("Omo", client))
            await this.store.newCollection<Omo>("Omo", OmoSchema, client);
        if (!this.store.hasCollection("IdentityProvider", client))
            await this.store.newCollection<IdentityProvider>("IdentityProvider", IdentityProviderSchema, client);
        if (!this.store.hasCollection("LoginRequest", client))
            await this.store.newCollection<LoginRequest>("LoginRequest", LoginRequestSchema, client);
    }

    private async createLoginRequest(identityReference: string, type: string) {
        var client = await this.hub.getClient();
        var query: QueryJSON = { ands: [{ fieldPath: "externalReference", value: { string: identityReference } }] };
        var instances = (await client.find<IdentityProvider>(this.threadId, "IdentityProvider", query)).instancesList;
        if (instances.length == 0) {
            var omo = await this.createOmo(client);
            await this.createIdentityProvider(omo, identityReference, type, client);
            instances = (await client.find<IdentityProvider>(this.threadId, "IdentityProvider", query)).instancesList;
        }
        var request = new LoginRequest();
        request.omoProviderId = instances[0]._id;
        request.timestamp = new Date().toISOString();
        await client.save(this.threadId, "LoginRequest", [request]);
        return request;
    }

    async acceptLoginRequest(id, invite) {
        // if (invite) {
        //     var obj = JSON.parse(atob(invite));

        //     var dbInfo: DBInfo = {
        //         key: obj.thread,
        //         addrs: obj.addrs
        //     }
        //     await this.store.initFromInvite(dbInfo);
        // }
        // var auth = await createUserAuth(process.env.USER_API_KEY || '', process.env.USER_API_SECRET || '');
        // var client = Client.withUserAuth(auth);
        // var request = await client.findByID<LoginRequest>(this.threadId, "LoginRequest", id);
        // await this.store.init();
        let client = await this.hub.getClient();
        var request = (await client.findByID(this.threadId, "LoginRequest", id)).instance;
        request.verified = true;
        await client.save(this.threadId, "LoginRequest", request);
        // await client.save(this.threadId, "LoginRequest", [request.instance])
    }

    private async createIdentityProvider(omo: Omo, identityReference: string, type: string, client: Client) {
        var provider = new IdentityProvider();
        provider.externalReference = identityReference;
        provider.type = type;
        provider.omoid = omo._id;
        await client.save(this.threadId, "IdentityProvider", [provider])
    }

    private async createOmo(client: Client) {
        var omo = new Omo();
        await client.save(this.threadId, "Omo", [omo]);
        return omo;
    }

    private async createOmoIfNotExist(identityReference: string, type: string, client: Client): Promise<IdentityProvider> {
        debugger;
        var query: QueryJSON = { ands: [{ fieldPath: "externalReference", value: { string: identityReference } }] };
        console.log(this.threadId.toString() + " IdentityProvider")
        var instances = (await client.find<IdentityProvider>(this.threadId, "IdentityProvider", query)).instancesList;


        if (instances.length == 0) {
            var omo = await this.createOmo(client);
            await this.createIdentityProvider(omo, identityReference, type, client);
            instances = (await client.find<IdentityProvider>(this.threadId, "IdentityProvider", query)).instancesList;
        }
        return instances[0];
    }
}