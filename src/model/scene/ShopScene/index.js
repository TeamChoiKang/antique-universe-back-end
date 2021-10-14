const Scene = require('@/model/scene');

class ShopScene extends Scene {
  constructor(shopSceneName) {
    super(shopSceneName);
    this._ownerSocketId = '';
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
}

module.exports = ShopScene;
