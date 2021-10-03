class Character {
  constructor(x = 0, y = 0, socketId) {
    this.x = x;
    this.y = y;
    this.animation = 'turn';
    this.socketId = socketId;
    this.currentScene = undefined;
    this._stream = undefined;
    this._receiverPeerConnection = undefined;
    this._senderPeerConnectionMap = new Map();
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

  getStream() {
    return this._stream;
  }

  setStream(newStream) {
    this._stream = newStream;
  }

  getReceiverPeerConnection() {
    return this._receiverPeerConnection;
  }

  setReceiverPeerConnection(newReceiverPeerConnection) {
    this._receiverPeerConnection = newReceiverPeerConnection;
  }

  getSenderPeerConnection(socketId) {
    return this._senderPeerConnectionMap.get(socketId);
  }

  setSenderPeerConnection(socketId, newSenderPeerConnection) {
    this._senderPeerConnectionMap.set(socketId, newSenderPeerConnection);
  }

  removeSenderPeerConnection(socketId) {
    return this._senderPeerConnectionMap.delete(socketId);
  }

  removeAllSenderPeerConnection() {
    return this._senderPeerConnectionMap.clear();
  }
}

module.exports = Character;
