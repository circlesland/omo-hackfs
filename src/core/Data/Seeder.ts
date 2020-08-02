import { QuantRegistry } from "../Quant/QuantRegistry";
import { JSONSchema } from "@textile/hub";
import { Message } from "../../schema/omo/message";
import { ChatRoom } from "../../schema/omo/chatRoom";
import { Omosapien } from "../../schema/omo/odentity/omosapien";
import { Dream } from "../../schema/omo/dreams/dream";
import { Safe } from "../../schema/omo/safe/safe";
import {TimeCommitment} from "../../schema/omo/dreams/timeCommitment";
import {Vote} from "../../schema/omo/dreams/vote";
import {DreamSubscription} from "../../schema/omo/dreams/dreamSubscription";

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
            },
            {
                name: "Omosapien",
                schema: Omosapien,
                data: []
            },
            {
                name: "Dream",
                schema: Dream,
                data: []
            },
            {
                name: "TimeCommitment",
                schema: TimeCommitment,
                data: []
            },
            {
                name: "Vote",
                schema: Vote,
                data: []
            },
            {
                name: "DreamSubscription",
                schema: DreamSubscription,
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
