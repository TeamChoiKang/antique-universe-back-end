class EventManager {
  constructor(io, socket, character) {
    this._io = io;
    this._socket = socket;
    this._character = character;
  }

  registerEventHandler(eventHandler, ...args) {
    eventHandler(this._io, this._socket, this._character, ...args);
  }
}

module.exports = EventManager;
