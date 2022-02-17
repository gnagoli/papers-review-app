const mongoose = require("mongoose");

const paperSchema = mongoose.Schema({
  title: { type: String, default: null },
  subject: { type: String, default: null },
  key_words: { type: String, default: null },
  author: { type: String, default: null },
  summary: { type: String, default: null },
  file_url: { type: String, default: null },
  status: { type: String, default: null },
  submission_date: { type: Date, default: new Date() },
});

module.exports = mongoose.model("paper", paperSchema);
