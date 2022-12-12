const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  serialNumber: {type: String, required: true},
  purchaseDate: {type: Date, required: true},
  seat: {type: String},
  category: {type: mongoose.Types.ObjectId, required: true},
  userId: {type: mongoose.Types.ObjectId, ref: 'users', required: true},
  redeemed: {type: Boolean, required: true}
});

const Ticket = mongoose.model('tickets', schema);
module.exports = Ticket;