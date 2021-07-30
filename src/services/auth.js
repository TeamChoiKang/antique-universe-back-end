const { KAKAO_VENDOR } = require('@/constants');
const KakaoOAuthStrategy = require('./KakaoOAuthStrategy');
const OAuthStrategy = require('./OAuthStrategy');

exports.validateToken = async (vendor, token) => {
  const oAuthStrategy = getOauthStrategy(vendor);
  const id = await oAuthStrategy.validateToken(token);
  return id;
};

const getOauthStrategy = vendor => {
  switch (vendor) {
    case KAKAO_VENDOR:
      return new KakaoOAuthStrategy();
    default:
      return new OAuthStrategy();
  }
};
