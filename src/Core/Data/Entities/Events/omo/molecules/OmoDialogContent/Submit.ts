import {Event} from "../../../../Event"

export class Submit extends Event
{
    readonly _$eventType = "omo.molecules.OmoDialogContent.Submit";

    data: {
        [others: string]: any;
    }|undefined = undefined;
}
