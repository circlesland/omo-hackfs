import { Instance } from "@textile/threads-store";

export interface IEvent
{
    _$eventType:string;
}

export class Notification implements Instance, IEvent {
    static CollectionName: string = "Notifications";
    _$eventType = "omo.notification";

    _id: string;
    timestamp?: string;
    data: any

    constructor() {
        this._id = '';
    }
}
