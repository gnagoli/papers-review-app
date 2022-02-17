const mongoose = require("mongoose");

const reviewRequestModel = mongoose.Schema({
  reviwer_id: { type: String },
  paper_id: { type: String },
  request_date: { type: Date, default: new Date() },
  status: { type: String },
});

module.exports = mongoose.model("reviewRequest", reviewRequestModel);
