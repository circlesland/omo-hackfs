export class Omosapiens
{
  static async deleteOmosapien(id)
  {
    return await window.o.graphQL.mutation(`deleteOmosapien(_id:"${id}") {name}`);
  }

  static async createNewOmosapien(name: string, safeAddress: string)
  {
    const newOmosapien = (await window.o.graphQL.mutation(
      `addOmosapien(name:"${name}" safeAddress:"${safeAddress}") {_id name safeAddress}`
    ));
    return !newOmosapien.data ? null : newOmosapien.data.addOmosapien;
  }
}
