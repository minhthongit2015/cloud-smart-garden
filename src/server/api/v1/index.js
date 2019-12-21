const router = require('express').Router();

const ServerStatusRoute = require('./api-info');
const ApiInfoRoute = require('./api-info');
const SessionsRoute = require('./sessions');
const AdminRoute = require('./admin');
const IntranetRoute = require('./intranet');

const UsersRoute = require('./users');
const MapRoute = require('./map');
const BlogRoute = require('./blog');
const GardenRouter = require('./garden');
const AICentralRoute = require('./ai-central');

router.use('/server-status', ServerStatusRoute);
router.use('/api-info', ApiInfoRoute);
router.use('/sessions', SessionsRoute);
router.use('/admin', AdminRoute);
router.use('/intranet', IntranetRoute);

router.use('/users', UsersRoute);
router.use('/map', MapRoute);
router.use('/blog', BlogRoute);
router.use('/garden', GardenRouter);
router.use('/ai-central', AICentralRoute);

module.exports = router;
