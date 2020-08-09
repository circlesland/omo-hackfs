export class Vote
{
  readonly _$schemaId = "events:omo.dreams.vote";

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
