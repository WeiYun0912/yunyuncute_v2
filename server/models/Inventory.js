const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  name: String,
  isExchange: Boolean,
  exchangeDate: String,
});

module.exports = mongoose.model("Inventory", InventorySchema);
