module.exports = server => {
  const io = require('socket.io')(server, { cors: { origin: '*' } });

  const registerCharacterHandler = require('./character');

  const CharacterGroup = require('@/model/characterGroup');
  const Character = require('@/model/character');

  const characterGroup = new CharacterGroup();

  const connectionHandler = socket => {
    const character = new Character(450, 350, socket.id);
    characterGroup.appendCharacter(character);

    registerCharacterHandler(socket, characterGroup, character);

    socket.on('disconnect', () => {
      delete characterGroup[socket.id];
      io.emit('character:disconnection', socket.id);
    });
  };

  io.on('connection', connectionHandler);
};
