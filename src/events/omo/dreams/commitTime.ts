export class CommitTime
{
  readonly _$schemaId = "events:omo.dreams.commitTime";

  data: {
    dreamId: string,
    hoursPerWeek: number
  } = {
    dreamId: "",
    hoursPerWeek: 0
  };

  constructor(dreamId: string, hoursPerWeek: number)
  {
    this.data.dreamId = dreamId;
    this.data.hoursPerWeek = hoursPerWeek;
  }
}
