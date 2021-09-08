module.exports = (socket, character) => {
  socket.on('chat:createNewChat', newChat => {
    socket.broadcast.emit('chat:getNewChat', newChat);
  });
};
