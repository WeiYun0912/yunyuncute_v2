const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const YunSchema = new Schema({
  points: Number,
  signAt: String,
  signDays: Number,
  continuousSignDay: Number,
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Yun", YunSchema);
