const EventManager = require('@/model/eventManager');

module.exports = server => {
  const io = require('socket.io')(server, { cors: { origin: '*' } });

  const Scene = require('@/model/scene');
  const SceneGroup = require('@/model/sceneGroup');
  const Character = require('@/model/character');
  const sceneKeys = require('@/model/scene/sceneKeys');

  const sceneGroup = new SceneGroup();
  sceneGroup.appendScene(new Scene(sceneKeys.VILLAGE_SCENE_KEY));
  sceneGroup.appendScene(new Scene(sceneKeys.SHOP_SCENE_KEY));

  const connectionHandler = socket => {
    const eventManager = new EventManager(socket);
    const myCharacter = new Character(0, 0, socket.id);

    eventManager.registerSceneEventListner(sceneGroup, myCharacter);
    eventManager.registerChracterEventListner(myCharacter);
    eventManager.registerChatEventListners();
    eventManager.registerDisconnectEventListner(myCharacter);
  };

  io.on('connection', connectionHandler);
};
