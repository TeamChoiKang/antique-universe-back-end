module.exports = (io, socket, characters) => {
  characters[socket.id] = {
    xCoordinate: 450,
    yCoordinate: 350,
    animation: 'turn',
    socketId: socket.id,
  };

  socket.emit('character:currentCharacter', characters);

  socket.broadcast.emit('character:newCharacter', characters[socket.id]);

  socket.on('character:move', (movementData) => {
    characters[socket.id].xCoordinate = movementData.xCoordinate;
    characters[socket.id].yCoordinate = movementData.yCoordinate;
    characters[socket.id].animation = movementData.animation;

    socket.broadcast.emit('character:moved', characters[socket.id]);
  });
};
