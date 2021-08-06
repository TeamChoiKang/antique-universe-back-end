module.exports = server => {
  const io = require('socket.io')(server, { cors: { origin: '*' } });

  const Map = require('@/model/map');
  const MapGroup = require('@/model/mapGroup');
  const Character = require('@/model/character');

  const registerMapHandler = require('@/socket/map');
  const registerCharacterHandler = require('@/socket/character');

  const mapGroup = new MapGroup();
  mapGroup.appendMap(new Map('village'));
  mapGroup.appendMap(new Map('shop'));

  const connectionHandler = socket => {
    const myCharacter = new Character(0, 0, socket.id);

    registerMapHandler(socket, mapGroup, myCharacter);
    registerCharacterHandler(socket, myCharacter);

    socket.on('disconnect', () => {
      const map = myCharacter.getCurrentMap();
      map.removeCharacter(myCharacter);
      socket.to(map.getName()).emit('character:disconnection', socket.id);
    });
  };

  io.on('connection', connectionHandler);
};
