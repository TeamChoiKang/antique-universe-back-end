module.exports = (io, socket, character) => {
  socket.on('shopInfo:getDescription', () => {
    const currentScene = character.getCurrentScene();
    socket.emit('shopInfo:getDescription', currentScene.getDescription());
  });

  socket.on('shopInfo:setDescription', description => {
    const currentScene = character.getCurrentScene();
    currentScene.setDescription(description);
  });
};
