const router = require('express').Router();
const AuthController = require('@/controllers/auth');

router.get('/signin', AuthController.signin);

module.exports = router;
