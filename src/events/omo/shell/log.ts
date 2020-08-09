export class Log
{
  readonly _$schemaId = "events:omo.shell.log";

  data: {
    timestamp: string,
    severity: string,
    source: string,
    message: string,
    dataJson?: string
  } = {
    timestamp: new Date().toJSON(),
    source: "",
    message: "",
    severity: ""
  };

  constructor(source: string, severity: string, message: string, dataJson?: any)
  {
    this.data.severity = severity;
    this.data.source = source;
    this.data.message = message;
    this.data.dataJson = dataJson;
  }
}
