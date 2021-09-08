class EventManager {
  constructor(socket, character) {
    this._socket = socket;
    this._character = character;
  }

  registerEventHandler(eventHandler, ...args) {
    eventHandler(this._socket, this._character, ...args);
  }
}

module.exports = EventManager;
