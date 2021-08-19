const { HTTP_STATUS_CODE_UNAUTHORIZED, HTTP_UNAUTHORIZED_MESSAGE } = require('@/constants');
const HttpError = require('@/model/error/HttpError');
const jwt = require('@/package/jwt');
const { KAKAO_VENDOR } = require('./constants');
const KakaoOAuth = require('./KaKaoOAuth');
const OAuth = require('./OAuth');

exports.validateOAuthToken = async (vendor, oAuthToken) => {
  try {
    const oAuth = oAuthFactory(vendor);
    const userId = await oAuth.validateOAuthToken(oAuthToken);
    return userId;
  } catch {
    throw new HttpError(HTTP_STATUS_CODE_UNAUTHORIZED, HTTP_UNAUTHORIZED_MESSAGE);
  }
};

exports.validateToken = async token => {
  try {
    const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    return user;
  } catch {
    throw new HttpError(HTTP_STATUS_CODE_UNAUTHORIZED, HTTP_UNAUTHORIZED_MESSAGE);
  }
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
