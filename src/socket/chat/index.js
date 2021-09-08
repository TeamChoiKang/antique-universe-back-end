module.exports = (socket, character) => {
  socket.on('chat:createNewChat', newChat => {
    socket.to(character.getCurrentScene().getName()).emit('chat:getNewChat', newChat);
  });
};
