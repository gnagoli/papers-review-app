const mongoose = require("mongoose");

const reviewRequestModel = mongoose.Schema({
  reviewer: { type: String },
  paper_id: { type: String },
  title: { type: String },
  request_date: { type: Date, default: new Date() },
  status: { type: String, default: "PENDING" },
});

module.exports = mongoose.model("reviewRequest", reviewRequestModel);
