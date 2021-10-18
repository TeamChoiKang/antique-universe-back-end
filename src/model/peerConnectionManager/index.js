class PeerConnectionManager {
  constructor() {
    this._stream = undefined;
    this._receiverPeerConnection = undefined;
    this._senderPeerConnectionMap = new Map();
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

  closeReceiverPeerConnection() {
    if (!this._receiverPeerConnection) return;
    this._receiverPeerConnection.close();
  }

  getSenderPeerConnection(socketId) {
    return this._senderPeerConnectionMap.get(socketId);
  }

  setSenderPeerConnection(socketId, newSenderPeerConnection) {
    this._senderPeerConnectionMap.set(socketId, newSenderPeerConnection);
  }

  closeAllSenderPeerConnection() {
    this._senderPeerConnectionMap.forEach(senderConnection => senderConnection.close());
    return this._senderPeerConnectionMap.clear();
  }
}

module.exports = PeerConnectionManager;
