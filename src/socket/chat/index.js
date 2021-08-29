module.exports = socket => {
  socket.on('chat:createNewChat', newChat => {
    socket.broadcast.emit('chat:getNewChat', newChat);
  });
};
