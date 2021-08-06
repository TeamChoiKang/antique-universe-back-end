module.exports = (socket, mapGroup, character) => {
  socket.on('map:join', mapName => {
    const newMap = mapGroup.findMapByName(mapName);
    const prevMap = character.getCurrentMap();

    character.setCharacterState(500, 500);

    if (prevMap) {
      prevMap.removeCharacter(character);
      socket.to(prevMap.getName()).emit('character:disconnection', socket.id);
      socket.leave(prevMap.getName());
    }

    socket.emit('character:currentCharacter', newMap.getCharacterGroupState());

    character.setCurrentMap(newMap);
    newMap.appendCharacter(character);
    socket.join(newMap.getName());
  });
};
