import { Client, ThreadID, createUserAuth, UserAuth } from '@textile/hub';
import { QuantSchema, AuthorSchema, BookSchema, LibrarySchema } from '../Helper/JsonSchema';
import * as uuid from "uuid";

/**
 * Interface to Textile Hub
 */
export class TextileHub {
    private auth: UserAuth | null;
    private static instance: TextileHub;

    private constructor() {
        this.auth = null;
    }

    static getInstance(): TextileHub {
        if (this.instance == null)
            this.instance = new TextileHub();
        return this.instance;
    }

    async getClient(): Promise<Client> {
        if (this.auth == null)
            this.auth = await createUserAuth(process.env.USER_API_KEY || '', process.env.USER_API_SECRET || '');
        return Client.withUserAuth(this.auth);
    }
}