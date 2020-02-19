const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const PostService = require('../../../services/blog/PostServ');
const APIResponse = require('../../../models/api-models/APIResponse');
const PostsSecurityService = require('../../../services/security/PostsSecurity');
const SavedPostService = require('../../../services/blog/SavedPost');
const RatingService = require('../../../services/blog/Rating');


router.get('/:savedPostId?', Logger.catch(async (req, res) => {
  await PostsSecurityService.onlyLoggedInUser(req);
  const { user } = req.session;
  const { savedPostId } = req.params;
  const savedPosts = await SavedPostService.getOrListMin(savedPostId, req.query, user);
  await RatingService.appendRatingOfUser(savedPosts, user);
  return res.send(new APIResponse().setData(savedPosts));
}));

router.post('/:postId', Logger.catch(async (req, res) => {
  await PostsSecurityService.onlyLoggedInUser(req);
  const { user } = req.session;
  const { postId } = req.params;
  const post = await PostService.get(postId);
  if (!post) {
    throw APIResponse.throwError.NotFound();
  }
  const savedPost = await SavedPostService.addSavedPost(post, user);
  return res.send(new APIResponse().setData({ savedPost, user }));
}));

router.delete('/:postId', Logger.catch(async (req, res) => {
  await PostsSecurityService.onlyLoggedInUser(req);
  const { user } = req.session;
  const { postId } = req.params;
  const savedPost = await SavedPostService.removeSavedPost(postId, user);
  return res.send(new APIResponse().setData({ savedPost, user }));
}));

module.exports = router;
