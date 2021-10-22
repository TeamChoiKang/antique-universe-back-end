const Scene = require('@/model/scene');
const PeerConnectionManager = require('@/model/peerConnectionManager');
const StuffManager = require('@/model/stuffManager');

class ShopScene extends Scene {
  constructor(shopSceneName) {
    super(shopSceneName);
    this._ownerSocketId = '';
    this._description = '';
    this._peerConnectionManager = new PeerConnectionManager();
    this._stuffManager = new StuffManager();
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

  getDescription() {
    return this._description;
  }

  setDescription(newDescription) {
    this._description = newDescription;
  }

  removeOwner() {
    this._ownerSocketId = '';
  }

  getPeerConnectionManager() {
    return this._peerConnectionManager;
  }

  getStuffManager() {
    return this._stuffManager;
  }
}

module.exports = ShopScene;
