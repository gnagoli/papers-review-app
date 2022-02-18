const nodemailer = require("nodemailer");

const ReviewRequest = require("../models/review-request.model");
const User = require("../models/user.model");
const Paper = require("../models/paper.model");
const { request } = require("express");

/**
 * Handle create reviewrequest request
 *
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
async function createReviewRequestHandler(req, res) {
  console.log(req.data);
  const { reviewer, paper, title } = req.body;

  return Paper.findById(paper)
    .then(async (paperDetails) => {
      if (!paperDetails) {
        return res.status(400).send({ message: "Invalid paper id" });
      }
      const savedReviewRequest = await ReviewRequest.create({
        reviewer,
        paper_id: paper,
        title: title || paperDetails.title,
      });
      sendMail(savedReviewRequest);
      return res.status(201).send(savedReviewRequest);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "An error ocured verify. your inputs and try again later",
      });
    });
}

/**
 * Handle findAll reviewrequest request
 * @param {} req
 * @param {*} res
 * @returns
 */
async function findAllReviewRequestHandler(req, res) {
  const user = await User.findById(req.user.user_id);
  let reviewrequests = [];
  if (user.role === "ADMIN") {
    reviewrequests = await ReviewRequest.find({});
  } else {
    reviewrequests = await ReviewRequest.find({ reviewer: user.email });
  }
  return res.status(200).send(reviewrequests);
}

/**
 *
 * @param {*} reviewRequest
 */
async function sendMail(reviewRequest) {
  // create reusable transporter object using the default SMTP transport
  // console.log(process.env.SMTP_USER, process.env.SMTP_PASSWORD, process.env);
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  console.log(reviewRequest);
  // send mail with defined transport object
  await transporter.sendMail({
    from: `"IFRI - UAC | Paper review " <${process.env.SMTP_EMAIL}>`, // sender address
    to: `${reviewRequest.reviewer}`, // list of receivers
    subject: "New paper submited for review", // Subject line
    html: `${reviewRequestMail(reviewRequest)}`, // html body
  });
}

const reviewRequestMail = (rrq) => {
  return `
   <p> Merci de bien vouloir donner votre avis sur cet nouvel article intitule: <strong>${rrq.title}<strong>. </p>
   <a href="${process.env.APP_URL}/view/papers/${rrq.paper_id}", style="display:block; background: blue; width:90px;heigth:15px;color:white;">Voir l'article</a>
   `;
};

module.exports = { createReviewRequestHandler, findAllReviewRequestHandler };
