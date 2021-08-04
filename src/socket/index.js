module.exports = server => {
  const io = require('socket.io')(server, { cors: { origin: '*' } });

  const registerCharacterHandler = require('./character');

  const CharacterGroup = require('@/model/characterGroup');
  const Character = require('@/model/character');

  const characterGroup = new CharacterGroup();

  const connectionHandler = socket => {
    const character = new Character(450, 350, socket.id);

    registerCharacterHandler(socket, characterGroup, character);

    socket.on('disconnect', () => {
      characterGroup.removeCharacterBySocketId(socket.id);
      io.emit('character:disconnection', socket.id);
    });
  };

  io.on('connection', connectionHandler);
};
