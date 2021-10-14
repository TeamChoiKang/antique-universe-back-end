module.exports = (io, socket, character, sceneGroup) => {
  socket.on('map:hasShopOwner', sceneName => {
    const shopScene = sceneGroup.findSceneByName(sceneName);
    const response = { owner: shopScene.getOwner() };
    socket.emit('map:hasShopOwner', response);
  });

  socket.on('map:registerShopOwner', ({ socketId, sceneName }) => {
    const shopScene = sceneGroup.findSceneByName(sceneName);
    shopScene.setOwner(socketId);
  });

  socket.on('map:join', sceneName => {
    const newScene = sceneGroup.findSceneByName(sceneName);
    const prevScene = character.getCurrentScene();

    character.setCharacterState(500, 500);

    if (prevScene) {
      prevScene.removeCharacter(character);
      socket.to(prevScene.getName()).emit('character:disconnection', socket.id);
      socket.leave(prevScene.getName());
    }

    socket.emit('character:currentCharacter', {
      currentCharacter: newScene.getCharacterGroupState(),
      owner: newScene.getOwner ? newScene.getOwner() : undefined,
    });

    character.setCurrentScene(newScene);
    newScene.appendCharacter(character);
    socket.join(newScene.getName());
  });
};
