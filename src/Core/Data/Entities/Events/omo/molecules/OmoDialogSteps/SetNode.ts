import {Event} from "../../../../Event"

export class SetNode extends Event
{
    readonly _$eventType = "omo.molecules.OmoDialogSteps.SetNode";

    data: {
        bundleId:string,
        node:Node
    }|undefined = undefined;
}
