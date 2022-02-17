const Paper = require("../models/paper.model");
const User = require("../models/user.model");

/**
 * Handle create paper request
 *
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
async function createPaperHandler(req, res) {
  const { title, subject, keywords, author, summary } = req.body;

  const savedPaper = await Paper.create({
    title,
    subject,
    keywords,
    author: author || req.user.email,
    summary,
  });

  return res.status(201).send(savedPaper);
}

/**
 * Handle findAll paper request
 * @param {} req
 * @param {*} res
 * @returns
 */
async function findAllPaperHandler(req, res) {
  const user = await User.findById(req.user.user_id);
  let papers = [];
  if (user.role === "ADMIN") {
    papers = await Paper.find({});
  } else {
    papers = await Paper.find({ author: user.email });
  }
  return res.status(200).send(papers);
}

module.exports = { createPaperHandler, findAllPaperHandler };
