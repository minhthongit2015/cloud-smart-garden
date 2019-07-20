const router = require('express').Router();
const AuthService = require('../../services/deprecated-authenticator');

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const sessionUser = req.session.user;
  const user = sessionUser || await AuthService.authenticate(username, password);
  if (user) {
    req.session.user = user;
    return req.session.save(() => {
      res.send({ user });
    });
  }
  return res.send({ user });
});

module.exports = router;
