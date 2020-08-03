import Observable from "zen-observable";

export class Omosapiens
{
  static all()
  {
    const sub = window.o.graphQL.subscribe("Omosapiens{_id,name,safeAddress}");

    return new Observable(s =>
    {
      sub.subscribe(o =>
      {
        s.next(o.data.Omosapiens);
      });
    });
  }
}
