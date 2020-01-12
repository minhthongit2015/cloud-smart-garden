const router = require('express').Router();
const UserService = require('../../../services/user/User');
const APIResponse = require('../../../models/api-models/APIResponse');
const Logger = require('../../../services/Logger');
const SecurityService = require('../../../services/security/SecurityService');

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

router.get('/:userId?', Logger.catch(async (req, res) => {
  const { userId } = req.params;
  const users = await UserService.getOrList(userId, req.query);
  return res.send(APIResponse.setData(users));
}));

router.post('/:userId/characteristics', Logger.catch(async (req, res) => {
  const { userId } = req.params;
  SecurityService.onlyOwnerOrModOrAdmin(req, userId);
  const updatedUser = await UserService.update(userId, {
    spotlight: req.body
  });
  return res.send(APIResponse.setData(updatedUser));
}));

router.post('/:userId/target-characteristics', Logger.catch(async (req, res) => {
  const { userId } = req.params;
  SecurityService.onlyOwnerOrModOrAdmin(req, userId);
  const updatedUser = await UserService.update(userId, {
    target: req.body
  });
  return res.send(APIResponse.setData(updatedUser));
}));

router.post('/:userId/marks', Logger.catch(async (req, res) => {
  const { userId } = req.params;
  const user = await UserService.get(userId);
  SecurityService.onlyNotNullObject(user, true, APIResponse.throwError.NotFound());
  SecurityService.onlyOwnerOrModOrAdmin(req, userId);
  const updatedUser = await UserService.mark(user, req.body);
  return res.send(APIResponse.setData(updatedUser));
}));

module.exports = router;
