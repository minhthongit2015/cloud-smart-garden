const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const SocialService = require('../../../services/social/SocialService');
const APIResponse = require('../../../models/api-models/APIResponse');
const SecurityService = require('../../../services/security/SecurityService');
const SessionService = require('../../../services/user/Session');


router.post('/:socialId', Logger.catch(async (req, res) => {
  await SecurityService.onlyLoggedInUser(req);
  const { user, session } = SessionService.getEntities(req);
  const { model } = req.query;
  const { rating } = req.body;
  const { socialId } = req.params;

  const post = await SocialService.get({ id: socialId });
  if (!post) {
    throw APIResponse.throwError.NotFound();
  }

  const ratingObject = await SocialService.rating({
    post, rating, user, model
  });

  await SessionService.checkForDirtySession(session);
  return res.send(APIResponse.setData({ rating: ratingObject, user }));
}));

module.exports = router;
