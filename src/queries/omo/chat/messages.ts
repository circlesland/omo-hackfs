import {observe} from "svelte-observable";
import {from} from "rxjs";
import {filter, map} from "rxjs/operators";
import Observable from 'zen-observable';

export class Messages
{
    static messagesByRoom(roomId:string) {
        const sub = window.o.graphQL.subscribe(
            "Messages{_id,text, name, date, ChatRoom{_id}}"
        );
        const rId = roomId;
        return new Observable(s => {
            const oida = rId;
            sub.subscribe(o => {
                const filteredForRoom = o.data.Messages.filter(p => !p.ChatRoom ? false : p.ChatRoom._id == oida);
                s.next(filteredForRoom);
            });
        });
    }
}
