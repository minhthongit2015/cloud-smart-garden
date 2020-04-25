const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const SocialService = require('../../../services/social/SocialService');
const APIResponse = require('../../../models/api-models/APIResponse');
const SecurityService = require('../../../services/security/SecurityService');
const SavedSocialService = require('../../../services/social/SavedSocialService');
const SessionService = require('../../../services/user/Session');


router.post('/', Logger.catch(async (req, res) => {
  // const post = SecurityService.filterUnallowedProperties(req.body);
  const socialEntity = req.body;
  await SecurityService.onlyLoggedInUser(req, socialEntity);
  const { user, session } = SessionService.getEntities(req);
  const { model } = req.query;

  const newSocialEntity = await SocialService.createOrUpdate({ doc: socialEntity, user, model });
  await SessionService.checkForDirtySession(session);
  return res.send(APIResponse.setData(newSocialEntity));
}));

router.get('/:socialId?', Logger.catch(async (req, res) => {
  const { user } = SessionService.getEntities(req);
  const { model } = req.query;
  const { socialId } = req.params;

  const posts = await SocialService.getOrList({ id: socialId, opts: req.query, model });

  if (user) {
    await SocialService.appendRatingOfUser({ posts, user, model });
    await SavedSocialService.appendIsSavedOfUser({ posts, user, model });
  }

  return res.send(APIResponse.setData(posts));
}));

router.delete('/:socialId', Logger.catch(async (req, res) => {
  const { model } = req.query;
  const { socialId } = req.params;

  const post = await SocialService.get({ id: socialId, model });
  await SecurityService.onlyOwnerOrModOrAdmin(req, post.owner);

  const deleteResult = await SocialService.delete({ id: socialId, model });

  return res.send(APIResponse.setData(deleteResult));
}));


module.exports = router;
