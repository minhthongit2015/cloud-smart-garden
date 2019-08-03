const router = require('express').Router();
const AuthService = require('../../../services/Auth');
const APIResponse = require('../../../models/api-models');
const Logger = require('../../../services/Logger');

const { isNone, isBlank } = require('../../../utils');

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (isBlank(username) || isBlank(password)) {
      return res.status(401).send(new APIResponse().setErrorMessage('Invalid username or password'));
    }

    const sessionUser = req.session.user;
    const user = await AuthService.authenticate(username, password) || sessionUser;
    if (isNone(user)) {
      return res.status(401).send(new APIResponse().setErrorMessage('Wrong username or password'));
    }

    req.session.user = user;
    return req.session.save(() => res.send(new APIResponse().setData({ user })));
  } catch (error) {
    Logger.error(error.message, { stack: error.stack });
    return res.status(400).send(
      new APIResponse().setError({ message: error.message, stack: error.stack })
    );
  }
});

module.exports = router;
