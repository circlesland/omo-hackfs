import {Odentity} from "./Odentity";
import {Threads} from "./Textile/Threads";
import {QuantRegistry} from "./Quant/QuantRegistry";
import {GraphQL} from "./Data/GraphQL";
import {Seeder} from "./Data/Seeder";
import {LocalThread} from "./Textile/LocalThread";
import {throwError} from "rxjs";
import {RemoteThread} from "./Textile/RemoteThread";
import {StopWatch} from "./StopWatch";
import CirclesCore from "@circles/core";
import Web3 from "web3";
import {EventBroker} from "./../Events/EventBroker";

export class Quantum
{
    readonly circlesCore: CirclesCore;
    readonly eventBroker: EventBroker;
    readonly web3: Web3;

    readonly odentity: Odentity;
    readonly graphQL: GraphQL;
    readonly quantRegistry: QuantRegistry;
    readonly threads: Threads;
    // localDB: LocalThread;
    // remoteDB: RemoteThread;

    // private constructor(threads: Threads, odentity: Odentity, quantRegistry: QuantRegistry, graphQL: GraphQL) {
    //     this.odentity = odentity;
    //     this.threads = threads;
    //     this.quantRegistry = quantRegistry;
    //     this.graphQL = graphQL;
    // }
    private constructor(threads: Threads, odentity: Odentity, quantRegistry: QuantRegistry, graphQL: GraphQL, web3: Web3, circlesCore: CirclesCore, eventBroker:EventBroker)
    {
        this.threads = threads;
        this.odentity = odentity;
        // this.localDB = thread;
        // this.remoteDB = thread2;
        this.quantRegistry = quantRegistry;
        this.graphQL = graphQL;
        this.web3 = web3;
        this.circlesCore = circlesCore;
        this.eventBroker = eventBroker;
    }

    async publishEventAsync(namespace:string, topic:string, event:any) {
        const t = this.eventBroker.tryGetTopic(namespace, topic);
        if (!t)
            throw new Error("Topic '" + topic + "' doesn't exist in namespace '" + namespace + "'");
        await t.publish(event);
    }

    async publishShellEventAsync(event:any) {
        const t = this.eventBroker.tryGetTopic("omo", "shell");
        if (!t)
            throw new Error("Topic 'shell' doesn't exist in namespace 'omo'");
        await t.publish(event);
    }

    static async leap(): Promise<Quantum>
    {
        StopWatch.start("threads");
        var threads = new Threads();
        StopWatch.stop("threads");
        StopWatch.start("Odentity");
        var odentity = await Odentity.init(threads);
        StopWatch.stop("Odentity");

        var quantRegistry = await QuantRegistry.init(threads);
        var seeder = new Seeder();
        await seeder.createCollections(quantRegistry);
        var graphQL = await GraphQL.init(quantRegistry);
        // return new Quantum(threads, odentity, uantRegistry, graphQL);
        // var local = await LocalThread.init("omodb");
        // var remote = await RemoteThread.init("omoooooodb");

        const provider = new Web3.providers.WebsocketProvider(
            !process.env.ETHEREUM_NODE_WS ? "-" : process.env.ETHEREUM_NODE_WS,
            {
                timeout: 30000,
                reconnect: {
                    auto: true,
                    delay: 5000,
                    maxAttempts: 5,
                    onTimeout: false
                },
                clientConfig: {
                    keepalive: true,
                    keepaliveInterval: 60000
                }
            }
        );

        const web3 = new Web3();
        web3.setProvider(provider);

        const circlesCore = new CirclesCore(web3, {
            apiServiceEndpoint: process.env.API_SERVICE_EXTERNAL,
            graphNodeEndpoint: process.env.GRAPH_NODE_EXTERNAL,
            hubAddress: process.env.HUB_ADDRESS,
            proxyFactoryAddress: process.env.PROXY_FACTORY_ADDRESS,
            relayServiceEndpoint: process.env.RELAY_SERVICE_EXTERNAL,
            safeMasterAddress: process.env.SAFE_ADDRESS,
            subgraphName: process.env.SUBGRAPH_NAME
        });


        const eventBroker = new EventBroker();
        eventBroker.createTopic("omo", "safe");
        eventBroker.createTopic("omo", "shell");

        return new Quantum(threads, odentity, quantRegistry, graphQL, web3, circlesCore, eventBroker);
    }
}
