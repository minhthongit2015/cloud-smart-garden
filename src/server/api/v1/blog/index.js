const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
// const Logger = require('../../../services/Logger');

const CategoriesRoute = require('./categories');
const PostsRoute = require('./posts');
const RatingRoute = require('./rating');
const SavedPostsRoute = require('./saved-posts');
const IWillDoThisRoute = require('./i-will-do-this');

router.use('/categories', CategoriesRoute);
router.use('/posts', PostsRoute);
router.use('/rating', RatingRoute);
router.use('/saved-posts', SavedPostsRoute);
router.use('/i-will-do-this', IWillDoThisRoute);

module.exports = router;
