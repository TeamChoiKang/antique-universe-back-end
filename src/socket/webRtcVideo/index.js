const CONFIG = {
  iceServers: [
    {
      urls: 'turn:turn.antique-universe.asuscomm.com:5349?transport=udp',
      credential: 'jin!@12young',
      username: 'user1',
    },
    {
      urls: 'turn:turn.antique-universe.asuscomm.com:5349?transport=tcp',
      credential: 'jin!@12young',
      username: 'user1',
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
