const router = require('express').Router();
const AuthController = require('@/controllers/auth');

router.post('/signin', AuthController.signin);
router.post('/signup', AuthController.signup);
router.get('/token', AuthController.validateToken);

module.exports = router;
