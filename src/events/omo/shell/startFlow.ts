export class StartFlow
{
  readonly _$schemaId = "events:omo.shell.startFlow";

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
