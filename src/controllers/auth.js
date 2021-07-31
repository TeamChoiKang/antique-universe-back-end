const AuthService = require('@/services/auth');

exports.signin = async (request, response) => {
  try {
    const oAuthToken = request.headers.authorization;
    const { vendor } = request.query;
    if (!oAuthToken || !vendor) {
      throw new Error('no oAuthToken or vendor');
    }
    const id = await AuthService.validateOAuthToken(vendor, oAuthToken);
    response.json({ id });
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
};
