const router = require('express').Router();
const Logger = require('../../../services/Logger');
const SecurityService = require('../../../services/security/SecurityService');
const APIResponse = require('../../../models/api-models/APIResponse');
const OneHundredQuotesService = require('../../../services/intranet/100Quotes');

router.post('/', Logger.catch(async (req, res) => {
  const quote = req.body;
  await SecurityService.onlyModOrAdmin(req);
  quote.owner = req.session.user._id;
  const createdQuote = await OneHundredQuotesService.createOrUpdate(quote);
  res.send(APIResponse.setData(createdQuote));
}));

router.get('/:quoteId?', Logger.catch(async (req, res) => {
  const { quoteId } = req.params;
  const quotes = await OneHundredQuotesService.getOrList(quoteId, req.query);

  // const { user } = req.session;
  // if (user) {
  //   await RatingService.appendRatingOfUser(posts, user);
  //   await SavedPostService.appendIsSavedOfUser(posts, user);
  // }

  return res.send(APIResponse.setData(quotes));
}));

router.delete('/:quoteId', Logger.catch(async (req, res) => {
  await SecurityService.onlyModOrAdmin(req);
  const { quoteId } = req.params;
  const deleteResult = await OneHundredQuotesService.delete(quoteId);
  return res.send(APIResponse.setData(deleteResult));
}));

module.exports = router;
