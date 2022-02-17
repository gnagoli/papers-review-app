const express = require("express");

const { registerHandler, loginHandler } = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/register", registerHandler);

userRouter.post("/login", loginHandler);

module.exports = userRouter;
