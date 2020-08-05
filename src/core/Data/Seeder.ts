import { JSONSchema } from "@textile/hub";
import { Message } from "../../schema/omo/message";
import { ChatRoom } from "../../schema/omo/chatRoom";
import { Omosapien } from "../../schema/omo/odentity/omosapien";
import { Dream } from "../../schema/omo/dreams/dream";
import { Safe } from "../../schema/omo/safe/safe";
import { TimeCommitment } from "../../schema/omo/dreams/timeCommitment";
import { Vote } from "../../schema/omo/dreams/vote";
import { ProductSubscription } from "../../schema/omo/dreams/productSubscription";
import { Location } from "../../schema/omo/dreams/location";
import { Reservation } from "../../schema/omo/dreams/reservation";
import { Product } from "../../schema/omo/dreams/product";

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
        name: "ProductSubscription",
        schema: ProductSubscription,
        data: []
      },
      {
        name: "Location",
        schema: Location,
        data: []
      },
      {
        name: "Reservation",
        schema: Reservation,
        data: []
      },
      {
        name: "Product",
        schema: Product,
        data: []
      }
    ]
  }
}];

export class Seeder {
  async getSeed(threadName: string) {
    let thread = seeds.find(x => x.thread.name == threadName);
    if (thread)
      return thread.thread.quanta;
    return [];
  }
}
