const { HTTP_STATUS_CODE_UNAUTHORIZED, HTTP_UNAUTHORIZED_MESSAGE } = require('@/constants');
const AuthService = require('@/services/auth');
const UserService = require('@/services/user');

exports.signin = async (request, response) => {
  try {
    const oAuthToken = request.headers.authorization;
    const { vendor } = request.query;

    const userId = await AuthService.validateOAuthToken(vendor, oAuthToken);
    const user = await UserService.getUser(userId);
    const token = AuthService.generateToken(user);
    response.json({ token });
  } catch (error) {
    console.log(error);
    response.status(HTTP_STATUS_CODE_UNAUTHORIZED).json({ message: HTTP_UNAUTHORIZED_MESSAGE });
  }
};
