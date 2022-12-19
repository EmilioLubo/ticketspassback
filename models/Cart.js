const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  concertId: { type: mongoose.Types.ObjectId, ref: "concerts", required: true },
  concertName: { type: String, required: true },
  categoryName: { type: String, required: true },
  photo: {type: String, required: true},
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const schema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  items: [itemSchema],
  total: { default: 0, type: Number },
});

const Cart = mongoose.model("carts", schema);
module.exports = Cart;
