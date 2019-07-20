const router = require('express').Router();
const UserService = require('../../services/deprecated-user');

router.post('/', async (req, res) => {
  const {
    username, password, name, email
  } = req.body;

  const newUser = {
    username, password, name, email
  };

  const user = await UserService.register(newUser);

  return res.send(user);
});

module.exports = router;
