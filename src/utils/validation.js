const { HTTP_STATUS_CODE_BAD_REQUEST } = require('@/constants');
const HttpError = require('@/model/error/HttpError');

exports.validateRequiredParams = params => {
  const valid = Object.keys(params).every(key => !!params[key]);

  if (!valid) {
    const statusCode = HTTP_STATUS_CODE_BAD_REQUEST;
    const statusText = 'no required params';
    throw new HttpError(statusCode, statusText);
  }
};

exports.validateHttpResponse = response => {
  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
};
