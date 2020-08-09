import {Event} from "../../../core/Data/Entities/Event"

export class StartBackgroundFlow extends Event
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
    super();
    this.data.flow = flow;
    this.data.argument = argument;
  }
}
