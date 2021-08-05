const jwt = require('@/package/jwt');
const { KAKAO_VENDOR } = require('@/constants');
const KakaoOAuth = require('./KaKaoOAuth');
const OAuth = require('./OAuth');

exports.validateOAuthToken = async (vendor, oAuthToken) => {
  const oAuth = oAuthFactory(vendor);
  const userId = await oAuth.validateOAuthToken(oAuthToken);
  return userId;
};

exports.generateToken = user => {
  const token = jwt.sign(user.toObject(), process.env.JWT_PRIVATE_KEY);
  return token;
};

const oAuthFactory = vendor => {
  switch (vendor) {
    case KAKAO_VENDOR:
      return new KakaoOAuth();
    default:
      return new OAuth();
  }
};
