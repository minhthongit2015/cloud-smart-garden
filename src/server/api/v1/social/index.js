const router = require('express').Router();
const RatingRoute = require('./rating');
const NewsRoute = require('./news');
const SavedPostsRoute = require('./saved-posts');
const SocialRoute = require('./social');

router.use('/rating', RatingRoute);
router.use('/news', NewsRoute);
router.use('/saved-post', SavedPostsRoute);
router.use('/', SocialRoute);

module.exports = router;
