const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController')
const router = express.Router();
const { isAuthenticatedUser } = require('../middlewares/authenticate')

router.route('/register').post(isAuthenticatedUser, registerUser);
router.route('/login').post(loginUser);

module.exports = router;