const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const PostService = require('../../../services/blog/PostService');
const APIResponse = require('../../../models/api-models/APIResponse');
const SocialSecurityService = require('../../../services/security/SocialSecurityService');
const SavedSocialService = require('../../../services/social/SavedSocialService');
const RatingService = require('../../../services/social/RatingService');


router.get('/:savedPostId?', Logger.catch(async (req, res) => {
  await SocialSecurityService.onlyLoggedInUser(req);
  const { user } = req.session;
  const { savedPostId } = req.params;
  const { model } = req.query;

  const posts = await SavedSocialService.getOrListMin(savedPostId, req.query, user);
  await RatingService.appendRatingOfUser({ posts, user, model });

  return res.send(new APIResponse().setData(posts));
}));

router.post('/:postId', Logger.catch(async (req, res) => {
  await SocialSecurityService.onlyLoggedInUser(req);
  const { user } = req.session;
  const { postId } = req.params;
  const post = await PostService.get(postId);
  if (!post) {
    throw APIResponse.throwError.NotFound();
  }
  const savedPost = await SavedSocialService.addSavedPost(post, user);
  return res.send(new APIResponse().setData({ savedPost, user }));
}));

router.delete('/:postId', Logger.catch(async (req, res) => {
  await SocialSecurityService.onlyLoggedInUser(req);
  const { user } = req.session;
  const { postId } = req.params;
  const savedPost = await SavedSocialService.removeSavedPost(postId, user);
  return res.send(new APIResponse().setData({ savedPost, user }));
}));

module.exports = router;
