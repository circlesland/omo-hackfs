import {Event} from "../../../Core/Data/Entities/Event"

export class StartFlow extends Event
{
    readonly _$eventType = "omo.shell.startFlow";

    data: {
        flow: string
    } = {
        flow: ""
    };

    constructor(flow:string)
    {
        super();
        this.data.flow = flow;
    }
}
