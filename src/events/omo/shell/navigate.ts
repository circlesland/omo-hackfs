export class Navigate
{
  readonly _$schemaId = "events:omo.shell.navigate";

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
