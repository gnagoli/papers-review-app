const express = require("express");

const auth = require("../middlewares/auth.middleware");

const {
  createReviewHandler,
  findAllReviewHandler,
} = require("./review.controller");

const reviewRouter = express.Router();

reviewRouter.post(
  "/reviews",
  auth.verifyToken,
  createReviewHandler
);

reviewRouter.get(
  "/reviews",
  auth.verifyToken,
  findAllReviewHandler
);

module.exports = reviewRouter;
