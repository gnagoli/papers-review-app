const express = require("express");
const auth = require("../middlewares/auth.middleware");

const { registerHandler, loginHandler, getUsersHandler } = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/register", registerHandler);

userRouter.post("/login", loginHandler);

userRouter.get('/users', auth, getUsersHandler)

module.exports = userRouter;
