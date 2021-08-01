const { KAKAO_VENDOR } = require('@/constants');
const KakaoOAuthStrategy = require('./KakaoOAuthStrategy');
const OAuthStrategy = require('./OAuthStrategy');

exports.validateOAuthToken = async (vendor, oAuthToken) => {
  const oAuthStrategy = getOauthStrategy(vendor);
  const id = await oAuthStrategy.validateOAuthToken(oAuthToken);
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
