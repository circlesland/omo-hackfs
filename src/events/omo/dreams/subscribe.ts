export class Subscribe
{
  readonly _$schemaId = "events:omo.dreams.subscribe";

  data: {
    dreamId: string
  } = {
    dreamId: ""
  };

  constructor(dreamId: string)
  {
    this.data.dreamId = dreamId;
  }
}
