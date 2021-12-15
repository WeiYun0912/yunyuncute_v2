const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RewardSchema = new Schema({
  name: String,
  description: String,
  image: String,
  point: Number,
});

module.exports = mongoose.model("Reward", RewardSchema);
