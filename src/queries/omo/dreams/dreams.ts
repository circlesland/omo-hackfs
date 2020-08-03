import Observable from "zen-observable";

export class Dreams
{
  public static all()
  {
    const sub = window.o.graphQL.subscribe(
      "Dreams{_id name description safeAddress}"
    );

    return new Observable(s =>
    {
      sub.subscribe(o =>
      {
         s.next(o.data.Dreams);
      });
    });
  }
}
