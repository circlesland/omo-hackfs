import { OdentityStore } from "./OdentityStore";
import { TextileHub } from "../TextileHub";

/**
 * OmoStore is a localfirst Database which is connected to global Store of omo.earth
 */
export class OmoStore {
    private static instance: OmoStore;
    hub: TextileHub;
    odentity: OdentityStore;

    private constructor(odentity: OdentityStore) {
        this.hub = TextileHub.getInstance();
        this.odentity = odentity;
    }

    static async getInstance(): Promise<OmoStore> {
        if (this.instance == null) {
            let odentity = await OdentityStore.getInstanceAsync();
            this.instance = new OmoStore(odentity);
        }
        return this.instance;
    }
}