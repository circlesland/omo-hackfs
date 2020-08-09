export class SubmitFlowStep
{
  readonly _$schemaId = "events:omo.shell.submitFlowStep";

  data: {
    processNodeId: string,
    argument: any
  } = {
    processNodeId: "",
    argument: null
  };

  constructor(processNodeId: string, argument: any)
  {
    this.data.processNodeId = processNodeId;
    this.data.argument = argument;
  }
}
