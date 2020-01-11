const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const PostService = require('../../../services/blog/Post');
const APIResponse = require('../../../models/api-models/APIResponse');
const PostsSecurityService = require('../../../services/security/PostsSecurity');
const FacebookService = require('../../../services/third-party/Facebook');
const RatingService = require('../../../services/blog/Rating');
const SavedPostService = require('../../../services/blog/SavedPost');
const SessionService = require('../../../services/user/Session');


router.post('/', Logger.catch(async (req, res) => {
  const post = PostsSecurityService.filterUnallowedProperties(req.body);
  await PostsSecurityService.onlyPublicOwnerModAdmin(req, post);
  post.newAuthor = req.session.user;
  post.owner = req.session.user;
  const newPost = await PostService.createOrUpdate(post);
  await SessionService.checkForDirtySession(req);
  res.send(new APIResponse().setData(newPost));
}));

router.post('/:postId/rating', Logger.catch(async (req, res) => {
  await PostsSecurityService.onlyLoggedInUser(req);
  const { user } = req.session;
  const { postId } = req.params;
  const { rating } = req.body;
  const post = await PostService.get(postId);
  if (!post) {
    throw APIResponse.throwError.NotFound();
  }
  const ratingObject = await RatingService.rating(post, user, rating);
  if (user.dirty) {
    delete user.dirty;
    return req.session.save(
      () => res.send(new APIResponse().setData({ rating: ratingObject, user }))
    );
  }
  return res.send(new APIResponse().setData({ rating: ratingObject, user }));
}));

router.get('/news', Logger.catch(async (req, res) => {
  await PostsSecurityService.onlyLoggedInUser(req);
  const { user } = req.session;
  const news = await PostService.checkNews(user);
  res.send(APIResponse.setData(news));
}));

router.post('/news', Logger.catch(async (req, res) => {
  await PostsSecurityService.onlyLoggedInUser(req);
  const { user } = req.session;
  await PostService.markAsRead(req.body, user);
  await SessionService.checkForDirtySession(req);
  const news = await PostService.checkNews(user);
  res.send(APIResponse.setData(news));
}));

router.get('/unread-posts', Logger.catch(async (req, res) => {
  await PostsSecurityService.onlyLoggedInUser(req);
  const { user } = req.session;
  const unreadPosts = await PostService.checkUnreadPosts(user);
  res.send(new APIResponse().setData({ unreadPosts }));
}));

router.post('/:postId/seen', Logger.catch(async (req, res) => {
  await PostsSecurityService.onlyLoggedInUser(req);
  const { user } = req.session;
  const { postId } = req.params;
  const post = await PostService.get(postId);
  await PostService.seenLatestPost(user, post);
  await SessionService.checkForDirtySession(req);
  res.send(APIResponse.SUCCESS);
}));

router.get('/:postId?', Logger.catch(async (req, res) => {
  const { user } = req.session;
  const { postId } = req.params;
  const posts = await PostService.getOrList(postId, req.query);

  if (user) {
    await RatingService.appendRatingOfUser(posts, user);
    await SavedPostService.appendIsSavedOfUser(posts, user);
  }

  return res.send(new APIResponse().setData(posts));
}));

router.delete('/:postId', Logger.catch(async (req, res) => {
  const { postId } = req.params;
  const post = await PostService.get(postId);
  await PostsSecurityService.onlyOwnerModAdmin(req, post);
  const deleteResult = await PostService.delete(postId);
  return res.send(new APIResponse().setData(deleteResult));
}));

router.get('/refresh-cache', Logger.catch(async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.send(APIResponse.throwError.BadRequest());
  }
  const cachedPost = await FacebookService.refreshCache(url);
  return res.send(new APIResponse().setData(cachedPost));
}));

module.exports = router;
