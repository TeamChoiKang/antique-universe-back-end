module.exports = (server) => {
  const io = require('socket.io')(server, { cors: { origin: '*' } });

  const registerCharacterHandler = require('./character');

  let characters = {};

  const connectionHandler = (socket) => {
    registerCharacterHandler(io, socket, characters);

    socket.on('disconnect', () => {
      delete characters[socket.id];
      io.emit('characterDisconnect', socket.id);
    });
  };

  io.on('connection', connectionHandler);
};
