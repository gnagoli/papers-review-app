const mongoose = require("mongoose");

const reviewModel = mongoose.Schema({
  reviewer: { type: String },
  paper_id: { type: String },
  title: { type: String },
  request: { type: String },
  review_date: { type: Date, default: new Date() },
  comment: { type: String },
  decision: { type: String },
});

module.exports = mongoose.model("review", reviewModel);
