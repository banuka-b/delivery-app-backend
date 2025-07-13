// models/delivery.js
const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  username: { type: String, required: true }, 
  customer: String,
  address: String,
  details: String,
  date: Date,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Delivery", deliverySchema);
