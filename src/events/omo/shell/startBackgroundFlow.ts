export class StartBackgroundFlow
{
  readonly _$schemaId = "events:omo.shell.startBackgroundFlow";

  data: {
    flow: string,
    argument?: any
  } = {
    flow: ""
  };

  constructor(flow: string, argument?: any)
  {
    this.data.flow = flow;
    this.data.argument = argument;
  }
}
