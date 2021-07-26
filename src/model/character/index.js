class Character {
  constructor(x = 0, y = 0, socketId) {
    this.x = x;
    this.y = y;
    this.animation = "turn";
    this.socketId = socketId;
    this.currentMap = undefined;
  }

  setCharacterState(newX, newY, newAnimation) {
    this.x = newX;
    this.y = newY;
    this.animation = newAnimation;

    return this;
  }

  getCharacterState() {
    return {
      x: this.x,
      y: this.y,
      animation: this.animation,
      socketId: this.socketId,
    };
  }

  getSocketId() {
    return this.socketId;
  }

  setCurrentMap(map) {
    this.currentMap = map;

    return this;
  }

  getCurrentMap() {
    return this.currentMap;
  }
}

module.exports = Character;
