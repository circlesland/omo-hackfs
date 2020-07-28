import {Event} from "../../../../Event"

export class SetNode extends Event
{
    readonly _$eventType = "omo.molecules.OmoDialogContent.SetNode";

    data: {
        bundleId:string,
        node:Node
    }|undefined = undefined;
}
