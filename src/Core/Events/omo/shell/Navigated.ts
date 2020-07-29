import {Event} from "../../../Data/Entities/Event"

export class Navigated extends Event
{
    readonly _$eventType = "omo.shell.navigated";

    data: {
        page:string, // ?page=
        [others: string]: any; // &..=..&..
    } = {
        page: ""
    };

    constructor(page:string)
    {
        super();
        this.data.page = page;
    }
}
