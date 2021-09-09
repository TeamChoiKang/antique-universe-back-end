module.exports = (io, socket, character) => {
  socket.on('chat:createNewChat', newChat => {
    io.in(character.getCurrentScene().getName()).emit('chat:getNewChat', {
      author: socket.handshake.query.nickname,
      message: newChat,
    });
  });
};
