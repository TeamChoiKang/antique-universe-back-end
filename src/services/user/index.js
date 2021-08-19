const UserQuery = require('@/queries/user');
const db = require('@/db');
const User = require('@/model/user');
const HttpError = require('@/model/error/HttpError');
const { HTTP_STATUS_CODE_UNAUTHORIZED, HTTP_UNAUTHORIZED_MESSAGE } = require('@/constants');

exports.getUser = async userId => {
  const [row] = await db.query(UserQuery.findUserById, [userId]);
  if (!row[0]) {
    throw new HttpError(HTTP_STATUS_CODE_UNAUTHORIZED, HTTP_UNAUTHORIZED_MESSAGE);
  }
  const user = new User(...row[0]);
  return user;
};

exports.registerUser = async user => {
  const { userId, name, nickname, phone, age } = user.toObject();
  await db.query(UserQuery.insertUser, [userId, name, nickname, phone, age]);
  return new User(userId, name, nickname, phone, age);
};
