const path = require("path");

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

async function addPaperFileHandler(req, res) {
  const file = req.files.paperfile;

  return Paper.findById(req.params.id)
    .then(async (paper) => {
      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "files",
        req.params.id + "_" + file.name
      );
      file.mv(filePath, async (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        await Paper.updateOne(
          { _id: paper._id },
          { fileurl: path.join("files", req.params.id + "_" + file.name) }
        );
        return res.send({ status: "success", path: filePath });
      });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
}

async function getPaperHandler(req, res) {
  return Paper.findById(req.params.id)
    .then((paper) => {
      return res.status(200).send(paper);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

async function getPaperFileHandler(req, res) {
  return Paper.findById(req.params.id)
    .then((paper) => {
      return res
        .status(200)
        .sendFile(path.join(__dirname, "..", "..", paper.fileurl));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

module.exports = {
  createPaperHandler,
  findAllPaperHandler,
  addPaperFileHandler,
  getPaperFileHandler,
  getPaperHandler,
};
