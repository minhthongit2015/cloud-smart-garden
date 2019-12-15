const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const PostService = require('../../../services/blog/Post');
const APIResponse = require('../../../models/api-models');
const SessionService = require('../../../services/user/Session');
const PostsSecurityService = require('../../../services/security/PostsSecurity');
const IDoPostService = require('../../../services/blog/IDoPost');
const RatingService = require('../../../services/blog/Rating');
const SavedPostService = require('../../../services/blog/SavedPost');


router.get('/:iDoPostId?', (req, res) => {
  Logger.catch(async () => {
    await PostsSecurityService.onlyLoggedInUser(req);
    const { user } = req.session;
    const { iDoPostId } = req.params;
    const iDoPosts = await IDoPostService.getOrListMin(iDoPostId, req.query, user);
    await RatingService.appendRatingOfUser(iDoPosts, user);
    await SavedPostService.appendIsSavedOfUser(iDoPosts, user);
    return res.send(new APIResponse().setData(iDoPosts));
  }, { req, res });
});

router.post('/:postId', (req, res) => {
  Logger.catch(async () => {
    await PostsSecurityService.onlyLoggedInUser(req);
    const { user } = req.session;
    const { postId } = req.params;
    const post = await PostService.get(postId);
    if (!post) {
      throw APIResponse.throwError.NotFound();
    }
    const iDoPost = await IDoPostService.addIDoPost(post, user);
    await SessionService.checkForDirtySession(req);
    return res.send(new APIResponse().setData({ iDoPost, user }));
  }, { req, res });
});

router.delete('/:postId', (req, res) => {
  Logger.catch(async () => {
    await PostsSecurityService.onlyLoggedInUser(req);
    const { user } = req.session;
    const { postId } = req.params;
    const iDoPost = await IDoPostService.removeIDoPost(postId, user);
    await SessionService.checkForDirtySession(req);
    return res.send(new APIResponse().setData({ iDoPost, user }));
  }, { req, res });
});

module.exports = router;
