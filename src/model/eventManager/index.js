class EventManager {
  constructor(socket) {
    this._socket = socket;
  }

  registerSceneEventListner(sceneGroup, character) {
    this._socket.on('map:join', sceneName => {
      const newScene = sceneGroup.findSceneByName(sceneName);
      const prevScene = character.getCurrentScene();

      character.setCharacterState(500, 500);

      if (prevScene) {
        prevScene.removeCharacter(character);
        this._socket.to(prevScene.getName()).emit('character:disconnection', this._socket.id);
        this._socket.leave(prevScene.getName());
      }

      this._socket.emit('character:currentCharacter', newScene.getCharacterGroupState());

      character.setCurrentScene(newScene);
      newScene.appendCharacter(character);
      this._socket.join(newScene.getName());
    });
  }

  registerChracterEventListner(character) {
    this._socket.on('character:start', () => {
      this._socket.emit('character:myCharacter', character.getCharacterState());

      this._socket
        .to(character.getCurrentScene().getName())
        .emit('character:newCharacter', character.getCharacterState());
    });

    this._socket.on('character:move', movementData => {
      character.setCharacterState(movementData.x, movementData.y, movementData.animation);

      this._socket
        .to(character.getCurrentScene().getName())
        .emit('character:moved', character.getCharacterState());
    });
  }

  registerChatEventListners() {
    this._socket.on('chat:createNewChat', newChat => {
      this._socket.broadcast.emit('chat:getNewChat', newChat);
    });
  }

  registerDisconnectEventListner(character) {
    this._socket.on('disconnect', () => {
      const scene = character.getCurrentScene();
      scene.removeCharacter(character);
      this._socket.to(scene.getName()).emit('character:disconnection', this._socket.id);
    });
  }
}

module.exports = EventManager;
