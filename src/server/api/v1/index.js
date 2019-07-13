const router = require('express').Router();
const InfoRoute = require('./info');
const LoginRoute = require('./login');
const RegisterRoute = require('./register');

router.use('/info', InfoRoute);
router.use('/login', LoginRoute);
router.use('/register', RegisterRoute);
module.exports = router;
