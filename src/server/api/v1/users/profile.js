const router = require('express').Router();
const UserService = require('../../../services/user/User');
const APIResponse = require('../../../models/api-models');
const { isNone, isBlank, isOwner } = require('../../../utils');
const Logger = require('../../../services/Logger');

router.get('/my-profile', async (req, res) => {
  try {
    const sessionUser = req.session.user;
    if (isNone(sessionUser)) {
      return res.status(401).send();
    }
    return res.send(new APIResponse().setData({ user: sessionUser }));
  } catch (error) {
    Logger.error(error.message, { stack: error.stack });
    return res.status(400).send(
      new APIResponse().setError({ message: error.message, stack: error.stack })
    );
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const sessionUser = req.session.user;
    if (isNone(sessionUser)) {
      return res.status(401).send();
    }
    if (!sessionUser.admin) {
      return res.status(401).send();
    }

    const { userId } = req.params;
    if (isBlank(userId)) {
      return res.status(404).send();
    }
    const user = await UserService.get(userId);
    if (isNone(user)) {
      return res.status(404).send();
    }

    return res.send(new APIResponse().setData({ user }));
  } catch (error) {
    Logger.error(error.message, { stack: error.stack });
    return res.status(400).send(
      new APIResponse().setError({ message: error.message, stack: error.stack })
    );
  }
});

router.get('/public-info/:userId', async (req, res) => {
  try {
    const sessionUser = req.session.user;
    if (isNone(sessionUser)) {
      return res.status(401).send();
    }
    const { userId } = req.params;
    if (isBlank(userId)) {
      return res.status(404).send();
    }
    const user = await UserService.getPublicInfo(userId);
    if (isNone(user)) {
      return res.status(404).send(new APIResponse().failed());
    }
    return res.send(new APIResponse().setData({ user }));
  } catch (error) {
    Logger.error(error.message, { stack: error.stack });
    return res.status(400).send(
      new APIResponse().setError({ message: error.message, stack: error.stack })
    );
  }
});

router.post('/change-password', async (req, res) => {
  try {
    const { user } = req.session;
    if (isNone(user)) {
      return res.status(401).send();
    }

    const { email, oldPassword, newPassword } = req.body;
    if (isBlank(email) || isBlank(oldPassword) || isBlank(newPassword)) {
      return res.status(400).send(new APIResponse().setError({ message: 'Invalid Parameters' }));
    }

    const updatedUser = await UserService.updatePassword(email, oldPassword, newPassword);
    if (isNone(updatedUser)) {
      return res.send(new APIResponse().setError({ message: 'Old password is not correct' }));
    }

    return res.send(new APIResponse().success());
  } catch (error) {
    Logger.error(error.message, { stack: error.stack });
    return res.status(400).send(
      new APIResponse().setError({ message: error.message, stack: error.stack })
    );
  }
});

router.post('/update-profile/:userId', async (req, res) => {
  try {
    const sessionUser = req.session.user;
    if (isNone(sessionUser)) {
      return res.status(401).send();
    }

    const { userId } = req.params;
    if (isBlank(userId)) {
      return res.status(404).send(new APIResponse().setError({ message: 'Missing required parameters' }));
    }

    if (!sessionUser.admin || !isOwner(sessionUser, userId)) {
      return res.status(403).send(new APIResponse().setError({ message: 'Unauthorized!' }));
    }

    const { avatar, name, description } = req.body;
    if (isBlank(name)) {
      return res.status(404).send(new APIResponse().setError({ message: 'Missing required parameters' }));
    }

    let updatedUser;
    if (sessionUser.admin) {
      updatedUser = await UserService.updateUser({ avatar, name, description });
    } else {
      updatedUser = await UserService.updateUser({ avatar, name });
    }
    if (isNone(updatedUser)) {
      return res.send(new APIResponse().failed());
    }

    return res.send(new APIResponse().success());
  } catch (error) {
    Logger.error(error.message, { stack: error.stack });
    return res.status(400).send(
      new APIResponse().setError({ message: error.message, stack: error.stack })
    );
  }
});

router.post('/change-user-type', async (req, res) => {
  const sessionUser = req.session.user;
  if (!sessionUser.admin) {
    return res.status(403).send(new APIResponse().setError({ message: 'Unauthorized' }));
  }
  const { userId, newType } = req.body;

  if (isBlank(userId) || isBlank(newType)) {
    return res.send(new APIResponse().setError({ message: 'Missing require parameters' }));
  }
  const updatedUser = await UserService.updateUserType(userId, newType);

  if (isNone(updatedUser)) {
    return res.send(new APIResponse().failed());
  }

  return res.send(new APIResponse().success());
});

module.exports = router;
