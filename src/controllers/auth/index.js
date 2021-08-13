const { HTTP_STATUS_CODE_UNAUTHORIZED, HTTP_UNAUTHORIZED_MESSAGE } = require('@/constants');
const AuthService = require('@/services/auth');
const UserService = require('@/services/user');

exports.signin = async (request, response) => {
  try {
    const { vendor, oAuthToken } = request.body;

    const userId = await AuthService.validateOAuthToken(vendor, oAuthToken);
    const user = await UserService.getUser(userId);
    const token = AuthService.generateToken(user);
    response.json({ token });
  } catch (error) {
    console.log(error);
    response.status(HTTP_STATUS_CODE_UNAUTHORIZED).json({ message: HTTP_UNAUTHORIZED_MESSAGE });
  }
};

exports.signup = async (request, response) => {
  try {
    const { vendor, oAuthToken, signupInfo } = request.body;

    const userId = await AuthService.validateOAuthToken(vendor, oAuthToken);
    const user = await UserService.registerUser({ userId, ...signupInfo });
    const token = AuthService.generateToken(user);
    response.json({ token });
  } catch (error) {
    return error;
  }
};

exports.validateToken = async (request, response) => {
  try {
    const token = request.headers.authorization.substring(7);
    const user = await AuthService.validateToken(token);
    response.json(user);
  } catch (error) {
    console.log(error);
    response.status(HTTP_STATUS_CODE_UNAUTHORIZED).json({ message: HTTP_UNAUTHORIZED_MESSAGE });
  }
};
