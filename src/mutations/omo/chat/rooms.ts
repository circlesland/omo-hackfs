export class Rooms
{
  static async createNewRoom(name: string)
  {
    const newRoom = (await window.o.graphQL.mutation(
      `addChatRoom(name:"${name}") {_id name}`
    ));
    return !newRoom.data ? null : newRoom.data.addChatRoom;
  }

  static async deleteRoom(id)
  {
    return await window.o.graphQL.mutation(`deleteChatRoom(_id:"${id}") {name}`);
  }
}
