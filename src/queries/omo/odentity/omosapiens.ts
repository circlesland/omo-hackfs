import Observable from "zen-observable";

export class Omosapiens
{
  static subscribeAll()
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

  static subscribeBySafeAddress(safeAddress:string)
  {
    const sub = window.o.graphQL.subscribe("Omosapiens{_id,name,safeAddress}");

    return new Observable(s =>
    {
      sub.subscribe(o =>
      {
        s.next(o.data.Omosapiens.filter(p => p.safeAddress == safeAddress));
      });
    });
  }

  static async bySafeAddress(safeAddress:string) {
    const omosapiens = await window.o.graphQL.query("Omosapiens{_id,name,safeAddress}");
    if (!omosapiens.data){
      throw new Error("Couldn't query the list of Omosapiens");
    }
    const filteredOmosapien = omosapiens.data.Omosapiens.filter(p => (!p.safeAddress ? "" : p.safeAddress).toLowerCase() == safeAddress.toLowerCase());
    return filteredOmosapien && filteredOmosapien.length == 1 ? filteredOmosapien[0] : null;
  }
}
