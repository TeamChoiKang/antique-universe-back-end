const cors = require('@/package/cors');

module.exports = app => {
  app.use(cors());
};
