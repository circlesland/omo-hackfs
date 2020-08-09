export class RequestSubmitFlowStep
{
  readonly _$schemaId = "events:omo.shell.requestSubmitFlowStep";

  data: {
    processNodeId: string
  } = {
    processNodeId: ""
  };

  constructor(processNodeId: string)
  {
    this.data.processNodeId = processNodeId;
  }
}
