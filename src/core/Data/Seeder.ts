import { QuantRegistry } from "../Quant/QuantRegistry";
import { JSONSchema } from "@textile/hub";
import { Message } from "../../schema/omo/message";
import { ChatRoom } from "../../schema/omo/chatRoom";
import {Safe} from "../../schema/omo/safe/safe";
export interface SeedQuant {
    name: string,
    schema: JSONSchema,
    data: any[]
}
interface Seed {
    thread: {
        name: string,
        quanta: SeedQuant[]
    }
}

const seeds: Seed[] = [{
    thread: {
        name: "quanta", quanta: [
            {
                name: "Message",
                schema: Message,
                data: []
            },
            {
                name: "ChatRoom",
                schema: ChatRoom,
                data: []
            },
            {
                name: "Safe",
                schema: Safe,
                data: []
            }
        ]
    }
}];

export class Seeder {
    async createCollections(registry: QuantRegistry) {
        console.log("create collections");

        for (let seed of seeds) {
            await registry.RegisterSeedQuanta(seed.thread.quanta);
        }

        console.log("end create collections");
    }
}
