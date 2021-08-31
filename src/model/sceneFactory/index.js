const Scene = require('@/model/scene');
const sceneKeys = require('@/model/scene/sceneKeys');

class SceneFactory {
  static getVillageScene() {
    return new Scene(sceneKeys.VILLAGE_SCENE_KEY);
  }

  static getShopScene() {
    return new Scene(sceneKeys.SHOP_SCENE_KEY);
  }
}

module.exports = SceneFactory;
