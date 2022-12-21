const { Server } = require("socket.io");
const socket = {};

function connect(server) {
  socket.io = new Server(server, {
    cors: {
      origin: true,
    },
  });
}

module.exports = {
  connect,
  socket,
};
