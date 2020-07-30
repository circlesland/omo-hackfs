import {Event} from "../../../Data/Entities/Event"

export class SubmitFlowStep extends Event
{
    readonly _$eventType = "omo.shell.submitFlowStep";

    data: {
        processNodeId: string
    } = {
        processNodeId: ""
    };

    constructor(processNodeId:string)
    {
        super();
        this.data.processNodeId = processNodeId;
    }
}
