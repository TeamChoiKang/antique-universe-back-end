const Scene = require('@/model/scene');
const ShopScene = require('@/model/scene/ShopScene');
const sceneKeys = require('@/model/scene/sceneKeys');

class SceneFactory {
  static getVillageScene() {
    return new Scene(sceneKeys.VILLAGE_SCENE_KEY);
  }

  static getShopScene(shopName) {
    return new ShopScene(shopName);
  }
}

module.exports = SceneFactory;
