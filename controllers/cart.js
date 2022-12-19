const mercadopago = require("mercadopago");
const Cart = require("../models/Cart");
const Concert = require("../models/Concert");

const controller = {
  create: async (req, res) => {
    const userId = req.user.id;
    const { concertId, quantity } = req.body;
    try {
      const cart = await Cart.findOne({ userId });
      const concert = await Concert.findById(concertId);
      if (!concert) {
        res.status(404).json({
          success: false,
          message: "Couldn't find the product",
        });
      } else {
        const price = concert.category.price;
        const concertName = concert.name;
        const categoryName = concert.category.name;
        const photo = concert.photo;
        if (cart) {
          const itemIndex = cart.items.findIndex(item => item.concertId.equals(concert._id));
          if (itemIndex > -1) {
            let product = cart.items[itemIndex];
            product.quantity = quantity;
            cart.total = cart.items.reduce((acc, curr) => {
              return acc + curr.quantity * curr.price;
            }, 0);
            await cart.save();
            res.status(200).json({
              success: true,
              response: cart,
              message: "Concert quantity modified successfully",
            });
          } else {
            cart.items.push({ concertId, concertName, categoryName, photo, quantity, price });
            cart.total = cart.items.reduce((acc, curr) => {
              return acc + curr.quantity * curr.price;
            }, 0);
            await cart.save();
            res.status(200).json({
              success: true,
              response: cart,
              message: "Concert quantity modified successfully",
            });
          }
        } else {
          const newCart = await Cart.create({
            userId,
            items: [{ concertId, concertName, categoryName, photo, quantity, price }],
            total: quantity * price,
          });
          res.status(200).json({
            success: true,
            response: newCart,
            message: "Concert added succesfully",
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  remove: async (req, res) => {
    try {
      const userId = req.user.id;
      const { concertId } = req.query;
      let cart = await Cart.findOne({ userId });
      if (!cart || cart?.items?.length === 0) {
        res.status(404).json({
          success: false,
          message: "The cart is empty",
        });
      } else if (concertId) {
        const itemIndex = cart.items.findIndex(item => item.concertId.equals(concertId));
        if (itemIndex > -1) {
          let item = cart.items[itemIndex];
          cart.total -= item.quantity * item.price;
          if (cart.total < 0) {
            cart.total = 0;
          }
          cart.items.splice(itemIndex, 1);
          cart = await cart.save();
          res.status(200).json({
            success: true,
            response: cart,
            message: "concert deleted from cart successfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "The item isn't in the cart",
          });
        }
      } else {
        res.status(400).json({
          success: "false",
          message: "You must specify a concertId",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  empty: async (req, res) => {
    try {
      const { id } = req.params;
      let cart = await Cart.findById(id);
      if (!cart || cart?.items?.length === 0) {
        res.status(404).json({
          success: false,
          message: "The cart is empty",
        });
      } else {
        cart.items = [];
        cart.total = 0;
        cart = await cart.save();
        res.status(200).json({
          success: true,
          response: cart,
          message: "The cart was emptied successfully",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  read: async (req, res) => {
    try {
      userId = req.user.id;
      let cart = await Cart.findOne({ userId });
      if (!cart || cart?.items?.length === 0) {
        res.status(404).json({
          success: false,
          message: "The cart is empty",
        });
      } else {
        res.status(200).json({
          success: true,
          response: cart,
          message: "The cart was retrieved successfully",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  pay: async (req, res) => {
    try {
      userId = req.user.id;
      let cart = await Cart.findOne({ userId }).populate("userId");
      if (cart) {
        let items = cart.items.map(item => {
          return {
            //id: item.concertId,
            //picture_url: item.photo,
            title: `${item.concertName} - ${item.categoryName}`,
            description: `${item.concertName} - ${item.categoryName}`,
            unit_price: item.price,
            quantity: item.quantity,
          };
        });
        let preference = {
          items,
          /* payer: {
            id: userId._id,
            name: userId.name,
            surname: userId.lastName,
            email: userId.email,
            
            
          }, */
          back_urls: {
            success: "http://localhost:3000/succes-payment",
            pending: "http://localhost:3000",
            failure: "http://localhost:3000",
          },
          auto_return: "approved",
        };
        let response = await mercadopago.preferences.create(preference);

        res.status(200).json({
          success: true,
          response: response.body,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Couldn't found the cart",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = controller;
