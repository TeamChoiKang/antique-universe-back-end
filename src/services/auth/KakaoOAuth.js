const AuthClient = require('@/api/auth');
const { KAKAO_OAUTH_URI } = require('./constants');
const OAuth = require('./OAuth');

class KakaoOAuth extends OAuth {
  async validateOAuthToken(oAuthToken) {
    const userId = await AuthClient.validationOAuthToken(KAKAO_OAUTH_URI, oAuthToken);
    return userId;
  }
}

module.exports = KakaoOAuth;
