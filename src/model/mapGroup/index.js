class MapGroup {
  constructor() {
    this._mapGroup = {};
  }

  appendMap(newMap) {
    this._mapGroup[newMap.getName()] = newMap;

    return this;
  }

  findMapByName(mapName) {
    return this._mapGroup[mapName];
  }

  removeMapByName(mapName) {
    return delete this._mapGroup[mapName];
  }
}

module.exports = MapGroup;
