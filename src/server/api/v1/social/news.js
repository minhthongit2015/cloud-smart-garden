const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const SocialService = require('../../../services/social/SocialService');
const APIResponse = require('../../../models/api-models/APIResponse');
const SecurityService = require('../../../services/security/SecurityService');
const SessionService = require('../../../services/user/Session');


router.get('/', Logger.catch(async (req, res) => {
  await SecurityService.onlyLoggedInUser(req);
  const { user } = SessionService.getEntities(req);
  const { model } = req.query;

  const news = await SocialService.checkNews({ user, model });

  return res.send(APIResponse.setData(news));
}));

router.post('/', Logger.catch(async (req, res) => {
  await SecurityService.onlyLoggedInUser(req);
  const { user, session } = SessionService.getEntities(req);
  const { model } = req.query;

  await SocialService.markAsRead({ readCategories: req.body, user });
  const news = await SocialService.checkNews({ user, model });

  await SessionService.checkForDirtySession(session);
  return res.send(APIResponse.setData(news));
}));

router.get('/unread-posts', Logger.catch(async (req, res) => {
  await SecurityService.onlyLoggedInUser(req);
  const { user } = SessionService.getEntities(req);
  const { model } = req.query;

  const unreadPosts = await SocialService.checkUnreadPosts({ user, model });

  return res.send(APIResponse.setData(unreadPosts));
}));

router.post('/seen/:socialId', Logger.catch(async (req, res) => {
  await SecurityService.onlyLoggedInUser(req);
  const { user, session } = SessionService.getEntities(req);
  const { model } = req.query;
  const { socialId } = req.params;

  const post = await SocialService.get({ id: socialId, model });

  await SocialService.seenLatestPost({ user, post });

  await SessionService.checkForDirtySession(session);
  return res.send(APIResponse.SUCCESS);
}));

module.exports = router;
