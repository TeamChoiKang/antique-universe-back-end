const { HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR } = require('@/constants');

function errorHandler(error, request, response) {
  console.log(error);
  response.status(HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR);
  response.send({ error });
}

module.exports = app => {
  app.use(errorHandler);
};
