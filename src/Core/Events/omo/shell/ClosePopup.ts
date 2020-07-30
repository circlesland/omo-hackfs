import {Event} from "../../../Data/Entities/Event"

export class ClosePopup extends Event
{
    readonly _$eventType = "omo.shell.closePopup";

    data: {
    } = {
    };

    constructor()
    {
        super();
    }
}
