const CharacterGroup = require('@/model/characterGroup');

class Scene {
  constructor(sceneName) {
    this._sceneName = sceneName;
    this._characterGroup = new CharacterGroup();
  }

  getName() {
    return this._sceneName;
  }

  getCharacterGroupState() {
    return this._characterGroup.getCharacterGroupState();
  }

  appendCharacter(newCharacter) {
    return this._characterGroup.appendCharacter(newCharacter);
  }

  removeCharacter(character) {
    return this._characterGroup.removeCharacterBySocketId(character.getSocketId());
  }
}

module.exports = Scene;
