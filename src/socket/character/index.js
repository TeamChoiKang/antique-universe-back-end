module.exports = (socket, characterGroup, character) => {
  socket.on('character:start', () => {
    socket.emit('character:myCharacter', character.getCharacterState());
    socket.emit('character:currentCharacter', characterGroup.getCharacterGroupState());

    socket.broadcast.emit('character:newCharacter', character.getCharacterState());

    characterGroup.appendCharacter(character);

    socket.on('character:move', movementData => {
      character.setCharacterState(movementData.x, movementData.y, movementData.animation);

      socket.broadcast.emit('character:moved', character.getCharacterState());
    });
  });
};
