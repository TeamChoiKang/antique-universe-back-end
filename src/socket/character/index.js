module.exports = (io, socket, characterGroup) => {
  characterGroup[socket.id] = {
    x: 450,
    y: 350,
    animation: 'turn',
    socketId: socket.id,
  };

  socket.emit('character:currentCharacter', characterGroup);

  socket.broadcast.emit('character:newCharacter', characterGroup[socket.id]);

  socket.on('character:move', (movementData) => {
    characterGroup[socket.id].x = movementData.x;
    characterGroup[socket.id].y = movementData.y;
    characterGroup[socket.id].animation = movementData.animation;

    socket.broadcast.emit('character:moved', characterGroup[socket.id]);
  });
};
