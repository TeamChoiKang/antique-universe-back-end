module.exports = (socket, character, sceneGroup) => {
  socket.on('map:join', sceneName => {
    const newScene = sceneGroup.findSceneByName(sceneName);
    const prevScene = character.getCurrentScene();

    character.setCharacterState(500, 500);

    if (prevScene) {
      prevScene.removeCharacter(character);
      socket.to(prevScene.getName()).emit('character:disconnection', socket.id);
      socket.leave(prevScene.getName());
    }

    socket.emit('character:currentCharacter', newScene.getCharacterGroupState());

    character.setCurrentScene(newScene);
    newScene.appendCharacter(character);
    socket.join(newScene.getName());
  });
};
