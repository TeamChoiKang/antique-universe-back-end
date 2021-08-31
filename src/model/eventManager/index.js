class EventManager {
  constructor(socket, character) {
    this._socket = socket;
    this._character = character;
  }

  registerSceneEventListner(sceneGroup) {
    this._socket.on('map:join', sceneName => {
      const newScene = sceneGroup.findSceneByName(sceneName);
      const prevScene = this._character.getCurrentScene();

      this._character.setCharacterState(500, 500);

      if (prevScene) {
        prevScene.removeCharacter(this._character);
        this._socket.to(prevScene.getName()).emit('character:disconnection', this._socket.id);
        this._socket.leave(prevScene.getName());
      }

      this._socket.emit('character:currentCharacter', newScene.getCharacterGroupState());

      this._character.setCurrentScene(newScene);
      newScene.appendCharacter(this._character);
      this._socket.join(newScene.getName());
    });
  }

  registerChracterEventListner() {
    this._socket.on('character:start', () => {
      this._socket.emit('character:myCharacter', this._character.getCharacterState());

      this._socket
        .to(this._character.getCurrentScene().getName())
        .emit('character:newCharacter', this._character.getCharacterState());
    });

    this._socket.on('character:move', movementData => {
      this._character.setCharacterState(movementData.x, movementData.y, movementData.animation);

      this._socket
        .to(this._character.getCurrentScene().getName())
        .emit('character:moved', this._character.getCharacterState());
    });
  }

  registerChatEventListners() {
    this._socket.on('chat:createNewChat', newChat => {
      this._socket.broadcast.emit('chat:getNewChat', newChat);
    });
  }

  registerDisconnectEventListner() {
    this._socket.on('disconnect', () => {
      const scene = this._character.getCurrentScene();
      scene.removeCharacter(this._character);
      this._socket.to(scene.getName()).emit('character:disconnection', this._socket.id);
    });
  }
}

module.exports = EventManager;
