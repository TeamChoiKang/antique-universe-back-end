const webServer = require('@/package/webServer');

module.exports = app => {
  app.use(webServer.json());
};
