module.exports = (server) => {
  const io = require('socket.io')(server, { cors: { origin: '*' } });

  const registerCharacterHandler = require('./character');

  let characters = {};

  const connectionHandler = (socket) => {
    registerCharacterHandler(io, socket, characters);

    socket.on('au:disconnection', () => {
      delete characters[socket.id];
      io.emit('character:disconnection', socket.id);
    });
  };

  io.on('au:connection', connectionHandler);
};
