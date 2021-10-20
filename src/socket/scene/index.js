module.exports = (io, socket, character, sceneGroup) => {
  socket.on('map:getShopOwner', sceneName => {
    const shopScene = sceneGroup.findSceneByName(sceneName);
    const response = { owner: shopScene.getOwner ? shopScene.getOwner() : undefined };
    socket.emit('map:getShopOwner', response);
  });

  socket.on('map:registerShopOwner', ({ socketId, sceneKey }) => {
    const shopScene = sceneGroup.findSceneByName(sceneKey);
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

      if (prevScene.getOwner) {
        const shopPeerConnectionManager = prevScene.getPeerConnectionManager();
        if (prevScene.getOwner() === socket.id) {
          shopPeerConnectionManager.removeReceiverPeerConnection();
        } else {
          shopPeerConnectionManager.removeSenderPeerConnection(socket.id);
        }
      }
    }

    socket.emit('character:currentCharacter', newScene.getCharacterGroupState());

    character.setCurrentScene(newScene);
    newScene.appendCharacter(character);
    socket.join(newScene.getName());
  });
};
