const router = require('express').Router();
const AuthController = require('@/controllers/auth');

router.get('/signin', AuthController.signin);
router.get('/token', AuthController.validateToken);

module.exports = router;
