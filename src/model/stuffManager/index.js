const Stuff = require('@/model/stuff');

class StuffManager {
  constructor() {
    this._stuffMap = new Map();
    this._stuffId = 0;
  }

  appendStuff(name, price = 0, description, imageUrl = '', soldState = false, onlyAdult = false) {
    const newStuff = new Stuff(
      this._stuffId,
      name,
      price,
      description,
      imageUrl,
      soldState,
      onlyAdult,
    );

    this._stuffMap.set(newStuff.getStuffId(), newStuff);
    this._stuffId++;

    return newStuff;
  }

  getStuff(stuffId) {
    if (!this._stuffMap.has(stuffId)) return false;
    return this._stuffMap.get(stuffId);
  }

  updateStuff(stuffId, name, price, description, imageUrl, soldState, onlyAdult) {
    if (!this._stuffMap.has(stuffId)) return false;
    const targetStuff = this._stuffMap.get(stuffId);
    if (name) targetStuff.setName(name);
    if (price) targetStuff.setPrice(price);
    if (description) targetStuff.setDescription(description);
    if (imageUrl) targetStuff.setImageUrl(imageUrl);
    if (soldState) targetStuff.setSoldState(soldState);
    if (onlyAdult) targetStuff.setOnlyAdult(onlyAdult);
    return targetStuff;
  }

  removeStuff(stuffId) {
    if (!this._stuffMap.has(stuffId)) return false;
    return this._stuffMap.delete(stuffId);
  }
}

module.exports = StuffManager;
