module.exports = (io, socket, character) => {
  const wrtc = require('wrtc');

  socket.on('webRtcAudio:senderOffer', async offer => {
    const receiverPeerConnection = new wrtc.RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    receiverPeerConnection.onicecandidate = ({ candidate }) => {
      if (!candidate) return;
      socket.emit('webRtcAudio:senderIceCandidate', candidate);
    };

    receiverPeerConnection.ontrack = ({ streams }) => {
      character.setStream(streams[0]);
      socket.emit('webRtcAudio:connectionCreated', 'testtesttest');
    };

    await receiverPeerConnection.setRemoteDescription(offer);
    const answer = await receiverPeerConnection.createAnswer();
    await receiverPeerConnection.setLocalDescription(answer);

    socket.emit('webRtcAudio:senderAnswer', answer);
  });

  socket.on('webRtcAudio:receiverOffer', async offer => {
    const senderPeerConnection = new wrtc.RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    senderPeerConnection.onicecandidate = ({ candidate }) => {
      if (!candidate) return;
      socket.emit('webRtcAudio:receiverIceCandidate', candidate);
    };

    character
      .getStream()
      .getTracks()
      .forEach(track => {
        senderPeerConnection.addTrack(track, character.getStream());
      });

    await senderPeerConnection.setRemoteDescription(offer);
    const sernderOffer = await senderPeerConnection.createAnswer();
    await senderPeerConnection.setLocalDescription(sernderOffer);

    socket.emit('webRtcAudio:receiverAnswer', sernderOffer);
  });
};
