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

  socket.on('webRtcVideo:senderExist', () => {
    const peerConnectionManager = character.getCurrentScene().getPeerConnectionManager();

    if (peerConnectionManager.getReceiverPeerConnection()) socket.emit('webRtcVideo:senderExist');
  });

  socket.on('webRtcVideo:senderOffer', async offer => {
    const receiverPeerConnection = new wrtc.RTCPeerConnection(CONFIG);
    const peerConnectionManager = character.getCurrentScene().getPeerConnectionManager();
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
      offerToReceiveVideo: true,
    });

    await receiverPeerConnection.setLocalDescription(answer);

    socket.emit('webRtcVideo:senderAnswer', answer);

    socket.to(character.getCurrentScene().getName()).emit('webRtcVideo:senderExist');
  });

  socket.on('webRtcVideo:senderIceCandidate', candidate => {
    const peerConnectionManager = character.getCurrentScene().getPeerConnectionManager();
    peerConnectionManager.getReceiverPeerConnection().addIceCandidate(candidate);
  });

  socket.on('webRtcVideo:receiverOffer', async offer => {
    const senderPeerConnection = new wrtc.RTCPeerConnection(CONFIG);
    const peerConnectionManager = character.getCurrentScene().getPeerConnectionManager();
    peerConnectionManager.setSenderPeerConnection(socket.id, senderPeerConnection);

    senderPeerConnection.onicecandidate = ({ candidate }) => {
      if (!candidate) return;
      socket.emit('webRtcVideo:receiverIceCandidate', candidate);
    };

    const shopOwnerStream = peerConnectionManager.getStream();

    if (shopOwnerStream) {
      shopOwnerStream.getTracks().forEach(track => {
        senderPeerConnection.addTrack(track, peerConnectionManager.getStream());
      });
    }

    await senderPeerConnection.setRemoteDescription(offer);

    const answer = await senderPeerConnection.createAnswer({
      offerToReceiveVideo: false,
    });

    await senderPeerConnection.setLocalDescription(answer);

    socket.emit('webRtcVideo:receiverAnswer', answer);
  });

  socket.on('webRtcVideo:receiverIceCandidate', candidate => {
    const peerConnectionManager = character.getCurrentScene().getPeerConnectionManager();
    peerConnectionManager.getSenderPeerConnection(socket.id).addIceCandidate(candidate);
  });
};
