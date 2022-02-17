const express = require("express");

const auth = require("../middlewares/auth.middleware");
const {
  createReviewRequestHandler,
  findAllReviewRequestHandler,
} = require("./review-request.controller");

const reviewRequestRouter = express.Router();

reviewRequestRouter.post(
  "/review-requests",
  auth.verifyToken,
  auth.admin,
  createReviewRequestHandler
);

reviewRequestRouter.get(
  "/review-requests",
  auth.verifyToken,
  findAllReviewRequestHandler
);

module.exports = reviewRequestRouter;
