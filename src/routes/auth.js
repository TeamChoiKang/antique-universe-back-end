const router = require('express').Router();
const AuthController = require('@/controllers/auth');

router.post('/signin', AuthController.signin);
router.get('/token', AuthController.validateToken);

module.exports = router;
