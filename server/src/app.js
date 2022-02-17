const express = require("express");

require("dotenv").config();
const database = require("./configs/database");

database.connect();


const app = express();

app.use(express.json());

module.exports = { app };
