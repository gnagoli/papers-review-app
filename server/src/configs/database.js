const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

async function connect() {
  return mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = { connect };
