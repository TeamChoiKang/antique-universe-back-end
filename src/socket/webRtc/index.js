const CONFIG = {
  iceServers: [
    {
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun3.l.google.com:19302',
        'stun:stun4.l.google.com:19302',
        'stun:stun.ekiga.net',
        'stun:stun.ideasip.com',
        'stun:stun.rixtelecom.se',
        'stun:stun.schlund.de',
        'stun:stun.stunprotocol.org:3478',
        'stun:stun.voiparound.com',
        'stun:stun.voipbuster.com',
        'stun:stun.voipstunt.com',
        'stun:stun.voxgratia.org',
      ],
    },
  ],
};

module.exports = (io, socket, character) => {
  const wrtc = require('wrtc');

  socket.on('webRtc:senderOffer', async offer => {
    const receiverPeerConnection = new wrtc.RTCPeerConnection(CONFIG);
    const peerConnectionManager = character.getPeerConnectionManager();
    peerConnectionManager.setReceiverPeerConnection(receiverPeerConnection);

    receiverPeerConnection.onicecandidate = ({ candidate }) => {
      if (!candidate) return;
      socket.emit('webRtc:senderIceCandidate', candidate);
    };

    receiverPeerConnection.ontrack = ({ streams }) => {
      peerConnectionManager.setStream(streams[0]);
    };

    await receiverPeerConnection.setRemoteDescription(offer);
    const answer = await receiverPeerConnection.createAnswer({
      offerToReceiveAudio: true,
    });
    await receiverPeerConnection.setLocalDescription(answer);

    socket.emit('webRtc:senderAnswer', answer);

    socket
      .to(character.getCurrentScene().getName())
      .emit('webRtc:newSender', character.getSocketId());

    socket.emit(
      'webRtc:currentSender',
      character
        .getCurrentScene()
        .getCharacterGroupSocketIdList()
        .filter(socketId => socketId !== character.getSocketId()),
    );
  });

  socket.on('webRtc:senderIceCandidate', candidate => {
    const peerConnectionManager = character.getPeerConnectionManager();
    peerConnectionManager.getReceiverPeerConnection().addIceCandidate(candidate);
  });

  socket.on('webRtc:receiverOffer', async ({ offer, socketId }) => {
    const senderPeerConnection = new wrtc.RTCPeerConnection(CONFIG);
    const peerConnectionManager = character.getPeerConnectionManager();
    peerConnectionManager.setSenderPeerConnection(socketId, senderPeerConnection);

    senderPeerConnection.onicecandidate = ({ candidate }) => {
      if (!candidate) return;
      socket.emit('webRtc:receiverIceCandidate', { candidate, socketId });
    };

    const targetCharacterPeerConnectionManager = character
      .getCurrentScene()
      .getCharacterGroup()
      .findCharacterBySocketId(socketId)
      .getPeerConnectionManager();

    targetCharacterPeerConnectionManager
      .getStream()
      .getTracks()
      .forEach(track => {
        senderPeerConnection.addTrack(track, targetCharacterPeerConnectionManager.getStream());
      });

    await senderPeerConnection.setRemoteDescription(offer);
    const answer = await senderPeerConnection.createAnswer({
      offerToReceiveAudio: false,
    });
    await senderPeerConnection.setLocalDescription(answer);

    socket.emit('webRtc:receiverAnswer', { answer, socketId });
  });

  socket.on('webRtc:receiverIceCandidate', ({ candidate, socketId }) => {
    const peerConnectionManager = character.getPeerConnectionManager();
    peerConnectionManager.getSenderPeerConnection(socketId).addIceCandidate(candidate);
  });
};
