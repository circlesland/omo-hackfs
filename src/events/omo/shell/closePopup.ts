import {Event} from "../../../core/Data/Entities/Event"

export class ClosePopup extends Event
{
    readonly _$eventType = "events:omo.shell.closePopup";

    data: {
    } = {
    };

    constructor()
    {
        super();
    }
}
