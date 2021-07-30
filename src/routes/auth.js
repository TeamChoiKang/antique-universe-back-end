const router = require('express').Router();
const AuthController = require('@/controllers/auth');

router.post('/signin', AuthController.signin);

module.exports = router;
