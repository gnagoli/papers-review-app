const express = require("express");

const auth = require("../middlewares/auth.middleware");

const paperRouter = express.Router();

paperRouter.post("/papers", auth.verifyToken, createPaperHandler);

paperRouter.get("/papers", auth.verifyToken, getPaperHandler);
