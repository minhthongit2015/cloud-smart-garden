const router = require('express').Router();
const LoginRoute = require('./login');
const LogoutRoute = require('./logout');
const RegisterRoute = require('./register');
const ProfileRoute = require('./profile');

router.use('/login', LoginRoute);
router.use('/logout', LogoutRoute);
router.use('/register', RegisterRoute);
router.use('/profile', ProfileRoute);

module.exports = router;
