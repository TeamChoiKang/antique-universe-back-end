const Stuff = require('@/model/stuff');

const DEFAULT_IMAGE_URL = `https://user-images.githubusercontent.com/22635168/138308985-bb3049dd-5620-4c32-864f-cdfe8323d27d.jpg`;

class StuffManager {
  constructor() {
    this._stuffMap = new Map();
    this._stuffId = 0;
  }

  appendStuff(
    name,
    price = 0,
    description,
    imageUrl = DEFAULT_IMAGE_URL,
    soldState = false,
    onlyAdult = false,
  ) {
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

  getAllStuffs() {
    const stuffList = [];
    this._stuffMap.forEach(stuff => stuffList.push(stuff.getStuffInfoObj()));
    return stuffList;
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
