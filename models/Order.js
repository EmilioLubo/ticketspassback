const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: {type: mongoose.Types.ObjectId},
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  birthDate: {type: Date},
  email: {type: String, required: true},
});

const itemSchema = new mongoose.Schema({
  concertId: { type: mongoose.Types.ObjectId, ref: "concerts", required: true },
  concertName: { type: String, required: true },
  categoryName: { type: String, required: true },
  photo: {type: String, required: true},
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const schema = new mongoose.Schema({
  userId: userSchema,
  orderId: {type: String, required: true},
  paymentId: {type: String, required: true},
  transactionAmount: {type: Number, required: true},
  status: {type: String, required: true},
  date: {type: Date, required: true},
  items: [itemSchema]
});

const Order = mongoose.model("orders", schema);
module.exports = Order;