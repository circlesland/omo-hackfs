import {Event} from "../../../Data/Entities/Event"

export class Notification extends Event
{
    readonly _$eventType = "omo.shell.notification";

    data: {
        icon:string,
        title:string,
        message:string
    }|undefined = undefined;
}