const CONFIG = {
  iceServers: [
    {
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
};

module.exports = (io, socket, character) => {
  const wrtc = require('wrtc');

  socket.on('webRtcAudio:senderOffer', async offer => {
    const receiverPeerConnection = new wrtc.RTCPeerConnection(CONFIG);

    character.setReceiverPeerConnection(receiverPeerConnection);

    receiverPeerConnection.onicecandidate = ({ candidate }) => {
      if (!candidate) return;
      socket.emit('webRtcAudio:senderIceCandidate', candidate);
    };

    receiverPeerConnection.ontrack = ({ streams }) => {
      character.setStream(streams[0]);
    };

    await receiverPeerConnection.setRemoteDescription(offer);
    const answer = await receiverPeerConnection.createAnswer({
      offerToReceiveAudio: true,
    });
    await receiverPeerConnection.setLocalDescription(answer);

    socket.emit('webRtcAudio:senderAnswer', answer);

    socket
      .to(character.getCurrentScene().getName())
      .emit('webRtcAudio:newSender', character.getSocketId());

    socket.emit(
      'webRtcAudio:currentSender',
      character
        .getCurrentScene()
        .getCharacterGroupSocketIdList()
        .filter(socketId => socketId !== character.getSocketId()),
    );
  });

  socket.on('webRtcAudio:senderIceCandidate', candidate => {
    character.getReceiverPeerConnection().addIceCandidate(candidate);
  });

  socket.on('webRtcAudio:receiverOffer', async ({ offer, socketId }) => {
    const senderPeerConnection = new wrtc.RTCPeerConnection(CONFIG);

    character.setSenderPeerConnection(socketId, senderPeerConnection);

    senderPeerConnection.onicecandidate = ({ candidate }) => {
      if (!candidate) return;
      socket.emit('webRtcAudio:receiverIceCandidate', { candidate, socketId });
    };

    const targetCharacter = character
      .getCurrentScene()
      .getCharacterGroup()
      .findCharacterBySocketId(socketId);

    targetCharacter
      .getStream()
      .getTracks()
      .forEach(track => {
        senderPeerConnection.addTrack(track, targetCharacter.getStream());
      });

    await senderPeerConnection.setRemoteDescription(offer);
    const answer = await senderPeerConnection.createAnswer({
      offerToReceiveAudio: false,
    });
    await senderPeerConnection.setLocalDescription(answer);

    socket.emit('webRtcAudio:receiverAnswer', { answer, socketId });
  });

  socket.on('webRtcAudio:receiverIceCandidate', async ({ candidate, socketId }) => {
    await character.getSenderPeerConnection(socketId).addIceCandidate(candidate);
  });
};
