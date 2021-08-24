import { $nats, client, codec } from "./nats";
import express from "express";

let app = express();
let response = {
    foo: "bar",
    rick: "c-137",
};

app.get("/request", async (req, res) => {
    return res.json(response);
});

app.listen(3000, async () => {
    console.log(`Server listening on port 3000`);
});

$nats
    .subscribe(
        "request",
        async (msg) => {
            msg.respond(codec.encode(response));
        },
        { queue: "server" }
    )
    .then(() => {
        console.log(`Server NATS subscription ready`);
    });
