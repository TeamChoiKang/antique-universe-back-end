module.exports = app => {
  const auth = require('@/routes/auth');
  app.use('/api/', auth);
};
