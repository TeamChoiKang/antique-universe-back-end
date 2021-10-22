module.exports = server => {
  const io = require('socket.io')(server, { cors: { origin: '*' } });

  const CharacterFactory = require('@/model/characterFactory');
  const EventManager = require('@/model/eventManager');
  const SceneFactory = require('@/model/sceneFactory');
  const SceneGroup = require('@/model/sceneGroup');

  const sceneEventHandler = require('@/socket/scene');
  const characterEventHandler = require('@/socket/character');
  const chatEventHandler = require('@/socket/chat');
  const webRtcEventHandler = require('@/socket/webRtc');
  const webRtcVideoEventHandler = require('@/socket/webRtcVideo');
  const shopStuffEventHandler = require('@/socket/shopStuff');
  const shopInfoEventHandler = require('@/socket/shopInfo');

  const sceneGroup = new SceneGroup();
  sceneGroup.appendScene(SceneFactory.getVillageScene());
  sceneGroup.appendScene(SceneFactory.getShopScene('shop1'));
  sceneGroup.appendScene(SceneFactory.getShopScene('shop2'));
  sceneGroup.appendScene(SceneFactory.getShopScene('shop2'));
  sceneGroup.appendScene(SceneFactory.getShopScene('shop3'));
  sceneGroup.appendScene(SceneFactory.getShopScene('shop4'));
  sceneGroup.appendScene(SceneFactory.getShopScene('shop5'));
  sceneGroup.appendScene(SceneFactory.getShopScene('shop6'));
  sceneGroup.appendScene(SceneFactory.getShopScene('shop7'));
  sceneGroup.appendScene(SceneFactory.getShopScene('shop8'));
  sceneGroup.appendScene(SceneFactory.getShopScene('shop9'));
  sceneGroup.appendScene(SceneFactory.getShopScene('shop10'));
  sceneGroup.appendScene(SceneFactory.getShopScene('shop11'));
  sceneGroup.appendScene(SceneFactory.getShopScene('shop12'));
  sceneGroup.appendScene(SceneFactory.getShopScene('shop13'));
  sceneGroup.appendScene(SceneFactory.getShopScene('shop14'));

  const disconnectHandler = (io, socket, character) => {
    socket.on('disconnect', () => {
      const scene = character.getCurrentScene();
      const peerConnectionManager = character.getPeerConnectionManager();
      peerConnectionManager.closeReceiverPeerConnection();
      peerConnectionManager.closeAllSenderPeerConnection();
      scene.removeCharacter(character);

      if (scene.getOwner) {
        const shopPeerConnectionManager = scene.getPeerConnectionManager();
        if (scene.getOwner() === socket.id) {
          shopPeerConnectionManager.removeReceiverPeerConnection();
        } else {
          shopPeerConnectionManager.removeSenderPeerConnection(socket.id);
        }
      }

      socket.to(scene.getName()).emit('character:disconnection', socket.id);
    });
  };

  const connectionHandler = socket => {
    const myCharacter = CharacterFactory.getMyCharacter(socket);
    const eventManager = new EventManager(io, socket, myCharacter);

    eventManager.registerEventHandler(sceneEventHandler, sceneGroup);
    eventManager.registerEventHandler(characterEventHandler);
    eventManager.registerEventHandler(chatEventHandler);
    eventManager.registerEventHandler(webRtcEventHandler);
    eventManager.registerEventHandler(webRtcVideoEventHandler);
    eventManager.registerEventHandler(shopStuffEventHandler);
    eventManager.registerEventHandler(shopInfoEventHandler);
    eventManager.registerEventHandler(disconnectHandler);
  };

  io.on('connection', connectionHandler);
};
