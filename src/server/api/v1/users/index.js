const router = require('express').Router();
const UserService = require('../../../services/user/User');
const APIResponse = require('../../../models/api-models');
const Logger = require('../../../services/Logger');

const AuthRoute = require('./auth');
const SigninRoute = require('./signin');
const SignoutRoute = require('./signout');
const SignupRoute = require('./signup');
const ProfileRoute = require('./profile');

router.use('/auth', AuthRoute);
router.use('/signin', SigninRoute);
router.use('/signout', SignoutRoute);
router.use('/signup', SignupRoute);
router.use('/profile', ProfileRoute);

router.get('/list', async (req, res) => {
  try {
    const users = await UserService.list();
    return res.send(new APIResponse().setData({ users }));
  } catch (error) {
    Logger.error(error.message, { stack: error.stack });
    return res.status(400).send(
      new APIResponse().setError({ message: error.message, stack: error.stack })
    );
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await UserService.get(userId);
    return res.send(new APIResponse().setData({ users }));
  } catch (error) {
    Logger.error(error.message, { stack: error.stack });
    return res.status(400).send(
      new APIResponse().setError({ message: error.message, stack: error.stack })
    );
  }
});

module.exports = router;
