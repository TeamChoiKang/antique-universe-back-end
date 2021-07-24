module.exports = (socket, characterGroup, character) => {
  socket.emit(
    "character:currentCharacter",
    characterGroup.getCharacterGroupState()
  );

  socket.broadcast.emit(
    "character:newCharacter",
    character.getCharacterState()
  );

  socket.on("character:move", (movementData) => {
    character.setCharacterState(
      movementData.x,
      movementData.y,
      movementData.animation
    );

    socket.broadcast.emit("character:moved", character.getCharacterState());
  });
};
