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

  removeReceiverPeerConnection() {
    this._receiverPeerConnection.close();
    this._receiverPeerConnection = undefined;
    this._stream = undefined;
  }

  getSenderPeerConnection(socketId = '') {
    if (socketId) return this._senderPeerConnectionMap.get(socketId);

    const sendPeerConnectionList = [];
    this._senderPeerConnectionMap.forEach(sendPeerConnection => {
      sendPeerConnectionList.push(sendPeerConnection);
    });

    return sendPeerConnectionList;
  }

  setSenderPeerConnection(socketId, newSenderPeerConnection) {
    this._senderPeerConnectionMap.set(socketId, newSenderPeerConnection);
  }

  removeSenderPeerConnection(socketId) {
    if (!this._senderPeerConnectionMap.has(socketId)) return;
    this._senderPeerConnectionMap.get(socketId).close();
    return this._senderPeerConnectionMap.delete(socketId);
  }

  closeAllSenderPeerConnection() {
    this._senderPeerConnectionMap.forEach(senderConnection => senderConnection.close());
    return this._senderPeerConnectionMap.clear();
  }
}

module.exports = PeerConnectionManager;
