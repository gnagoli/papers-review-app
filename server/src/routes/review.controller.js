const Review = require("../models/review.model");
const User = require("../models/user.model");
const Paper = require("../models/paper.model");
const ReviewRequest = require("../models/review-request.model");

/**
 * Handle create peview
 *
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
async function createReviewHandler(req, res) {
  const { reviewer, paper, title, comment, decision, request } = req.body;

  return Paper.findById(paper)
    .then(async (paperDetails) => {
      if (!paperDetails) {
        return res.status(400).send({ message: "Invalid paper id" });
      }
      const savedReview = await Review.create({
        reviewer: reviewer || req.user.email,
        comment,
        decision,
        request,
        paper_id: paper,
        title: title || paperDetails.title,
      });

      ReviewRequest.findById(request)
        .then((rreq) => {
          ReviewRequest.updateOne({ _id: rreq._id }, { status: "REVIWED" });
        })
        .catch((err) => {
          console.log("no request fund for the review");
        });

      return res.status(201).send(savedReview);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "An error ocured verify. your inputs and try again later",
      });
    });
}

/**
 * Handle findAll peview
 * @param {} req
 * @param {*} res
 * @returns
 */
async function findAllReviewHandler(req, res) {
  const user = await User.findById(req.user.user_id);
  let peviews = [];
  if (user.role === "ADMIN") {
    peviews = await Review.find({});
  } else {
    peviews = await Review.find({ reviwer: user.email });
  }
  return res.status(200).send(peviews);
}

module.exports = { createReviewHandler, findAllReviewHandler };
