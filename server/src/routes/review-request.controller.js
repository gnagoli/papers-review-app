const ReviewRequest = require("../models/review-request.model");
const User = require("../models/user.model");
const Paper = require("../models/paper.model");
/**
 * Handle create peviewrequest request
 *
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
async function createReviewRequestHandler(req, res) {
  console.log(req.data);
  const { reviwer, paper, title } = req.body;

  return Paper.findById(paper)
    .then(async (paperDetails) => {
      if (!paperDetails) {
        return res.status(400).send({ message: "Invalid paper id" });
      }
      const savedReviewRequest = await ReviewRequest.create({
        reviwer,
        paper_id: paper,
        title: title || paperDetails.title,
      });
      return res.status(201).send(savedReviewRequest);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "An error ocured verify. your inputs and try again later",
      });
    });
}

/**
 * Handle findAll peviewrequest request
 * @param {} req
 * @param {*} res
 * @returns
 */
async function findAllReviewRequestHandler(req, res) {
  const user = await User.findById(req.user.user_id);
  let peviewrequests = [];
  if (user.role === "ADMIN") {
    peviewrequests = await ReviewRequest.find({});
  } else {
    peviewrequests = await ReviewRequest.find({ reviwer: user.email });
  }
  return res.status(200).send(peviewrequests);
}

module.exports = { createReviewRequestHandler, findAllReviewRequestHandler };
