const Scene = require('@/model/scene');
const ShopScene = require('@/model/scene/ShopScene');
const sceneKeys = require('@/model/scene/sceneKeys');

class SceneFactory {
  static getVillageScene() {
    return new Scene(sceneKeys.VILLAGE_SCENE_KEY);
  }

  static getShopScene() {
    return new ShopScene(sceneKeys.SHOP_SCENE_KEY);
  }
}

module.exports = SceneFactory;
