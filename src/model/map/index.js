const CharacterGroup = require('@/model/characterGroup');

class Map {
  constructor(mapName) {
    this._mapName = mapName;
    this._characterGroup = new CharacterGroup();
  }

  getName() {
    return this._mapName;
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

module.exports = Map;
