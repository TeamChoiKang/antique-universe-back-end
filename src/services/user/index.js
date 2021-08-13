const UserQuery = require('@/queries/user');
const db = require('@/db');
const User = require('@/model/user');

exports.getUser = async userId => {
  const [row] = await db.query(UserQuery.findUserById, [userId]);
  const user = new User(...row[0]);
  return user;
};

exports.registerUser = async user => {
  try {
    const { userId, name, nickname, phone, age } = user;
    await db.query(UserQuery.insertUser, [userId, name, nickname, phone, age]);
    return new User(userId, name, nickname, phone, age);
  } catch (error) {
    return error;
  }
};
