import { Instance } from "@textile/threads-store";

export interface IEvent
{
    _$eventType:string;
}

export abstract class Event implements Instance, IEvent {
    static CollectionName: string = "Events";
    abstract _$eventType:string;

    _id: string;
    readonly timestamp?: string = new Date().toJSON();

    constructor() {
        this._id = '';
    }
}
