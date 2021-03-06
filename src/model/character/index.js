const PeerConnectionManager = require('@/model/peerConnectionManager');

class Character {
  constructor(x = 0, y = 0, socketId) {
    this.x = x;
    this.y = y;
    this.animation = 'turn';
    this.socketId = socketId;
    this.currentScene = undefined;
    this._peerConnectionManager = new PeerConnectionManager();
  }

  setCharacterState(newX, newY, newAnimation = 'turn') {
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

  setCurrentScene(scene) {
    this.currentScene = scene;

    return this;
  }

  getCurrentScene() {
    return this.currentScene;
  }

  getPeerConnectionManager() {
    return this._peerConnectionManager;
  }
}

module.exports = Character;
