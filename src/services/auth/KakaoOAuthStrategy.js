const { validationOAuthToken } = require('@/api/auth');
const { KAKAO_OAUTH_URI } = require('@/constants');
const OAuthStrategy = require('./OAuthStrategy');

class KakaoOAuthStrategy extends OAuthStrategy {
  async validateOAuthToken(oAuthToken) {
    const id = await validationOAuthToken(KAKAO_OAUTH_URI, oAuthToken);
    return id;
  }
}

module.exports = KakaoOAuthStrategy;
