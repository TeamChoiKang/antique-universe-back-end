const AuthService = require('@/services/auth');
const UserService = require('@/services/user');
const { validateRequiredParams } = require('@/utils/validation');

exports.signin = async (request, response) => {
  try {
    const oAuthToken = request.headers.authorization;
    const { vendor } = request.query;
    validateRequiredParams({ oAuthToken, vendor });

    const userId = await AuthService.validateOAuthToken(vendor, oAuthToken);
    const user = await UserService.getUser(userId);
    response.json(user);
  } catch (err) {
    console.log(err);
    response.status(err.statusCode).json(err);
  }
};
