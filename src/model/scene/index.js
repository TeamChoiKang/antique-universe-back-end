const CharacterGroup = require('@/model/characterGroup');

class Scene {
  constructor(sceneName) {
    this._sceneName = sceneName;
    this._characterGroup = new CharacterGroup();
  }

  getName() {
    return this._sceneName;
  }

  getCharacterGroup() {
    return this._characterGroup;
  }

  getCharacterGroupState() {
    return this._characterGroup.getCharacterGroupState();
  }

  getCharacterGroupSocketIdList() {
    return this._characterGroup.getCharacterGroupSocketIdList();
  }

  appendCharacter(newCharacter) {
    return this._characterGroup.appendCharacter(newCharacter);
  }

  removeCharacter(character) {
    return this._characterGroup.removeCharacterBySocketId(character.getSocketId());
  }
}

module.exports = Scene;
