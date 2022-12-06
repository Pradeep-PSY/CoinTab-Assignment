const express = require("express");
const connection = require("./config/db");
const cors = require("cors");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const userController = require("./controller/userController");
const homeController = require("./controller/homeController");
require("dotenv").config();
const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("welcome to cointab backend");
});

const store = new MongoDBSession({
    uri: process.env.MONGO_URL,
    collection: "mySessions",
});

app.use(
    session({
        secret: "cointab",
        resave: false,
        saveUninitialized: false,
        Store: store,
    })
);

app.use("/user", userController);

app.use("/home", homeController);

app.listen(5000, async () => {
    try {
        await connection;
        console.log("database is connected");
    } catch (err) {
        console.log("connection error", err);
    }
    console.log("server is started");
});
