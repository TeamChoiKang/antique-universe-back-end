module.exports = (socket, character) => {
  socket.on('character:start', () => {
    socket.emit('character:myCharacter', character.getCharacterState());

    socket
      .to(character.getCurrentMap().getName())
      .emit('character:newCharacter', character.getCharacterState());
  });

  socket.on('character:move', movementData => {
    character.setCharacterState(movementData.x, movementData.y, movementData.animation);

    socket
      .to(character.getCurrentMap().getName())
      .emit('character:moved', character.getCharacterState());
  });
};
