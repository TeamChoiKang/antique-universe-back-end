const AuthService = require('@/services/auth');
const UserService = require('@/services/user');

exports.signin = async (request, response) => {
  try {
    const oAuthToken = request.headers.authorization;
    const { vendor } = request.query;
    if (!oAuthToken || !vendor) {
      throw new Error('no oAuthToken or vendor');
    }

    const userId = await AuthService.validateOAuthToken(vendor, oAuthToken);
    const user = await UserService.getUser(userId);
    response.json(user);
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
};
