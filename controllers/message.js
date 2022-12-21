const { socket } = require("../socket");

const controller = {
  create: async (req, res) => {
    let { name } = req.user;
    let {message, color} = req.body;
    socket.io.emit('message', {name, message, color});

    try {
      res.status(201).json({
        success: true,
        message: "message sent",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = controller;
