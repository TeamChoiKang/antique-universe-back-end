class CharacterGroup {
  constructor() {
    this.characterGroup = {};
  }

  getCharacterGroupState() {
    const characterGroupState = {};

    Object.keys(this.characterGroup).forEach(key => {
      characterGroupState[key] = this.characterGroup[key].getCharacterState();
    });

    return characterGroupState;
  }

  getCharacterGroupSocketIdList() {
    const socketIdList = [];

    Object.keys(this.characterGroup).forEach(key => {
      socketIdList.push(this.characterGroup[key].getSocketId());
    });

    return socketIdList;
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
