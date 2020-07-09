import { Client, ThreadID, createUserAuth, UserAuth, KeyInfo, createAPISig } from '@textile/hub';
import { QuantSchema, AuthorSchema, BookSchema, LibrarySchema } from '../Helper/JsonSchema';
import * as uuid from "uuid";

/**
 * Interface to Textile Hub
 */
export class TextileHub {
    private static instance: TextileHub;

    private constructor() {
    }

    static getInstance(): TextileHub {
        if (this.instance == null)
            this.instance = new TextileHub();
        return this.instance;
    }

    async getClient(): Promise<Client> {
        const auth: KeyInfo = {
            key: process.env.USER_API_KEY || '',
            secret: process.env.USER_API_SECRET || ''
        }
        // let auth = await createUserAuth(process.env.USER_API_KEY || '', process.env.USER_API_SECRET || '');
        return Client.withKeyInfo(auth);
    }

    /**
 * getAPISig uses helper function to create a new sig
 * 
 * seconds (300) time until the sig expires
 */
    async getAPISig(seconds: number = 300) {
        const expiration = new Date(Date.now() + 1000 * seconds)
        return await createAPISig(process.env.USER_API_SECRET || '', expiration)
    }
}