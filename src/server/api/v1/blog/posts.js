const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const PostService = require('../../../services/blog/Post');
const APIResponse = require('../../../models/api-models');
const PostsSecurityService = require('../../../services/security/PostsSecurity');
const FacebookService = require('../../../services/third-party/Facebook');
const RatingService = require('../../../services/blog/Rating');
const SavedPostService = require('../../../services/blog/SavedPost');
const SessionService = require('../../../services/user/Session');


router.post('/', (req, res) => {
  Logger.catch(async () => {
    const post = PostsSecurityService.filterUnallowedProperties(req.body);
    await PostsSecurityService.onlyPublicOwnerModAdmin(req, post);
    post.newAuthor = req.session.user;
    const newPost = await PostService.createOrUpdate(post);
    await SessionService.checkForDirtySession(req);
    res.send(new APIResponse().setData(newPost));
  }, { req, res });
});

router.post('/:postId/rating', (req, res) => {
  Logger.catch(async () => {
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
  }, { req, res });
});

router.get('/news', (req, res) => {
  Logger.catch(async () => {
    await PostsSecurityService.onlyLoggedInUser(req);
    const { user } = req.session;
    const news = await PostService.checkNews(user);
    res.send(APIResponse.setData(news));
  }, { req, res });
});

router.post('/news', (req, res) => {
  Logger.catch(async () => {
    await PostsSecurityService.onlyLoggedInUser(req);
    const { user } = req.session;
    await PostService.markAsRead(req.body, user);
    await SessionService.checkForDirtySession(req);
    const news = await PostService.checkNews(user);
    res.send(APIResponse.setData(news));
  }, { req, res });
});

router.get('/unread-posts', (req, res) => {
  Logger.catch(async () => {
    await PostsSecurityService.onlyLoggedInUser(req);
    const { user } = req.session;
    const unreadPosts = await PostService.checkUnreadPosts(user);
    res.send(new APIResponse().setData({ unreadPosts }));
  }, { req, res });
});

router.post('/:postId/seen', (req, res) => {
  Logger.catch(async () => {
    await PostsSecurityService.onlyLoggedInUser(req);
    const { user } = req.session;
    const { postId } = req.params;
    const post = await PostService.get(postId);
    await PostService.seenLatestPost(user, post);
    await SessionService.checkForDirtySession(req);
    res.send(APIResponse.SUCCESS);
  }, { req, res });
});

router.get('/:postId?', (req, res) => {
  Logger.catch(async () => {
    const { user } = req.session;
    const { postId } = req.params;
    const posts = await PostService.getOrList(postId, req.query);

    if (user) {
      await RatingService.appendRatingOfUser(posts, user);
      await SavedPostService.appendIsSavedOfUser(posts, user);
    }

    return res.send(new APIResponse().setData(posts));
  }, { req, res });
});

router.delete('/:postId', (req, res) => {
  Logger.catch(async () => {
    const { postId } = req.params;
    const post = await PostService.get(postId);
    await PostsSecurityService.onlyOwnerModAdmin(req, post);
    const deleteResult = await PostService.delete(postId);
    return res.send(new APIResponse().setData(deleteResult));
  }, { req, res });
});

router.get('/refresh-cache', (req, res) => {
  Logger.catch(async () => {
    const { url } = req.query;
    if (!url) {
      return res.send(APIResponse.throwError.BadRequest());
    }
    const cachedPost = await FacebookService.refreshCache(url);
    return res.send(new APIResponse().setData(cachedPost));
  }, { req, res });
});

module.exports = router;
