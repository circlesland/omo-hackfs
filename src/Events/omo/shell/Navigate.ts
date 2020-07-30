import {Event} from "../../../Core/Data/Entities/Event"

export class Navigate extends Event
{
    readonly _$eventType = "omo.shell.navigate";

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
