const router = require('express').Router();

const OneHundredQuotesRoute = require('./100-Quotes');

router.use('/100-Quotes', OneHundredQuotesRoute);

module.exports = router;
