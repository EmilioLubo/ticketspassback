const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  capacity: { type: Number, required: true },
  type: { type: String, required: true },
  location: { type: String },
  country: { type: String, required: true },
  city: { type: String, required: true },
});

const Venue = mongoose.model("venues", schema);
module.exports = Venue;
