const AuthService = require('@/services/auth');

exports.signin = async (request, response) => {
  try {
    const token = request.headers.authorization;
    const { vendor } = request.query;
    const id = await AuthService.validateToken(vendor, token);
    response.json({ id });
  } catch (err) {
    response.status(500).json(err);
  }
};
