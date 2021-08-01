const { HTTP_STATUS_CODE_BAD_REQUEST } = require('@/constants');
const HttpError = require('@/model/error/HttpError');

class OAuthStrategy {
  validateOAuthToken() {
    const statusCode = HTTP_STATUS_CODE_BAD_REQUEST;
    const statusText = 'no match oauth service';
    return new HttpError(statusCode, statusText);
  }
}

module.exports = OAuthStrategy;
