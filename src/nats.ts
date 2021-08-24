import {
    connect,
    JSONCodec,
    Msg,
    Subscription,
    SubscriptionOptions,
} from "nats";

export const client = connect({ servers: ["nats://nats:4222"] });
export const codec = JSONCodec();

export interface SubscriptionHandler {
    (msg: Msg): void;
}

async function processSubscription(
    sub: Subscription,
    handler: SubscriptionHandler
) {
    for await (let msg of sub) {
        await handler(msg);
    }
}

export const $nats = {
    async request(topic: string, payload: any = {}) {
        let _nats = await client;

        let msg = await _nats.request(topic, codec.encode(payload), {
            timeout: 2000,
        });

        return codec.decode(msg.data);
    },

    async subscribe(
        topic: string,
        handler: SubscriptionHandler,
        options?: SubscriptionOptions
    ) {
        let _nats = await client;

        let sub = await _nats.subscribe(topic, options);

        processSubscription(sub, handler);

        return;
    },
};
