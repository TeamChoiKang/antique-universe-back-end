module.exports = server => {
  const io = require('socket.io')(server, { cors: { origin: '*' } });

  const Scene = require('@/model/scene');
  const SceneGroup = require('@/model/sceneGroup');
  const Character = require('@/model/character');
  const sceneKeys = require('@/model/scene/sceneKeys');

  const registerSceneHandler = require('@/socket/scene');
  const registerCharacterHandler = require('@/socket/character');
  const registerChatHandler = require('@/socket/chat');

  const sceneGroup = new SceneGroup();
  sceneGroup.appendScene(new Scene(sceneKeys.VILLAGE_SCENE_KEY));
  sceneGroup.appendScene(new Scene(sceneKeys.SHOP_SCENE_KEY));

  const connectionHandler = socket => {
    const myCharacter = new Character(0, 0, socket.id);

    registerSceneHandler(socket, sceneGroup, myCharacter);
    registerCharacterHandler(socket, myCharacter);
    registerChatHandler(socket);

    socket.on('disconnect', () => {
      const scene = myCharacter.getCurrentScene();
      scene.removeCharacter(myCharacter);
      socket.to(scene.getName()).emit('character:disconnection', socket.id);
    });
  };

  io.on('connection', connectionHandler);
};
