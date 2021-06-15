module.exports = (server) => {
  const io = require('socket.io')(server, { cors: { origin: '*' } });

  const registerCharacterHandler = require('./character');

  const characterGroup = {};

  const connectionHandler = (socket) => {
    registerCharacterHandler(io, socket, characterGroup);

    socket.on('disconnect', () => {
      delete characterGroup[socket.id];
      io.emit('character:disconnection', socket.id);
    });
  };

  io.on('connection', connectionHandler);
};
