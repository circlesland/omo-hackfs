import { ThreadDB } from './ThreadDB';

/**
 * Interface to Textile Hub
 */
export class TextileHub {
    private static instance: TextileHub;
    threadDB: ThreadDB;

    private constructor(threadDb: ThreadDB) {
        this.threadDB = threadDb;
    }

    static async init(): Promise<TextileHub> {
        if (this.instance == null) {
            let db = await ThreadDB.init();
            this.instance = new TextileHub(db);

        }
        return this.instance;
    }
}