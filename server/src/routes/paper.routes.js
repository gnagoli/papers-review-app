const express = require("express");

const auth = require("../middlewares/auth.middleware");
const {
  createPaperHandler,
  findAllPaperHandler,
} = require("./paper.controller");

const paperRouter = express.Router();

paperRouter.post("/papers", auth.verifyToken, createPaperHandler);

paperRouter.get("/papers", auth.verifyToken, findAllPaperHandler);

module.exports = paperRouter;
