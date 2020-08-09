export class Navigated
{
  readonly _$schemaId = "events:omo.shell.navigated";

  data: {
    page: string, // ?page=
    [others: string]: any; // &..=..&..
  } = {
    page: ""
  };

  constructor(page: string)
  {
    this.data.page = page;
  }
}
