

function noCache(req, res, next) {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1
  res.set('Pragma', 'no-cache'); // HTTP 1.0
  res.set('Expires', '0'); // Proxies
  next();
}

module.exports = noCache;
