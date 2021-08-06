const UserQuery = require('@/queries/user');
const db = require('@/db');
const User = require('@/model/user');

exports.getUser = async userId => {
  const [row] = await db.query(UserQuery.findUserById, [userId]);
  const user = new User(...row[0]);
  return user;
};
