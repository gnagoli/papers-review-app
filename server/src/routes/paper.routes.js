const express = require("express");

const auth = require("../middlewares/auth.middleware");
const {
  createPaperHandler,
  findAllPaperHandler,
  addPaperFileHandler,
  getPaperFileHandler,
  getPaperHandler
} = require("./paper.controller");

const paperRouter = express.Router();

paperRouter.post("/papers/:id/file", auth.verifyToken, addPaperFileHandler);
paperRouter.get("/papers/:id/file", auth.verifyToken, getPaperFileHandler);
paperRouter.get("/papers/:id", auth.verifyToken, getPaperHandler);
paperRouter.post("/papers", auth.verifyToken, createPaperHandler);
paperRouter.get("/papers", auth.verifyToken, findAllPaperHandler);

module.exports = paperRouter;
