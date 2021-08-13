class SceneGroup {
  constructor() {
    this._sceneGroup = {};
  }

  appendScene(newScene) {
    this._sceneGroup[newScene.getName()] = newScene;

    return this;
  }

  findSceneByName(sceneName) {
    return this._sceneGroup[sceneName];
  }

  removeSceneByName(sceneName) {
    return delete this._sceneGroup[sceneName];
  }
}

module.exports = SceneGroup;
