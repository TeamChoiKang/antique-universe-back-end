const { validationOAuthToken } = require('@/api/auth');
const { KAKAO_OAUTH_URI } = require('@/constants');
const OAuthStrategy = require('./OAuthStrategy');

class KakaoOAuthStrategy extends OAuthStrategy {
  async validateOAuthToken(token) {
    const id = await validationOAuthToken(KAKAO_OAUTH_URI, token);
    return id;
  }
}

module.exports = KakaoOAuthStrategy;
