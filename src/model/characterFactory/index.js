const Character = require('@/model/character');

class CharacterFactory {
  static getMyCharacter(socket) {
    return new Character(0, 0, socket.id);
  }
}

module.exports = CharacterFactory;
