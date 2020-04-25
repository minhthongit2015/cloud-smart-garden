const router = require('express').Router();

const ServerStatusRoute = require('./server-status');
const ApiInfoRoute = require('./api-info');
const SessionsRoute = require('./sessions');
const UsersRoute = require('./users');
const AdminRoute = require('./admin');
const IntranetRoute = require('./intranet');

const SocialRoute = require('./social');
const MapRoute = require('./map');
const GardenRouter = require('./garden');
const AICentralRoute = require('./AI');


router.use('/server-status', ServerStatusRoute);
router.use('/api-info', ApiInfoRoute);
router.use('/sessions', SessionsRoute);
router.use('/users', UsersRoute);
router.use('/admin', AdminRoute);
router.use('/intranet', IntranetRoute);

router.use('/social', SocialRoute);
router.use('/garden', GardenRouter);
router.use('/map', MapRoute);
router.use('/AI', AICentralRoute);

module.exports = router;
