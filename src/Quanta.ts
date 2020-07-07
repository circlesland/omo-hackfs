import { TextileHub } from "./TextileHub";

export class Quanta {
    private textileHub: TextileHub;

    constructor() {
        this.textileHub = TextileHub.getInstance();
    }

    async all() {

    }
}