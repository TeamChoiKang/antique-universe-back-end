class CharacterGroup {
  constructor() {
    this.characterGroup = {};
  }

  getCharacterGroupState() {
    const characterGroupState = {};

    Object.keys(this.characterGroup).forEach((key) => {
      characterGroupState[key] = this.characterGroup[key].getCharacterState();
    });

    return characterGroupState;
  }

  appendCharacter(newCharacter) {
    this.characterGroup[newCharacter.getSocketId()] = newCharacter;

    return this;
  }

  findCharacterBySocketId(socketId) {
    return this.characterGroup[socketId];
  }

  removeCharacterBySocketId(socketId) {
    return delete this.characterGroup[socketId];
  }
}

module.exports = CharacterGroup;
