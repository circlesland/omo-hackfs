import {Event} from "../../../core/Data/Entities/Event"

export class StartFlow extends Event
{
  readonly _$schemaId = "events:omo.shell.startFlow";

  data: {
    flow: string
  } = {
    flow: ""
  };

  constructor(flow: string)
  {
    super();
    this.data.flow = flow;
  }
}
