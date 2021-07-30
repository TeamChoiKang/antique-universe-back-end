const AuthService = require('@/services/auth');

exports.signin = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const id = await AuthService.validateToken(token);
    res.json({ id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
