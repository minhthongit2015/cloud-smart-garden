const router = require('express').Router();
const UserService = require('../../../services/user/User');
const APIResponse = require('../../../models/api-models');
const { isNone } = require('../../../utils');
const Logger = require('../../../services/Logger');

const { isBlank } = require('../../../utils');

router.post('/', async (req, res) => {
  try {
    const {
      email, password, name
    } = req.body;
    if (isBlank(email) || isBlank(password) || isBlank(name) || isBlank(email)) {
      return res.status(400).send(new APIResponse().setError({ message: 'Invalid Parameters' }));
    }

    const user = await UserService.createUser({
      email,
      password,
      name
    });
    if (isNone(user)) {
      return res.send(new APIResponse()
        .error({
          message: 'User already exits'
        }));
    }

    return res.send(new APIResponse().setData({ user }));
  } catch (error) {
    Logger.error(error.message, { stack: error.stack });
    return res.status(400).send(
      new APIResponse().setError({ message: error.message, stack: error.stack })
    );
  }
});

module.exports = router;
