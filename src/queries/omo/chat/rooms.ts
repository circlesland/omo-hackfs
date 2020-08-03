

export class Rooms
{
    static rooms() {
        return window.o.graphQL.subscribe("ChatRooms{_id,name}");
    }
}
