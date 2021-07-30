const { validationToken } = require('@/api/auth');
const { KAKAO_OAUTH_URI } = require('@/constants');
const OAuthStrategy = require('./OAuthStrategy');

class KakaoOAuthStrategy extends OAuthStrategy {
  async validateToken(token) {
    const id = await validationToken(KAKAO_OAUTH_URI, token);
    return id;
  }
}

module.exports = KakaoOAuthStrategy;
