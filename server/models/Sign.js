const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SignSchema = new Schema({
  signAt: String,
});

module.exports = mongoose.model("Sign", SignSchema);
