export class Dreams
{
  static async deleteDream(id)
  {
    return await window.o.graphQL.mutation(`deleteDream(_id:"${id}") {name}`);
  }

  static async createNewDream(name: string, description: string)
  {
    const newRoom = (await window.o.graphQL.mutation(
      `addDream(name:"${name}") {_id name}`
    ));
    return !newRoom.data ? null : newRoom.data.addChatRoom;
  }
}
