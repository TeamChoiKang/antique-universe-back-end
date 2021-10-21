class Stuff {
  constructor(stuffId, name, price, description, imageUrl, soldState, onlyAdult) {
    this._stuffId = stuffId;
    this._name = name;
    this._price = price;
    this._description = description;
    this._imageUrl = imageUrl;
    this._soldState = soldState;
    this._onlyAdult = onlyAdult;
  }

  getStuffId() {
    return this._stuffId;
  }

  getName() {
    return this._name;
  }

  setName(newName) {
    this._name = newName;
  }

  getPrice() {
    return this._price;
  }

  setPrice(newPrice) {
    this._price = newPrice;
  }

  getDescription() {
    return this._Description;
  }

  setDescription(newDescription) {
    this._description = newDescription;
  }

  getImageUrl() {
    return this._imageUrl;
  }

  setImageUrl(newImageUrl) {
    this._imageUrl = newImageUrl;
  }

  getSoldState() {
    return this._soldState;
  }

  setSoldState(newSoldState) {
    this._soldState = newSoldState;
  }

  getOnlyAdult() {
    return this._onlyAdult;
  }

  setOnlyAdult(newOnlyAdult) {
    this._onlyAdult = newOnlyAdult;
  }
}

module.exports = Stuff;
