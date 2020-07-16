import { Odentity } from "./Odentity";
import { TextileHub } from "./TextileHub/TextileHub";

export class Quantum {
    hub: TextileHub;
    odentity: Odentity;

    private constructor(odentity: Odentity, hub: TextileHub) {
        this.odentity = odentity;
        this.hub = hub;
    }

    static async leap(): Promise<Quantum> {
        var hub = await TextileHub.init();
        var odentity = await Odentity.init(hub);
        return new Quantum(odentity, hub);
    }
}