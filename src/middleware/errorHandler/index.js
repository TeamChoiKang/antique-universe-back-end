const {
  HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR,
  HTTP_INTERNAL_SERVER_ERROR_MESSAGE,
} = require('@/constants');

function errorHandler(error, request, response, next) {
  console.log(error);
  response.status(HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR);
  response.json({ message: HTTP_INTERNAL_SERVER_ERROR_MESSAGE });
}

module.exports = app => {
  app.use(errorHandler);
};
