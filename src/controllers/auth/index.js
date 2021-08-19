const {
  HTTP_INTERNAL_SERVER_ERROR_MESSAGE,
  HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR,
} = require('@/constants');
const HttpError = require('@/model/error/HttpError');
const User = require('@/model/user');
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
    if (error instanceof HttpError) {
      return response.status(error.getStatusCode()).json({ message: error.getStatusText() });
    }
    console.log(error);
    return response
      .status(HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR)
      .json({ message: HTTP_INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

exports.signup = async (request, response) => {
  try {
    const { vendor, oAuthToken, signUpInfo } = request.body;
    const { name, nickname, phone, age } = signUpInfo;

    const userId = await AuthService.validateOAuthToken(vendor, oAuthToken);
    const user = await UserService.registerUser(new User(userId, name, nickname, phone, age));
    const token = AuthService.generateToken(user);
    response.json({ token });
  } catch (error) {
    if (error instanceof HttpError) {
      return response.status(error.getStatusCode()).json({ message: error.getStatusText() });
    }
    console.log(error);
    return response
      .status(HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR)
      .json({ message: HTTP_INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

exports.validateToken = async (request, response) => {
  try {
    const token = request.headers.authorization.substring(7);
    const user = await AuthService.validateToken(token);
    response.json(user);
  } catch (error) {
    if (error instanceof HttpError) {
      return response.status(error.getStatusCode()).json({ message: error.getStatusText() });
    }
    console.log(error);
    return response
      .status(HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR)
      .json({ message: HTTP_INTERNAL_SERVER_ERROR_MESSAGE });
  }
};
