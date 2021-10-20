const Scene = require('@/model/scene');
const PeerConnectionManager = require('@/model/peerConnectionManager');

class ShopScene extends Scene {
  constructor(shopSceneName) {
    super(shopSceneName);
    this._ownerSocketId = '';
    this._peerConnectionManager = new PeerConnectionManager();
  }

  hasOwner() {
    if (this._ownerSocketId) return false;
    return true;
  }

  getOwner() {
    return this._ownerSocketId;
  }

  setOwner(newOwnerSocketId) {
    this._ownerSocketId = newOwnerSocketId;
    return this._ownerSocketId;
  }

  removeOwner() {
    this._ownerSocketId = '';
  }

  getPeerConnectionManager() {
    return this._peerConnectionManager;
  }
}

module.exports = ShopScene;
