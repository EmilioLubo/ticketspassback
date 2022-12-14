const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  area: { type: String },
});

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  banner: { type: String, required: true },
  artists: [{ type: mongoose.Types.ObjectId, ref: "artists", required: true }],
  date: { type: Date, required: true },
  youtubeVideo: {type: String},
  description: {type: String, required: true},
  venue: { type: mongoose.Types.ObjectId, ref: "venues", required: true },
  type: { type: String, required: true },
  category: {type: categorySchema, required: true}
});

const Concert  = mongoose.model("concerts", schema);
module.exports = Concert;
