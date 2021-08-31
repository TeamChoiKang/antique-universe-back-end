module.exports = server => {
  const io = require('socket.io')(server, { cors: { origin: '*' } });

  const CharacterFactory = require('@/model/characterFactory');
  const EventManager = require('@/model/eventManager');
  const SceneFactory = require('@/model/sceneFactory');
  const SceneGroup = require('@/model/sceneGroup');

  const sceneGroup = new SceneGroup();
  sceneGroup.appendScene(SceneFactory.getVillageScene());
  sceneGroup.appendScene(SceneFactory.getShopScene());

  const connectionHandler = socket => {
    const myCharacter = CharacterFactory.getMyCharacter(socket);
    const eventManager = new EventManager(socket, myCharacter);

    eventManager.registerSceneEventListner(sceneGroup);
    eventManager.registerChracterEventListner();
    eventManager.registerChatEventListners();
    eventManager.registerDisconnectEventListner();
  };

  io.on('connection', connectionHandler);
};
