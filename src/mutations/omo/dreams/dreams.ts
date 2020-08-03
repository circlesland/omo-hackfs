export class Dreams
{
  static async deleteDream(id)
  {
    return await window.o.graphQL.mutation(`deleteDream(_id:"${id}") {name}`);
  }

  static async createNewDream(name: string, description: string, safeAddress:string)
  {
    const newDream = (await window.o.graphQL.mutation(
      `addDream(name:"${name}" description:"${description}" safeAddress:"${safeAddress}") {_id name description safeAddress}`
    ));
    return !newDream.data ? null : newDream.data.addDream;
  }
}
