import {Event} from "../../../core/Data/Entities/Event"

export class UndoFlowStep extends Event
{
    readonly _$eventType = "events:omo.shell.undoFlowStep";

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
