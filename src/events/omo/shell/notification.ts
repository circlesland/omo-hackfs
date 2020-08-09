export class Notification
{
  readonly _$schemaId = "events:omo.shell.notification";

  data: {
    icon: string,
    title: string,
    message: string
  } | undefined = undefined;
}
