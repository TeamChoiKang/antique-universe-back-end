module.exports = (io, socket, character) => {
  socket.on(
    'shopStuff:appendStuff',
    ({ name, price, description, imageUrl, soldState, onlyAdult }) => {
      const stuffManager = character.getCurrentScene().getStuffManager();
      socket.emit(
        'shopStuff:appendStuff',
        stuffManager.appendStuff(name, price, description, imageUrl, soldState, onlyAdult),
      );
    },
  );

  socket.on('shopStuff:getStuffs', () => {
    const stuffManager = character.getCurrentScene().getStuffManager();
    socket.emit('shopStuff:getStuffs', stuffManager.getAllStuffs());
  });

  socket.on(
    'shopStuff:updateStuff',
    ({ stuffId, name, price, description, imageUrl, soldState, onlyAdult }) => {
      const stuffManager = character.getCurrentScene().getStuffManager();
      socket.emit(
        'shopStuff:updateStuff',
        stuffManager.updateStuff(stuffId, name, price, description, imageUrl, soldState, onlyAdult),
      );
    },
  );

  socket.on('shopStuff:removeStuff', stuffId => {
    const stuffManager = character.getCurrentScene().getStuffManager();
    socket.emit('shopStuff:removeStuff', stuffManager.removeStuff(stuffId));
  });
};
