const express = require("express");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const database = require("./configs/database");
const userRouter = require("./routes/user.routes");
const User = require("./models/user.model");

async function initData() {
  await User.updateOne(
    { email: "admi@ifri.org" },
    {
      email: "admi@ifri.org",
      first_name: "Admin",
      last_name: "System",
      role: "ADMIN",
      password: await bcrypt.hash("password", 10),
    },
    { upsert: true }
  );
  console.log("database initialized successfully");
}

database
  .connect()
  .then(() => {
    console.log("Successfully connected to database");
    initData();
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });

const app = express();

app.use(express.json());

app.use(userRouter);

module.exports = { app };
