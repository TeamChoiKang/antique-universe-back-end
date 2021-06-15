module.exports = (io, socket, characters) => {
  characters[socket.id] = {
    x: 450,
    y: 350,
    animation: 'turn',
    socketId: socket.id,
  };

  socket.emit('character:currentCharacter', characters);

  socket.broadcast.emit('character:newCharacter', characters[socket.id]);

  socket.on('character:move', (movementData) => {
    characters[socket.id].x = movementData.x;
    characters[socket.id].y = movementData.y;
    characters[socket.id].animation = movementData.animation;

    socket.broadcast.emit('character:moved', characters[socket.id]);
  });
};
