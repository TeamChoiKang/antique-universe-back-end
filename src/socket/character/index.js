module.exports = (io, socket, characters) => {
  characters[socket.id] = {
    xCoordinate: 450,
    yCoordinate: 350,
    animation: 'turn',
    socketId: socket.id,
  };

  socket.emit('currentCharacter', characters);

  socket.broadcast.emit('newCharacter', characters[socket.id]);

  socket.on('characterMovement', (movementData) => {
    characters[socket.id].xCoordinate = movementData.xCoordinate;
    characters[socket.id].yCoordinate = movementData.yCoordinate;
    characters[socket.id].animation = movementData.animation;

    socket.broadcast.emit('characterMoved', characters[socket.id]);
  });
};
