const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LotterySchema = new Schema({
  name: String,
  lotteryDate: String,
});

module.exports = mongoose.model("Lottery", LotterySchema);
