import axios from "axios";
import { $nats } from "./nats";
import express from "express";
import morgan from "morgan";

const app = express();
app.use(morgan("tiny"));

app.get("/http", async (req, res) => {
    try {
        let response = await axios.get("http://server:3000/request");

        return res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.get("/ping", async (req, res) => {
    try {
        return res.status(200).json("pong");
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.get("/nats", async (req, res) => {
    try {
        return res.status(200).json(await $nats.request("request"));
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.listen(3000, () => {
    console.log(`Client listening on port 3000`);
});
