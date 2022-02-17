const express = require("express");

require("dotenv").config();
const database = require("./configs/database");
const userRouter = require("./routes/user.routes");

database.connect();


const app = express();

app.use(express.json());

app.use(userRouter)

module.exports = { app };
