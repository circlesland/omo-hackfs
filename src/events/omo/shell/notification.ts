import {Event} from "../../../Core/Data/Entities/Event"

export class Notification extends Event
{
    readonly _$eventType = "events:omo.shell.notification";

    data: {
        icon:string,
        title:string,
        message:string
    }|undefined = undefined;
}
