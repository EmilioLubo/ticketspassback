const Cart = require("../models/Cart");
const Order = require("../models/Order");

const controller = {
  create: async (req, res) => {
    const userId = req.user.id;
    const { payment_id, status, date, transaction_amount, orderId } = req.body;
    try {
      const cart = await Cart.findOne({ userId }).populate("userId");
      if (cart) {
        const orderExists = await Order.findOne({ orderId });
        if (!orderExists) {
          const order = await Order.create({
            paymentId: payment_id,
            status,
            date,
            transactionAmount: transaction_amount,
            userId: cart.userId,
            items: cart.items,
            orderId,
          });
          cart.items = [];
          await cart.save();
          res.status(201).json({
            success: true,
            message: "The order was created successfully",
            response: order,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Order already exists",
          });  
        }
      } else {
        res.status(404).json({
          success: false,
          message: "Couldn't find the cart",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  read: async(req, res) => {
    try {
      const userId = req.user.id;
      const orders = await Order.find({"userId._id": userId});
      if(orders.length) {
        res.status(200).json({
          success: true,
          response: orders,
          message: "Orders found"
        })        
      } else {
        res.status(400).json({
          success: false,
          message: "Couldn't find orders",
        });
      }
    }catch(error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

module.exports = controller;
